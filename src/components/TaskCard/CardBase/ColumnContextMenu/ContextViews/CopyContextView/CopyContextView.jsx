import styles from "./CopyContextView.module.css"
import {TextareaAutosize} from "@mui/material";
import PropTypes from "prop-types";
import {useRef, useState} from "react";

const CopyContextView = (props) => {

    const {
        card_data_id,
        copyColumn,
    } = props

    const [textAreaValue, setTextAreaValue] = useState("")
    const textAreaRef = useRef(null)
    return (
        <div className={styles.copyContextView}>
            <TextareaAutosize
                ref={textAreaRef}
                className={styles.copyContextView_textarea}
                maxRows={10}
                value={textAreaValue}
                onChange={(e) => {setTextAreaValue(e.target.value)}}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        copyColumn(card_data_id, textAreaValue)
                    }
                }}
            />
            <button className={styles.copyContextView_button}
                    onClick={() => {
                        if (textAreaValue === "") {
                            textAreaRef.current.focus()
                            return
                        }
                        copyColumn(card_data_id, textAreaValue)
                    }}
            >
                Копировать
            </button>
        </div>
    )
}

CopyContextView.propTypes = {
    card_data_id: PropTypes.any,
    copyColumn: PropTypes.func,
}

export default CopyContextView