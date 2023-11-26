import styles from "./ButtonCheckList.module.css"
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";
import {useState} from "react";

const ContentCheckList = (props) => {

    const {
        task_id,
        column_id,
        addNewCheckList,
        handleClose
    } = props

    const [value, setValue] = useState("Чек-лист")

    return (
        <div className={styles.contentCheckListWrapper}>
            <div className={styles.contentCheckList_title}>
                Чек-листы
                <button className={styles.contentCheckList_exit} onClick={handleClose}>
                    <ExitModal/>
                </button>
            </div>
            <div className={styles.contentCheckListControlsWrapper}>
                <div className={styles.contentCheckList_inputWrapper}>
                    <label className={styles.contentCheckList_label}>
                        Название
                    </label>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className={styles.contentCheckList_input}
                    />
                </div>
                <button className={styles.contentCheckList_setButton}
                        onClick={() => {
                            addNewCheckList(task_id, column_id, value)
                            handleClose()
                        }}>
                    Добавить
                </button>
            </div>
        </div>
    )
}

export default ContentCheckList;