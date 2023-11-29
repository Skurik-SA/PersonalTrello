import styles from "./CardBoard.module.css"
import ScrollContainer from "react-indiana-drag-scroll";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import CardBase from "../CardBase/CardBase.jsx";
import {PureComponent, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {useDispatch} from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import {flushSync} from "react-dom";
import {DONE, FAILED, NOT_DONE, SOON_EXPIRE, UNSET} from "../../../utils/StatusConstants.js";
import {cloneDeep} from "lodash-es";

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
            onChangeDescription,
            copyCardTo,
            deleteCard,
            setDeadline,
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
                    titleOnChange={titleOnChange}
                    newTaskOnClick={newTaskOnClick}
                    changeTaskInfo={changeTaskInfo}
                    onChangeCardMark={onChangeCardMark}
                    clientVisibleData={clientVisibleData}
                    moveCardViaButtons={moveCardViaButtons}
                    copyCardTo={copyCardTo}
                    deleteCard={deleteCard}
                    setDeadline={setDeadline}
                    onChangeDescription={onChangeDescription}
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

    const {
        data,
    } = props

    const [clientVisibleData, setClientVisibleData] = useState(data)

    const [markTextShow, setMarkTextShow] = useState(false)
    // Это костыль, но зато какой, потом с бэком скорее всего менять придётся
    const dispatch = useDispatch()

    const findColumnIndex = (fullData, source_task_id, type) => {
        let colIndex = {
            index: -1,
            id: '',
        }

        fullData.map((column, i) => column.content.map((el) => {
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

    // Вроде багов нет
    const moveCardViaButtons = (
        source_task_id,
        // source_column_id,
        destination_task_index,
        destination_column_index
        ) => {

        const source_column_index = findColumnIndex(clientVisibleData, source_task_id,'index')

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

    const copyCardTo = (
        source_task_id,
        // source_column_id,
        destination_task_index,
        destination_column_index,

        isCopyMarks,
        isCopySubTasks,
        isCopyDescription,
        value,
    ) => {

        const source_column_index = findColumnIndex(clientVisibleData, source_task_id,'index') // Откуда колонка

        const source_task_index = clientVisibleData[source_column_index].content.findIndex((row) => row.id === source_task_id) // Откуда карточка
        const newDataItems = [...clientVisibleData[source_column_index].content]

        const newDestinationItems = [...clientVisibleData[destination_column_index].content]

        const [gotItem] = newDataItems.splice(source_task_index, 1)
        const copiedItem = {
            id: uuidv4(),
            info: value ? value : gotItem.info,
            marks: isCopyMarks ? gotItem.marks : [],
            task_cover: gotItem.task_cover,
            deadline: gotItem.deadline,
            task_description: isCopyDescription ? gotItem.task_description : {},
            sub_tasks: isCopySubTasks ? gotItem.sub_tasks : [],
            priority: gotItem.priority,
            comments: gotItem.comments,
        }
        newDestinationItems.splice(destination_task_index, 0, copiedItem)

        const newEl = [...clientVisibleData]

        newEl[destination_column_index] = {
            ...clientVisibleData[destination_column_index],
            content: newDestinationItems
        }

        setClientVisibleData(newEl)
    }



    const setDeadline = (task_id, card_id, date, action="set", type='') => {
        dayjs.extend(relativeTime)
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)

        let deadlineType = UNSET
        if (type === DONE) {
            deadlineType = DONE
        } else if (type === NOT_DONE) {
            const daysLeft = date.diff(dayjs().locale('ru'), 'day', true) // Можно в remaining записывать
            if (daysLeft < 0) {
                deadlineType = FAILED
            } else if (3 >= daysLeft > 0) {
                deadlineType = SOON_EXPIRE
            } else {
                deadlineType = NOT_DONE
            }
        }

        // let newDataItems = [...clientVisibleData[columnIndex].content]
        let newTask = {
            id: clientVisibleData[columnIndex].content[taskIndex].id,
            info: clientVisibleData[columnIndex].content[taskIndex].info,
            marks: clientVisibleData[columnIndex].content[taskIndex].marks,
            task_cover: clientVisibleData[columnIndex].content[taskIndex].task_cover,
            deadline: action === "set" ? {
                type: deadlineType,
                remaining: '',
                end: '',
                dateJsFormatDate: date,
                dateJsFormatTime: {},
            } : {},
            task_description: clientVisibleData[columnIndex].content[taskIndex].task_description,
            sub_tasks: clientVisibleData[columnIndex].content[taskIndex].sub_tasks,
            priority: clientVisibleData[columnIndex].content[taskIndex].priority,
            comments: clientVisibleData[columnIndex].content[taskIndex].comments,
        }
        // newDataItems[taskIndex].deadline.dateJsFormatDate = date

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
        // console.log(dayjs(date).format('DD MMM') )
        // console.log(date )
        // console.log(dayjs().locale('ru').to(dayjs(date)) )
        // console.log(date.diff(dayjs().locale('ru'), 'day') < 3 )

    }

    const deleteCard = (task_id, card_id) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const newColumnData = [...clientVisibleData[columnIndex].content.filter((row) => row.id !== task_id)]

        const newEl = [...clientVisibleData]

        newEl[columnIndex] = {
            ...clientVisibleData[columnIndex],
            content: newColumnData
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
            task_description: {
                text: value
            },
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

                                                    newTaskOnClick={addNewTask}

                                                    titleOnChange={changeTitle}
                                                    changeTaskInfo={changeTaskInfo}
                                                    onChangeCardMark={onChangeCardMark}
                                                    onChangeDescription={onChangeDescription}
                                                    addNewTaskIntoCheckList={addNewTaskIntoCheckList}
                                                    onChangeCheckListCheckBox={onChangeCheckListCheckBox}
                                                    onChangeValueCheckBox={onChangeValueCheckBox}
                                                    deleteSomeCheckList={deleteSomeCheckList}
                                                    deleteSomeCheckBox={deleteSomeCheckBox}

                                                    moveCardViaButtons={moveCardViaButtons}
                                                    copyCardTo={copyCardTo}
                                                    deleteCard={deleteCard}
                                                    setDeadline={setDeadline}
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