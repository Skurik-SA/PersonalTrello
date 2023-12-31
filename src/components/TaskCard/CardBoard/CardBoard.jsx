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

        const {source, destination, type} = results

        if (!destination) {
            return
        }

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        if (type === 'group')
        {
            const reorderedData = [...clientVisibleData]
            const sourceIndex = source.index
            const destinationIndex = destination.index

            const [removedItem] = reorderedData.splice(sourceIndex, 1)
            reorderedData.splice(destinationIndex, 0, removedItem)

            return setClientVisibleData(reorderedData);
        }

        const dataSourceIndex = clientVisibleData.findIndex((nd) => nd.id === source.droppableId)
        const dataDestinationIndex = clientVisibleData.findIndex((nd) => nd.id === destination.droppableId)
        const newDataItems = [...clientVisibleData[dataSourceIndex].content]

        const newDestinationItems =
            source.droppableId !== destination.droppableId
                ? [...clientVisibleData[dataDestinationIndex].content]
                : newDataItems

        const [deletedItem] = newDataItems.splice(source.index, 1)
        newDestinationItems.splice(destination.index, 0, deletedItem)

        const newEl = [...clientVisibleData]
        newEl[dataSourceIndex] = {
            ...clientVisibleData[dataSourceIndex],
            content: newDataItems
        }

        newEl[dataDestinationIndex] = {
            ...clientVisibleData[dataDestinationIndex],
            content: newDestinationItems
        }

        dispatch(set_todolist(newEl))

        flushSync(() => {
            setClientVisibleData(newEl)
        });
    }

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