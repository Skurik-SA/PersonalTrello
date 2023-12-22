import dayjs from "dayjs";
import {DONE, FAILED, NOT_DONE, SOON_EXPIRE, UNSET} from "../utils/StatusConstants.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import {useContext} from "react";
import BoardContext from "../context/BoardContext.jsx";
import {cloneDeep} from "lodash-es";


export const useDeadLine = () => {

    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)

    const setDeadLine = (task_id, card_id, date, action="set", type='') => {
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
        // const newTask = cloneDeep(clientVisibleData[columnIndex].content[taskIndex])
        // newTask.deadline = action === "set" ? {
        //     type: deadlineType,
        //     remaining: '',
        //     end: '',
        //     dateJsFormatDate: date,
        //     dateJsFormatTime: {},
        // } : {}
        let newTask = {
            id: clientVisibleData[columnIndex].content[taskIndex].id,
            is_visible: clientVisibleData[columnIndex].content[taskIndex].is_visible,
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
    }

    return setDeadLine
}