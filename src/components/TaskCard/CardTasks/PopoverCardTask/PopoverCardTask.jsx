import styles from "./PopoverCardTask.module.css"
import {createTheme, Popover, TextareaAutosize, ThemeProvider} from "@mui/material";
import CardMarks from "../CardMarks/CardMarks.jsx";
import Task from "../../../../assets/Icons/Task.jsx";
import ButtonChangeMark from "../../TaskButtons/ButtonChangeMark/ButtonChangeMark.jsx";
import ButtonChangePriorityCard from "../../TaskButtons/ButtonChangePriorityCard/ButtonChangePriorityCard.jsx";
import ButtonMoveCard from "../../TaskButtons/ButtonMoveCard/ButtonMoveCard.jsx";
import ButtonCopyCard from "../../TaskButtons/ButtonCopyCard/ButtonCopyCard.jsx";
import ButtonDate from "../../TaskButtons/ButtonDate/ButtonDate.jsx";
import ButtonDeleteCard from "../../TaskButtons/ButtonDeleteCard/ButtonDeleteCard.jsx";
import {useState} from "react";
import {useDeadLine} from "../../../../hooks/useDeadLine.js";

const PopoverCardTask = (props) => {

    const setDeadLine = useDeadLine()

    const {
        anchorEl,
        setAnchorEl,
        top,
        left,

        markTextShow,
        setMarkTextShow,
        task,
        value,
        setValue,
        column_id,
        handleClick,
        changeTaskInfo,
    } = props


    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? 'card-popover' : undefined;

    const theme = createTheme({
        components: {
            // Name of the component
            MuiPopover: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        background: 'rgba(0, 0, 0, 0.5)',
                    },
                    paper: {
                        background: 'transparent',
                        transformOrigin: '0 100 0',
                        boxShadow: 'none',
                    }
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Popover
                id={id}
                open={open}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={{top, left}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transitionDuration={0}
            >
                <div className={styles.cardEditPopperRow}>
                    <div className={styles.cardEditPopperColumn}>
                        <div className={styles.cardEditPopperWrapper} >
                            <div className={styles.cardEditPopper}>
                                <div className={styles.marksPopper}>
                                    <CardMarks
                                        marks={task.marks}
                                        markTextShow={markTextShow}
                                        setMarkTextShow={setMarkTextShow}
                                    />
                                </div>
                                <TextareaAutosize
                                    className={styles.taskTextArea}
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') {
                                            changeTaskInfo(task.id, column_id, value)
                                        }
                                    }}
                                    autoFocus={true}
                                    spellCheck="false"
                                />

                            </div>

                        </div>
                        <button className={styles.cardEditPopperSaveButton}
                                onClick={() => {
                                    changeTaskInfo(task.id, column_id, value)
                                    handleClose()
                                }}
                        >
                            Сохранить
                        </button>
                    </div>
                    <div className={styles.cardEditPopperMenuWrapper}>
                        <button className={styles.cardEditPopperMenuButton}
                                onClick={(e) => {
                                    handleClose()
                                    handleClick(e, 'full')
                                }}
                        >
                                       <span>
                                           <Task/>
                                       </span>
                            <span className={styles.buttonTextMobile}>
                                           Открыть задачу
                                       </span>
                        </button>
                        <ButtonChangeMark
                            task_id={task.id}
                            card_marks={task.marks}
                        />
                        <ButtonChangePriorityCard
                            column_id={column_id}
                            task_id={task.id}
                        />
                        <ButtonMoveCard
                            task_id={task.id}
                        />
                        <ButtonCopyCard
                            task={task}
                            copiedValue={value}
                            task_id={task.id}
                        />
                        <ButtonDate
                            setDeadLine={setDeadLine}
                            task_id={task.id}
                            task={task}
                            column_id={column_id}
                        />
                        <ButtonDeleteCard
                            column_id={column_id}
                            task_id={task.id}
                        />
                    </div>
                </div>
            </Popover>
        </ThemeProvider>
    )
}

export default PopoverCardTask;