
import styles from "./ButtonDate.module.css"
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";
import CustomDatePicker from "../../../CustomDateTime/CustomDatePicker.jsx";
import CustomDateField from "../../../CustomDateTime/CustomDateField.jsx";
import {useState} from "react";
import dayjs from "dayjs";
import CustomTimeField from "../../../CustomDateTime/CustomTimeField.jsx";


const ContentDate = (props) => {

    const {
        clientVisibleData,
        task_id,
        handleClose
    } = props

    const [date, setDate] = useState(dayjs())
    const [time, setTime] = useState()

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
                <CustomDatePicker value={date} setValue={setDate}/>
                <div className={styles.contentDate_inputLayout}>
                    <CustomDateField value={date} setValue={setDate}/>
                    <CustomTimeField value={time} setValue={onChangeTime}/>
                </div>
                <button className={styles.contentDate_saveButton}>
                    Сохранить
                </button>
                <button className={styles.contentDate_deleteButton}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default ContentDate;