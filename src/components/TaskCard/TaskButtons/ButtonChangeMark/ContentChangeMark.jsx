import styles from "./ChangeMark.module.css"
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";
import Pen from "../../../../assets/Icons/Pen.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {ChromePicker} from "react-color";
import {create_new_mark} from "../../../../redux/store/slices/slice_ToDoList.js";

const ContentChangeMark = (props) => {

    const dispatch = useDispatch()
    const marks = useSelector(state => state.todolist.mark_store)

    const [windowSelector, setWindowSelector] = useState("choose")

    const [bgcolor, setBgcolor] = useState("#4B0F29")
    const [newMarkText, setNewMarkText] = useState("")
    const [newMarkFontColor, setNewMarkFontColor] = useState("#000")
    const [newMark, setNewMark] = useState({
        id: marks.length + 1,
        font_color: '#000',
        color: "#" + Math.random().toString(16).substr(-6),
        mark_text: ''
    })

    const handleColorPickChange = (color) => {
        console.log(color.hex)
        setBgcolor(color.hex)
        setNewMark({
            id: marks.length + 1,
            font_color: newMark.font_color,
            color: color.hex,
            mark_text: newMark.mark_text
        })
    }

    const onNewMarkTextChange = (e) => {
        setNewMarkText(e.target.value)
        setNewMark({
            id: marks.length + 1,
            font_color: newMark.font_color,
            color: newMark.color,
            mark_text: e.target.value
        })
    }

    const onNewMarkFontColorClick = () => {
        setNewMarkFontColor(newMarkFontColor === "#000" ? "#fff" : "#000")
        setNewMark({
            id: marks.length + 1,
            font_color: newMarkFontColor === "#000" ? "#fff" : "#000",
            color: newMark.color,
            mark_text: newMark.mark_text
        })
    }

    const dumpMark = () => {
        setNewMark({
            id: marks.length + 2,
            font_color: '#000',
            color: "#" + Math.random().toString(16).substr(-6),
            mark_text: ''
        })
    }

    const {
        onChangeCardMark,
        task_id,
        handleClose,
        card_marks,
    } = props

    useEffect(() => {

    }, [])

    return (
        <div className={styles.contentChangeMarkWrapper}>
            <div className={styles.contentChangeMark_title}>
                {windowSelector === 'edit'
                    ?
                    <button className={styles.contentReturn_return} onClick={() => {
                        setWindowSelector("choose")
                        dumpMark()
                    }}>
                        <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.896729" y="7.38086" width="11" height="2" rx="1" transform="rotate(-41.3176 0.896729 7.38086)" fill="#DBA498"/>
                            <rect x="2.13623" y="6.16138" width="11" height="2" rx="1" transform="rotate(39.2293 2.13623 6.16138)" fill="#DBA498"/>
                        </svg>
                    </button>
                    :
                    <>
                    </>
                }
                Метки
                <button className={styles.contentChangeMark_exit} onClick={handleClose}>
                    <ExitModal/>
                </button>
            </div>
            {windowSelector === 'choose'
                ?
                    <div className={styles.contentChangeMark}>
                        <input
                            placeholder={"Искать метки"}
                            className={styles.contentChangeMark_input}
                        />
                        <span className={styles.contentChangeMark_subTitle}>
                            Метки
                        </span>
                        <div style={{width: '100%'}}>
                            <FormGroup>
                                {marks.length > 0 && marks.map((mark) =>
                                    <div key={mark.id} className={styles.contentChangeMark_fromControl} >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        card_marks.findIndex((nd) => nd.id === mark.id) !== -1
                                                    }
                                                    onChange={() => {
                                                        onChangeCardMark(task_id, mark)
                                                    }}
                                                    sx={{ '& + *': { fontSize: '0.9rem' } }}
                                                />
                                            }
                                            label={
                                                <div style={{background: `${mark.color}`, color: `${mark.font_color}`}} className={styles.contentChangeMark_markStyle}>
                                                    <span className={styles.contentChangeMark_spanContent}>
                                                        {mark.mark_text}
                                                    </span>
                                                </div>
                                            }
                                        />
                                        <button className={styles.contentChangeMark_editMark}>
                                            <Pen/>
                                        </button>
                                    </div>
                                )}
                            </FormGroup>
                        </div>
                        <button className={styles.contentChangeMark_createNewMark} onClick={() => setWindowSelector("edit")}>
                            Создать новую метку
                        </button>
                    </div>
                :
                <div className={styles.contentEditMarkWrapper}>
                    <div className={styles.contentEditMark_newMarkPresentation}>
                        <span className={styles.contentEditMark_newMarkPresentation_Span}
                              style={{
                                  background: newMark.color,
                                  color: newMarkFontColor,
                              }}
                              onClick={(e) => onNewMarkFontColorClick(e)}
                        >
                            {newMarkText}
                        </span>
                    </div>
                    <div>
                        <input
                            value={newMarkText}
                            onChange={(e) => onNewMarkTextChange(e)}
                            placeholder={"Название метки"}
                            className={styles.contentChangeMark_input}
                        />
                    </div>
                    <div style={{colorScheme: 'light', overflow: 'hidden', borderRadius: '0 0 15px 15px'}}>
                        <ChromePicker
                            color={newMark.color}
                            onChange={handleColorPickChange}
                            width={300}
                            background={'black'}
                            disableAlpha={true}
                        >

                        </ChromePicker>
                    </div>
                    <div className={styles.contentEditMarkButtonsWrapper}>
                        <button className={styles.contentEditMarkCreateButton} onClick={() => {
                            dispatch(create_new_mark(newMark))
                            setWindowSelector("choose")
                            dumpMark()
                        }}>
                            Создать
                        </button>
                    </div>
                </div>

            }

        </div>
    )
}

export default ContentChangeMark;