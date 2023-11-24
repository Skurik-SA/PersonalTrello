import styles from "./CardBoard.module.css"
import ScrollContainer from "react-indiana-drag-scroll";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import CardBase from "../CardBase/CardBase.jsx";
import {PureComponent, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {useDispatch} from "react-redux";

class InnerCardList extends PureComponent {
    render() {
        const {
            card_data,
            card_title,
            titleOnChange,
            newTaskOnClick,
            changeTaskInfo,
            onChangeCardMark,
            index,
            markTextShow,
            setMarkTextShow,
            clientVisibleData,
            moveCardViaButtons,
            onChangeDescription
        } = this.props

        return <CardBase
                    card_data={card_data}
                    card_title={card_title}
                    titleOnChange={titleOnChange}
                    newTaskOnClick={newTaskOnClick}
                    changeTaskInfo={changeTaskInfo}
                    onChangeCardMark={onChangeCardMark}
                    clientVisibleData={clientVisibleData}
                    moveCardViaButtons={moveCardViaButtons}
                    onChangeDescription={onChangeDescription}

                    index={index}

                    markTextShow={markTextShow}
                    setMarkTextShow={setMarkTextShow}
                />
    }
}

const CardBoard = (props) => {

    const {
        data,
    } = props

    const [clientVisibleData, setClientVisibleData] = useState(data)

    const [markTextShow, setMarkTextShow] = useState(false)
    // Это костыль, но зато какой, потом с бэком скорее всего менять придётся
    const dispatch = useDispatch()

    // Вроде багов нет
    const moveCardViaButtons = (
        source_task_id,
        // source_column_id,
        destination_task_index,
        destination_column_index
        ) => {

        const findColumnIndex = (type) => {
            let colIndex = {
                index: -1,
                id: '',
            }

            clientVisibleData.map((column, i) => column.content.map((el) => {
                if (el.id === source_task_id) {
                    colIndex = {
                        index: i,
                        id: column.id
                    }
                }
            }))

            if (type === 'id')
                return colIndex.id
            else if (type === 'index')
                return colIndex.index
        }

        const source_column_index = findColumnIndex('index')
        const source_task_index = clientVisibleData[source_column_index].content.findIndex((row) => row.id === source_task_id)
        const newDataItems = [...clientVisibleData[source_column_index].content]

        const newDestinationItems =
            source_column_index !== destination_column_index
                ? [...clientVisibleData[destination_column_index].content]
                : newDataItems

        const [deletedItem] = newDataItems.splice(source_task_index, 1)
        newDestinationItems.splice(destination_task_index, 0, deletedItem)

        const newEl = [...clientVisibleData]

        newEl[source_column_index] = {
            ...clientVisibleData[source_column_index],
            content: newDataItems
        }

        newEl[destination_column_index] = {
            ...clientVisibleData[destination_column_index],
            content: newDestinationItems
        }

        setClientVisibleData(newEl)
    }

    const onChangeDescription = (task_id, card_id, value) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)
        let newTask = {
            id: clientVisibleData[columnIndex].content[taskIndex].id,
            info: clientVisibleData[columnIndex].content[taskIndex].info,
            marks: clientVisibleData[columnIndex].content[taskIndex].marks,
            task_cover: clientVisibleData[columnIndex].content[taskIndex].task_cover,
            deadline: clientVisibleData[columnIndex].content[taskIndex].deadline,
            task_description: value,
            sub_tasks: clientVisibleData[columnIndex].content[taskIndex].sub_tasks,
            priority: clientVisibleData[columnIndex].content[taskIndex].priority,
            comments: clientVisibleData[columnIndex].content[taskIndex].comments,
        }
        const newItems = [...(clientVisibleData.map((column_id, col_index) =>
            column_id.id !== card_id
                ?
                clientVisibleData[col_index]
                :
                {
                    id:  clientVisibleData[col_index].id,
                    title: clientVisibleData[col_index].title,
                    content: [...clientVisibleData[col_index].content.map((task, row_index) =>
                        task.id !== task_id
                            ?
                            clientVisibleData[col_index].content[row_index]
                            :
                            newTask
                    )]
                }
        ))]

        console.log(newItems)
        setClientVisibleData(newItems)
    }

    const onChangeCardMark = (task_id, new_mark, type="add") => {

        const findColumnIndex = (type) => {
            let colIndex = {
                index: -1,
                id: '',
            }

            clientVisibleData.map((column, i) => column.content.map((el) => {
                if (el.id === task_id) {
                    colIndex = {
                        index: i,
                        id: column.id
                    }
                }
            }))

            if (type === 'id')
                return colIndex.id
            else if (type === 'index')
                return colIndex.index
        }
        // const columnId = findColumnIndex('id')
        const columnIndex = findColumnIndex('index')
        const validateMark = (taskMarks, col_index, row_index) => {
            for (let i = 0; i < taskMarks.length; i++) {
                if (type === "delete") {
                    return taskMarks.filter((mark) => mark.id !== new_mark.id)
                }
                if (taskMarks[i].id === new_mark.id ) {
                    if (type === "add" && row_index === task_id) {
                        return taskMarks.filter((mark) => mark.id !== new_mark.id)
                    }
                    if (type === "edit") {
                        return taskMarks.map((mark) => {
                            if (mark.id === new_mark.id) {
                                return new_mark
                            }
                            else {
                                return mark
                            }
                        })
                    }
                }
            }

            if (col_index === columnIndex && row_index === task_id)
                return [...taskMarks, new_mark]
            else
                return [...taskMarks]
        }

        setClientVisibleData([...(clientVisibleData.map((column_id, col_index) =>
            {
                return {
                    id:  clientVisibleData[col_index].id,
                    title: clientVisibleData[col_index].title,
                    content: [...clientVisibleData[col_index].content.map((task, row_index) =>
                    {
                        return {
                            id: clientVisibleData[col_index].content[row_index].id,
                            info: clientVisibleData[col_index].content[row_index].info,
                            marks: validateMark(clientVisibleData[col_index].content[row_index].marks, col_index, task.id),
                            task_cover: clientVisibleData[col_index].content[row_index].task_cover,
                            deadline: clientVisibleData[col_index].content[row_index].deadline,
                            task_description: clientVisibleData[col_index].content[row_index].task_description,
                            sub_tasks: clientVisibleData[col_index].content[row_index].sub_tasks,
                            priority: clientVisibleData[col_index].content[row_index].priority,
                            comments: clientVisibleData[col_index].content[row_index].comments,
                        }
                    })]
                }
            }
        ))])

    }

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

    const addNewTask = (card_id) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)

        const newContentItems = [
            ...clientVisibleData[columnIndex].content,
            {
                id: uuidv4(),
                info: 'Новая карточка',
                marks: [],
                task_cover: {},
                deadline: {},
                task_description: {},
                sub_tasks: [],
                priority : {
                    id: 0,
                    type: 'default',
                    label: 'Нет установлен'
                },
                comments: [],
            }
        ]

        const newEl = [...clientVisibleData]

        newEl[columnIndex] = {
            ...clientVisibleData[columnIndex],
            content: newContentItems
        }

        setClientVisibleData(newEl)
    }

    const changeTitle = (card_id, value) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)

        // let newData = clientVisibleData[columnIndex]
        let newTitleData = {
                id: clientVisibleData[columnIndex].id,
                title: value,
                content: clientVisibleData[columnIndex].content
            }
        const newItems = [...(clientVisibleData.map((column_id, index) =>
                column_id.id !== card_id
                    ?
                        clientVisibleData[index]
                    :
                        newTitleData
        ))]

        setClientVisibleData(newItems)
    }

    const changeTaskInfo = (task_id, card_id, value) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)
        let newTask = {
            id: clientVisibleData[columnIndex].content[taskIndex].id,
            info: value,
            marks: clientVisibleData[columnIndex].content[taskIndex].marks,
            task_cover: clientVisibleData[columnIndex].content[taskIndex].task_cover,
            deadline: clientVisibleData[columnIndex].content[taskIndex].deadline,
            task_description: clientVisibleData[columnIndex].content[taskIndex].task_description,
            sub_tasks: clientVisibleData[columnIndex].content[taskIndex].sub_tasks,
            priority: clientVisibleData[columnIndex].content[taskIndex].priority,
            comments: clientVisibleData[columnIndex].content[taskIndex].comments,
        }
        const newItems = [...(clientVisibleData.map((column_id, col_index) =>
            column_id.id !== card_id
                ?
                clientVisibleData[col_index]
                :
                {
                    id:  clientVisibleData[col_index].id,
                    title: clientVisibleData[col_index].title,
                    content: [...clientVisibleData[col_index].content.map((task, row_index) =>
                        task.id !== task_id
                            ?
                            clientVisibleData[col_index].content[row_index]
                            :
                            newTask
                    )]
                }
        ))]

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

        setClientVisibleData(newEl)
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
                                                    card_data={card}
                                                    card_title={card.title}
                                                    titleOnChange={changeTitle}
                                                    newTaskOnClick={addNewTask}
                                                    changeTaskInfo={changeTaskInfo}
                                                    onChangeCardMark={onChangeCardMark}
                                                    onChangeDescription={onChangeDescription}

                                                    index={card.id}
                                                    clientVisibleData={clientVisibleData}
                                                    moveCardViaButtons={moveCardViaButtons}
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