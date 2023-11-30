import styles from "./CardBoard.module.css"
import ScrollContainer from "react-indiana-drag-scroll";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import CardBase from "../CardBase/CardBase.jsx";
import {PureComponent, useContext, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {useDispatch} from "react-redux";
import dayjs from "dayjs";
import {flushSync} from "react-dom";
import {DONE, FAILED, NOT_DONE, SOON_EXPIRE, UNSET} from "../../../utils/StatusConstants.js";
import {cloneDeep} from "lodash-es";
import {set_todolist} from "../../../redux/store/slices/slice_ToDoList.js";
import BoardContext from "../../../context/BoardContext.jsx";
import {findColumnIndex} from "../../../utils/FindColumnIndex.js";

class InnerCardList extends PureComponent {
    render() {
        const {
            card_data,
            card_title,
            onChangeCardMark,
            index,
            markTextShow,
            setMarkTextShow,
            clientVisibleData,
            addNewTaskIntoCheckList,
            onChangeCheckListCheckBox,
            onChangeValueCheckBox,
            deleteSomeCheckList,
            deleteSomeCheckBox,

            addNewCheckList
        } = this.props

        return <CardBase
                    card_data={card_data}
                    card_title={card_title}
                    onChangeCardMark={onChangeCardMark}
                    clientVisibleData={clientVisibleData}
                    addNewCheckList={addNewCheckList}
                    index={index}
                    addNewTaskIntoCheckList={addNewTaskIntoCheckList}
                    onChangeCheckListCheckBox={onChangeCheckListCheckBox}
                    onChangeValueCheckBox={onChangeValueCheckBox}
                    deleteSomeCheckList={deleteSomeCheckList}
                    deleteSomeCheckBox={deleteSomeCheckBox}

                    markTextShow={markTextShow}
                    setMarkTextShow={setMarkTextShow}
                />
    }
}

const CardBoard = (props) => {

    // const {
    //
    // } = props

    // const [clientVisibleData, setClientVisibleData] = useState(data)
    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)

    const [markTextShow, setMarkTextShow] = useState(false)
    // Это костыль, но зато какой, потом с бэком скорее всего менять придётся
    const dispatch = useDispatch()


    const addNewCheckList = (task_id, card_id, value) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)

        const newCheckList =
            {
                id: uuidv4(),
                title: value ? value : 'Чек-лист',
                success_amount: 0,
                total_amount: 0,
                check_list: []
            }


        const newData = cloneDeep(clientVisibleData)
        newData[columnIndex].content[taskIndex].sub_tasks.push(newCheckList)
        setClientVisibleData(newData)
    }

    const deleteSomeCheckList = (task_id, card_id, sub_task_id) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)
        const sub_tasks = clientVisibleData[columnIndex].content[taskIndex].sub_tasks.filter((task) => task.id !== sub_task_id)


        const newData = cloneDeep(clientVisibleData)
        newData[columnIndex].content[taskIndex].sub_tasks = sub_tasks
        setClientVisibleData(newData)
    }

    const deleteSomeCheckBox = (task_id, card_id, sub_task_id, check_box_id, checked) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)
        const subTaskIndex = clientVisibleData[columnIndex].content[taskIndex].sub_tasks.findIndex((task) => task.id === sub_task_id)
        const newCheckBoxesArray = clientVisibleData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].check_list.filter((task) => task.id !== check_box_id)

        const newData = cloneDeep(clientVisibleData)
        if (checked) {
            newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].success_amount -= 1
        }
        newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].total_amount -= 1
        newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].check_list = newCheckBoxesArray
        setClientVisibleData(newData)
    }

    const addNewTaskIntoCheckList = (task_id, card_id, sub_task_id, value) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)
        const subTaskIndex = clientVisibleData[columnIndex].content[taskIndex].sub_tasks.findIndex((task) => task.id === sub_task_id)

        const newSubTasks = {
            id: uuidv4(),
            isChecked: false,
            label: value ? value : 'Новая задача',
            deadline: {
                type: '',
                remaining: '',
                end: '',
            }
        }

        const newData = cloneDeep(clientVisibleData)
        newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].total_amount += 1
        newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].check_list.push(newSubTasks)
        setClientVisibleData(newData)
    }

    const onChangeCheckListCheckBox = (task_id, card_id, sub_task_id, check_box_id, checked) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)
        const subTaskIndex = clientVisibleData[columnIndex].content[taskIndex].sub_tasks.findIndex((task) => task.id === sub_task_id)
        const checkBoxIndex = clientVisibleData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].check_list.findIndex((task) => task.id === check_box_id)


        const newData = cloneDeep(clientVisibleData)
        if (checked) {
            newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].success_amount += 1
        }
        else {
            newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].success_amount -= 1
        }

        newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].check_list[checkBoxIndex].isChecked = checked
        setClientVisibleData(newData)
    }

    const onChangeValueCheckBox = (task_id, card_id, sub_task_id, check_box_id, value) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)
        const subTaskIndex = clientVisibleData[columnIndex].content[taskIndex].sub_tasks.findIndex((task) => task.id === sub_task_id)
        const checkBoxIndex = clientVisibleData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].check_list.findIndex((task) => task.id === check_box_id)


        const newData = cloneDeep(clientVisibleData)

        newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].check_list[checkBoxIndex].label = value ? value : newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].check_list[checkBoxIndex].label
        setClientVisibleData(newData)
    }

    const onChangeCardMark = (task_id, new_mark, type="add") => {

        const columnIndex = findColumnIndex(clientVisibleData, task_id, 'index')
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

        setClientVisibleData([...(clientVisibleData.map((column, col_index) =>
            {
                return {
                    id:  column.id,
                    title: column.title,
                    content: [...column.content.map((task) =>
                    {
                        return {
                            id: task.id,
                            info: task.info,
                            marks: validateMark(task.marks, col_index, task.id),
                            task_cover: task.task_cover,
                            deadline: task.deadline,
                            task_description: task.task_description,
                            sub_tasks: task.sub_tasks,
                            priority: task.priority,
                            comments: task.comments,
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
                                                    clientVisibleData={clientVisibleData}


                                                    onChangeCardMark={onChangeCardMark}
                                                    addNewTaskIntoCheckList={addNewTaskIntoCheckList}
                                                    onChangeCheckListCheckBox={onChangeCheckListCheckBox}
                                                    onChangeValueCheckBox={onChangeValueCheckBox}
                                                    deleteSomeCheckList={deleteSomeCheckList}
                                                    deleteSomeCheckBox={deleteSomeCheckBox}

                                                    addNewCheckList={addNewCheckList}

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