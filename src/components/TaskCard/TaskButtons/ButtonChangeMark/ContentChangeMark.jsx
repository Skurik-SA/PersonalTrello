import styles from "./ChangeMark.module.css"
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";
import Pen from "../../../../assets/Icons/Pen.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useState} from "react";
import {ChromePicker} from "react-color";
import {create_new_mark, delete_mark, edit_mark} from "../../../../redux/store/slices/slice_ToDoList.js";
import {findColumnIndex} from "../../../../utils/FindColumnIndex.js";
import BoardContext from "../../../../context/BoardContext.jsx";


// Нужно как-то переделать меточную архитектуру
const ContentChangeMark = (props) => {

    const dispatch = useDispatch()
    const marks = useSelector(state => state.todolist.mark_store)

    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)

    const [windowSelector, setWindowSelector] = useState("choose") // choose || edit || create

    const [newMarkText, setNewMarkText] = useState("")
    const [newMarkFontColor, setNewMarkFontColor] = useState("#000")
    const [newMark, setNewMark] = useState({
        id: marks[marks.length - 1].id + 1,
        // id: marks[marks.length - 1].id + 1,
        font_color: '#000',
        color: "#" + Math.random().toString(16).substr(-6),
        mark_text: ''
    })

    const handleColorPickChange = (color) => {
        setNewMark({
            id: windowSelector === 'edit' ? newMark.id : marks[marks.length - 1].id + 1,
            font_color: newMark.font_color,
            color: color.hex,
            mark_text: newMark.mark_text
        })
    }

    const onNewMarkTextChange = (e) => {
        setNewMarkText(e.target.value)
        setNewMark({
            id: windowSelector === 'edit' ? newMark.id : marks[marks.length - 1].id + 1,
            font_color: newMark.font_color,
            color: newMark.color,
            mark_text: e.target.value
        })
    }

    const onNewMarkFontColorClick = () => {
        setNewMarkFontColor(newMarkFontColor === "#000" ? "#fff" : "#000")
        setNewMark({
            id: windowSelector === 'edit' ? newMark.id : marks[marks.length - 1].id + 1,
            font_color: newMarkFontColor === "#000" ? "#fff" : "#000",
            color: newMark.color,
            mark_text: newMark.mark_text
        })
    }

    const dumpMark = () => {
        setNewMarkText("")
        setNewMarkFontColor("#000")
        setNewMark({
            id: windowSelector === 'edit' ? newMark.id : marks[marks.length - 1].id + 1,
            font_color: '#000',
            color: "#" + Math.random().toString(16).substr(-6),
            mark_text: ''
        })
    }

    const toEditMark = (id, markFontColor, markBackgroundColor, markText) => {
        setNewMarkText(markText)
        setNewMarkFontColor(markFontColor)
        setNewMark({
            id: id,
            font_color: markFontColor,
            color: markBackgroundColor,
            mark_text: markText
        })
    }

    const toNewMark = () => {
        setNewMarkText("")
        setNewMarkFontColor("#000")
        setNewMark({
            id: marks[marks.length - 1].id + 1,
            font_color: '#000',
            color: "#" + Math.random().toString(16).substr(-6),
            mark_text: ''
        })
    }

    const {
        task_id,
        handleClose,
        card_marks,
    } = props

    const onChangeCardMark = (task_id, new_mark, type="add") => {

        const columnIndex = findColumnIndex(clientVisibleData, task_id, 'index')
        const validateMark = (taskMarks, col_index, row_index) => {
            for (let i = 0; i < taskMarks.length; i++) {
                if (type === "delete") {
                    return taskMarks.filter((mark) => mark.id !== new_mark.id)
                }
                if (taskMarks[i].id === new_mark.id ) {
                    if (type === "add" && row_index === task_id) {
                        return taskMarks.filter((mark) => mark.id !== new_mark.id)
                    }
                    if (type === "edit") {
                        return taskMarks.map((mark) => {
                            if (mark.id === new_mark.id) {
                                return new_mark
                            }
                            else {
                                return mark
                            }
                        })
                    }
                }
            }

            if (col_index === columnIndex && row_index === task_id)
                return [...taskMarks, new_mark]
            else
                return [...taskMarks]
        }

        setClientVisibleData([...(clientVisibleData.map((column, col_index) =>
            {
                return {
                    id:  column.id,
                    title: column.title,
                    content: [...column.content.map((task) =>
                    {
                        return {
                            id: task.id,
                            info: task.info,
                            marks: validateMark(task.marks, col_index, task.id),
                            task_cover: task.task_cover,
                            deadline: task.deadline,
                            task_description: task.task_description,
                            sub_tasks: task.sub_tasks,
                            priority: task.priority,
                            comments: task.comments,
                        }
                    })]
                }
            }
        ))])
    }



    useEffect(() => {

    }, [])

    return (
        <div className={styles.contentChangeMarkWrapper}>
            <div className={styles.contentChangeMark_title}>
                {windowSelector === 'edit' || windowSelector === 'create'
                    ?
                    <button className={styles.contentReturn_return} onClick={() => {
                        console.log(marks)
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
                                                        onChangeCardMark(task_id, mark, "add")
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
                                        <button className={styles.contentChangeMark_editMark} onClick={() => {
                                            toEditMark(mark.id, mark.font_color, mark.color, mark.mark_text)
                                            setWindowSelector("edit")
                                        }}>
                                            <Pen/>
                                        </button>
                                    </div>
                                )}
                            </FormGroup>
                        </div>
                        <button className={styles.contentChangeMark_createNewMark} onClick={() => {
                            toNewMark()
                            setWindowSelector("create")
                        }}>
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
                        {windowSelector === 'create'
                            ?
                                <button className={styles.contentEditMarkCreateButton} onClick={() => {
                                    dispatch(create_new_mark(newMark))
                                    setWindowSelector("choose")
                                    dumpMark()
                                }}>
                                    Создать
                                </button>
                            :
                                <></>
                        }
                        {windowSelector === 'edit'
                            ?
                            <button className={styles.contentEditMarkCreateButton} onClick={() => {
                                // dispatch(create_new_mark(newMark))
                                setWindowSelector("choose")
                                dispatch(edit_mark(newMark))
                                onChangeCardMark(task_id, newMark, "edit")
                                dumpMark()

                            }}>
                                Сохранить
                            </button>
                            :
                            <></>
                        }
                        {windowSelector === 'edit'
                            ?
                                <button className={styles.contentEditMarkCreateButton} onClick={() => {
                                    // dispatch(create_new_mark(newMark))
                                    setWindowSelector("choose")
                                    onChangeCardMark(task_id, newMark, "delete")
                                    dispatch(delete_mark(newMark))
                                    dumpMark()
                                }}>
                                    Удалить
                                </button>
                            :
                                <>
                                </>
                        }
                    </div>
                </div>

            }

        </div>
    )
}

export default ContentChangeMark;