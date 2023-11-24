import styles from "./ButtonDeleteCard.module.css"
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";

const ContentDeleteCard = (props) => {

    const {
        clientVisibleData,
        task_id,
        column_id,
        deleteCard,
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
                    Архивировать
                </button>
                <button className={styles.contentDeleteCard_deleteButton} onClick={() => deleteCard(task_id, column_id)}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default ContentDeleteCard;