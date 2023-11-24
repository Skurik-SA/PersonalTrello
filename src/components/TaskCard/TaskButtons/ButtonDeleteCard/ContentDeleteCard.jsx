import styles from "./ButtonDeleteCard.module.css"
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";

const ContentDeleteCard = (props) => {

    const {
        clientVisibleData,
        task_id,
        handleClose,
    } = props

    return (
        <div className={styles.contentDeleteWrapper}>
            <div className={styles.contentDelete_title}>
                Удалить
                <button className={styles.contentDelete_exit} onClick={handleClose}>
                    <ExitModal/>
                </button>
            </div>
            <div className={styles.contentDeleteWrapper}>
                <button className={styles.contentDeleteCard_archiveButton}>
                    Сохранить
                </button>
                <button className={styles.contentDeleteCard_deleteButton}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default ContentDeleteCard;