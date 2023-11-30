import styles from "./ButtonDeleteCard.module.css"
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";
import {useContext} from "react";
import BoardContext from "../../../../context/BoardContext.jsx";

const ContentDeleteCard = (props) => {

    const {
        task_id,
        column_id,
        handleClose,
    } = props

    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)

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