import styles from "./CardBoard.module.css"
import ScrollContainer from "react-indiana-drag-scroll";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import CardBase from "../CardBase/CardBase.jsx";
import {PureComponent, useContext, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {useDispatch} from "react-redux";
import {flushSync} from "react-dom";
import {set_todolist} from "../../../redux/store/slices/slice_ToDoList.js";
import BoardContext from "../../../context/BoardContext.jsx";
import {findColumnIndex} from "../../../utils/FindColumnIndex.js";
import PropTypes from "prop-types";

class InnerCardList extends PureComponent {
    render() {
        const {
            card_data,
            card_title,
            index,
            markTextShow,
            setMarkTextShow,
        } = this.props

        return <CardBase
                    card_data={card_data}
                    card_title={card_title}
                    index={index}

                    markTextShow={markTextShow}
                    setMarkTextShow={setMarkTextShow}
                />
    }
}

InnerCardList.propTypes = {
    card_data: PropTypes.object,
    card_title: PropTypes.string,
    index: PropTypes.number,
    markTextShow: PropTypes.bool,
    setMarkTextShow: PropTypes.func,
}

const CardBoard = () => {
    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)

    const [markTextShow, setMarkTextShow] = useState(false)
    // Это костыль, но зато какой, потом с бэком скорее всего менять придётся
    const dispatch = useDispatch()


    const addNewColumn = () => {
        const newItems = [
            ...clientVisibleData,
            {
                id: uuidv4(),
                title: 'Новая колонка',
                content: [],
            }
        ]
        setClientVisibleData(newItems)
    }

    const handleOnDragEnd = (results) => {
        const { source, destination, type } = results;

        if (!destination || (type === 'group' && source.index === destination.index)) {
            return;
        }

        const isGroupType = type === 'group';
        const reorderedData = isGroupType ? [...clientVisibleData] : undefined;

        if (isGroupType) {
            const [removedItem] = reorderedData.splice(source.index, 1);
            reorderedData.splice(destination.index, 0, removedItem);

            dispatch(set_todolist(reorderedData));
            flushSync(() => setClientVisibleData(reorderedData));
            return;
        }

        const dataSourceIndex = clientVisibleData.findIndex((nd) => nd.id === source.droppableId);
        const dataDestinationIndex = clientVisibleData.findIndex((nd) => nd.id === destination.droppableId);

        if (
            dataSourceIndex === -1 ||
            dataDestinationIndex === -1 ||
            !clientVisibleData[dataSourceIndex]?.content ||
            !clientVisibleData[dataDestinationIndex]?.content
        ) {
            console.error("Invalid dataSourceIndex or dataDestinationIndex");
            return;
        }

        const newDataItems = [...clientVisibleData[dataSourceIndex].content];
        const newDestinationItems =
            source.droppableId !== destination.droppableId
                ? [...clientVisibleData[dataDestinationIndex].content]
                : newDataItems;

        const [deletedItem] = newDataItems.splice(source.index, 1);
        newDestinationItems.splice(destination.index, 0, deletedItem);

        const newEl = [...clientVisibleData];
        newEl[dataSourceIndex] = {
            ...clientVisibleData[dataSourceIndex],
            content: newDataItems,
        };

        newEl[dataDestinationIndex] = {
            ...clientVisibleData[dataDestinationIndex],
            content: newDestinationItems,
        };

        dispatch(set_todolist(newEl));
        flushSync(() => setClientVisibleData(newEl));
    };


    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className={styles.cardList} >
                <ScrollContainer
                    horizontal={true}
                    vertical={false}
                    hideScrollbars={false}
                    style={{display: 'flex', top: '0', left: 0, marginRight: '0'}}
                    ignoreElements={"li, div"}
                >
                    <Droppable droppableId="ROOT" type="group" direction="horizontal">
                        {(provided) => (
                            <ol className={styles.boardOl} {...provided.droppableProps} ref={provided.innerRef}>
                                {clientVisibleData.map((card, index) =>
                                    <Draggable
                                        draggableId={card.id}
                                        key={card.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                            >
                                                <InnerCardList
                                                    index={card.id}
                                                    card_data={card}
                                                    card_title={card.title}

                                                    markTextShow={markTextShow}
                                                    setMarkTextShow={setMarkTextShow}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                )}
                                {provided.placeholder}
                            </ol>
                        )}
                    </Droppable>
                    <button className={styles.addNewCardButton} onClick={() => {
                        addNewColumn()
                    }}>
                        + Добавьте ещё одну колонку
                    </button>
                </ScrollContainer>
            </div>
        </DragDropContext>
    )
}

export default CardBoard;