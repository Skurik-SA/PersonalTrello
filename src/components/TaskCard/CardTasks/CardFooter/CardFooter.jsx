import styles from "./CardFooter.module.css"
import * as deadline from "../../../../utils/StatusConstants.js";
import Dates from "../../../../assets/Icons/Dates.jsx";
import WorkDone from "../../../../assets/Icons/WorkDone.jsx";
import EmptyBox from "../../../../assets/Icons/EmptyBox.jsx";
import dayjs from "dayjs";
import Description from "../../../../assets/Icons/Description.jsx";
import Comments from "../../../../assets/Icons/Comments.jsx";
import CheckList from "../../../../assets/Icons/CheckList.jsx";
import Notifications from "../../../../assets/Icons/Notifications.jsx";
import {useDeadLine} from "../../../../hooks/useDeadLine.js";

const CardFooter = (props) => {

    const {
        task,
        daysLeft,
        column_id,

        handleClick,
        totalSubTasks,
        totalSuccessSubTasks,
    } = props

    const setDeadLine = useDeadLine()

    return (
        <div className={styles.cardTasks_downLabelsWrapper}
             onClick={(e) => {
                 handleClick(e, 'full')
             }}
        >
            {task.deadline.dateJsFormatDate
                ?
                <div className={styles.cardTasks_downLabelDate}
                     onClick={(e) => {
                         e.stopPropagation()
                         if (task.deadline.type === deadline.DONE) {
                             setDeadLine(task.id, column_id, task.deadline.dateJsFormatDate, "set", deadline.NOT_DONE)
                         }
                         else {
                             setDeadLine(task.id, column_id, task.deadline.dateJsFormatDate, "set", deadline.DONE)
                         }
                     }}
                     style={
                         task.deadline.type === deadline.DONE
                             ?
                             {background: "#2d600f"}
                             :
                             daysLeft < 0
                                 ?
                                 {background: "#600f27"}
                                 :
                                 3 >= daysLeft > 0
                                     ?
                                     {background: '#833606'}
                                     :
                                     {
                                         background: 'transparent',
                                         border: '1px solid #722eb9'
                                     }
                         /*{background: '#722eb9'}*/
                     }
                >
                    {task.deadline.type === deadline.DONE
                        ?
                        <>
                            <span className={styles.cardTasks_dateLogoClock}>
                                <Dates/>
                            </span>
                            <span className={styles.cardTasks_dateLogoCheckList}>
                                <WorkDone/>
                            </span>
                        </>
                        :
                        <>
                            <span className={styles.cardTasks_dateLogoClock} >
                                <Dates/>
                            </span>
                            <span className={styles.cardTasks_dateLogoCheckList} >
                                <EmptyBox/>
                            </span>
                        </>
                    }
                    <div>
                        {dayjs(task.deadline.dateJsFormatDate).format('DD MMM')}
                    </div>
                </div>
                :
                <></>
            }
            {task.task_description.text
                ?
                <div className={styles.cardTasks_downLabel}>
                    <Description/>
                </div>
                :
                <></>
            }
            {task.comments && task.comments.length > 0
                ?
                <div className={styles.cardTasks_downLabel}>
                    <Comments/>
                    {task.comments.length}
                </div>
                :
                <></>
            }
            {task.sub_tasks && task.sub_tasks.length > 0
                ?
                <div className={styles.cardTasks_downLabel}>
                    <CheckList/>
                    {totalSuccessSubTasks}/{totalSubTasks}
                </div>
                :
                <></>
            }
            <div className={styles.cardTasks_downLabel}>
                <Notifications/>
                5
            </div>
        </div>
    )
}

export default CardFooter;