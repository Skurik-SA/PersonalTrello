import styles from './BaseContextView.module.css';
import {Divider} from "@mui/material";
import PropTypes from "prop-types";

const COPY_CARD = "copy_card"
const MOVE_CARD = "move_card"
const SORT_CARD = "sort_card"

const BaseContextView = (props) => {

    const {
        handleClose,
        card_data_id,
        deleteColumn,
        newTaskOnClick,
        setCurrentContextView,
    } = props

    return (
        <div className={styles.columnContextMenu}>
            <button className={styles.columnContextMenu_button} onClick={() => {
                newTaskOnClick(card_data_id)
                handleClose()
            }}>
                <span>Добавить карточку</span>
            </button>
            <button className={styles.columnContextMenu_button} onClick={() => {
                setCurrentContextView(COPY_CARD)
            }}>
                <span>Копирование колонки</span>
            </button>
            <button className={styles.columnContextMenu_button} onClick={() => {
                setCurrentContextView(MOVE_CARD)
            }}>
                <span>Перемещение колонки</span>
            </button>
            <div style={{
                width: '100%',
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '10px',
                paddingBottom: '10px'
            }}>
                <Divider sx={{width: '94%', background: '#af2e82'}}/>
            </div>
            <button className={styles.columnContextMenu_button} onClick={() => {
                setCurrentContextView(SORT_CARD)
            }}>
                <span>Сортировать по...</span>
            </button>
            <div style={{
                width: '100%',
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '10px',
                paddingBottom: '10px'
            }}>
                <Divider sx={{width: '94%', background: '#af2e82'}}/>
            </div>
            <button className={styles.columnContextMenu_button} onClick={() => {
                deleteColumn(card_data_id)
            }}>
                <span>Удалить колонку</span>
            </button>
        </div>
    )
}

BaseContextView.propTypes = {
    handleClose: PropTypes.func,
    card_data_id: PropTypes.any,
    copyColumn: PropTypes.func,
    deleteColumn: PropTypes.func,
    newTaskOnClick: PropTypes.func,
    setCurrentContextView: PropTypes.func
}

export default BaseContextView;