
import styles from "./ButtonDate.module.css"
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";
import CustomDatePicker from "../../../CustomDateTime/CustomDatePicker.jsx";
import CustomDateField from "../../../CustomDateTime/CustomDateField.jsx";
import {useContext, useState} from "react";
import dayjs from "dayjs";
import CustomTimeField from "../../../CustomDateTime/CustomTimeField.jsx";
import {DONE, FAILED, NOT_DONE, SOON_EXPIRE, UNSET} from "../../../../utils/StatusConstants.js";
import BoardContext from "../../../../context/BoardContext.jsx";
import {useDeadLine} from "../../../../hooks/useDeadLine.js";

const ContentDate = (props) => {

    const {
        task_id,
        column_id,
        handleClose,
        task,
    } = props

    const [date, setDate] = useState(task.deadline.dateJsFormatDate ? task.deadline.dateJsFormatDate : dayjs().locale('ru'))
    const [time, setTime] = useState()

    const setDeadLine = useDeadLine()

    const onChangeDate = (newValue) => {
        setDate(newValue)
        console.log(newValue)
        console.log(dayjs())
    }

    const onChangeTime = (newValue) => {
        setTime(newValue)
        console.log(newValue)
    }


    return (
        <div className={styles.contentDateWrapper}>
            <div className={styles.contentDate_title}>
                Даты
                <button className={styles.contentDate_exit} onClick={handleClose}>
                    <ExitModal/>
                </button>
            </div>
            <div className={styles.contentDate_wrapper}>
                <CustomDatePicker value={date} setValue={onChangeDate}/>
                <div className={styles.contentDate_inputLayout}>
                    <CustomDateField value={date} setValue={onChangeDate}/>
                    <CustomTimeField value={time} setValue={onChangeTime}/>
                </div>
                <button className={styles.contentDate_saveButton}
                        onClick={() => setDeadLine(task_id, column_id, date, "set", "NotDone")}
                >
                    Сохранить
                </button>
                <button className={styles.contentDate_deleteButton}
                        onClick={() => {
                            setDeadLine(task_id, column_id, date, "delete")
                            handleClose()
                        }}
                >
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default ContentDate;