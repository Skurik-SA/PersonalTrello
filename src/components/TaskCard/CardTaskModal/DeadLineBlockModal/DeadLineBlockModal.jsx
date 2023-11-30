import styles from "./DeadLineBlockModal.module.css"
import Dates from "../../../../assets/Icons/Dates.jsx";
import * as deadline from "../../../../utils/StatusConstants.js";
import WorkDone from "../../../../assets/Icons/WorkDone.jsx";
import EmptyBox from "../../../../assets/Icons/EmptyBox.jsx";
import dayjs from "dayjs";
import Status from "../../../../assets/Icons/Status.jsx";
import {useDeadLine} from "../../../../hooks/useDeadLine.js";

const DeadLineBlockModal = (props) => {

    const {
        column_id,
        task
    } = props

    const setDeadLine = useDeadLine()

    return (
        <>
            {task.deadline.dateJsFormatDate
                ?
                <div className={styles.deadlineModal}>
                    <Dates/>
                    <span className={styles.deadlineModal_Label}>
                        Срок:
                    </span>
                    <span className={
                        task.deadline.type === deadline.DONE
                            ?
                            styles.deadlineModal_DeadlineDone
                            :
                            styles.deadlineModal_DeadlineNotDone
                    }

                          onClick={(e) => {
                              e.stopPropagation()
                              if (task.deadline.type === deadline.DONE) {
                                  setDeadLine(task.id, column_id, task.deadline.dateJsFormatDate, "set", deadline.NOT_DONE)
                              }
                              else {
                                  setDeadLine(task.id, column_id, task.deadline.dateJsFormatDate, "set", deadline.DONE)
                              }
                          }}
                    >
                        {task.deadline.type === deadline.DONE
                            ?
                            <WorkDone/>
                            :
                            <EmptyBox/>
                        }
                        <span>
                            {dayjs(task.deadline.dateJsFormatDate).format("DD-MMM-YYYY")}
                        </span>
                    </span>
                </div>
                :
                <></>
            }
            {task.deadline.type
                ?
                <div className={styles.deadlineModal}>
                    <Status/>
                    <span className={styles.deadlineModal_Label}>Статус: </span>
                    <span>
                        {task.deadline.type === deadline.FAILED ?
                            "Срок сдачи просрочен" : <></>
                        }
                        {task.deadline.type === deadline.DONE ?
                            "Задание выполнено" : <></>
                        }
                        {task.deadline.type === deadline.SOON_EXPIRE ?
                            "Срок сдачи скоро истекает" : <></>
                        }
                        {task.deadline.type === deadline.NOT_DONE ?
                            "Срок сдачи нескоро" : <></>
                        }
                    </span>
                </div>
                :
                <></>
            }
        </>
    )
}

export default DeadLineBlockModal;