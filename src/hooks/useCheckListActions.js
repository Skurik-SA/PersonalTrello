import {v4 as uuidv4} from "uuid";
import {cloneDeep} from "lodash-es";
import {useContext} from "react";
import BoardContext from "../context/BoardContext.jsx";


export const useCheckListActions = (task_id, card_id) => {

    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)


    const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
    const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)

    const addNewCheckList = (value) => {

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

    const deleteSomeCheckList = (sub_task_id) => {
        const sub_tasks = clientVisibleData[columnIndex].content[taskIndex].sub_tasks.filter((task) => task.id !== sub_task_id)

        const newData = cloneDeep(clientVisibleData)
        newData[columnIndex].content[taskIndex].sub_tasks = sub_tasks
        setClientVisibleData(newData)
    }

    const deleteSomeCheckBox = (sub_task_id, check_box_id, checked) => {
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

    const addNewTaskIntoCheckList = (sub_task_id, value) => {
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

    const onChangeCheckListCheckBox = (sub_task_id, check_box_id, checked) => {
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

    const onChangeValueCheckBox = (sub_task_id, check_box_id, value) => {
        const subTaskIndex = clientVisibleData[columnIndex].content[taskIndex].sub_tasks.findIndex((task) => task.id === sub_task_id)
        const checkBoxIndex = clientVisibleData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].check_list.findIndex((task) => task.id === check_box_id)

        const newData = cloneDeep(clientVisibleData)

        newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].check_list[checkBoxIndex].label = value ? value : newData[columnIndex].content[taskIndex].sub_tasks[subTaskIndex].check_list[checkBoxIndex].label
        setClientVisibleData(newData)
    }


    return {addNewCheckList, deleteSomeCheckList, deleteSomeCheckBox, addNewTaskIntoCheckList, onChangeCheckListCheckBox, onChangeValueCheckBox}
}

