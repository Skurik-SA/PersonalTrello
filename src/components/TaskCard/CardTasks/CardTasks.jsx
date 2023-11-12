import styles from "./CardTasks.module.css"
import {useEffect, useRef, useState} from "react";
import {createTheme, Fade, Grow, Popover, Popper, TextareaAutosize, ThemeProvider, Typography} from "@mui/material";

const CardTasks = (props) => {

    const {
        task,
        column_id,
        changeTaskInfo,
    } = props

    const [anchorEl, setAnchorEl] = useState(null);
    // const [checked, setChecked] = useState(false);

    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)

    const [value, setValue] = useState(task.info)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        var element = document.getElementById(task.id);
        var rect = element.getBoundingClientRect();
        var xPosition = rect.left;
        var yPosition = rect.top;

        setTop(yPosition)
        setLeft(xPosition)
        console.log(task)
        console.log(column_id)
        // setChecked(true)
        // console.log(window.getSelection())
        // console.log(element)
        // console.log(rect)
        // console.log(xPosition)
        // console.log(yPosition)
    };

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
        <li className={styles.taskContents} >
            <div id={task.id} className={styles.taskWrapper} >
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
                        // style={{borderRadius: '10px'}}
                    >
                        {/*<Grow*/}
                        {/*    in={checked}*/}
                        {/*    timeout={1450}*/}
                        {/*>*/}
                               <div className={styles.cardEditPopperRow}>
                                   <div className={styles.cardEditPopperColumn}>
                                       <div className={styles.cardEditPopperWrapper} >
                                           <div className={styles.cardEditPopper}>
                                               <TextareaAutosize
                                                   className={styles.taskTextArea}
                                                   value={value}
                                                   onChange={(e) => {
                                                       setValue(e.target.value)
                                                   }}
                                                   autoFocus={true}
                                                   spellCheck="false"
                                                   onClick={() => {

                                                   }}
                                                   // onFocus={() => {
                                                   //     this.setSelectionRange(0, this.value.length)
                                                   // }}
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
                                       <button className={styles.cardEditPopperMenuButton}>
                                           Открыть задачу
                                       </button>
                                       <button className={styles.cardEditPopperMenuButton}>
                                           Изменить метки
                                       </button>
                                       <button className={styles.cardEditPopperMenuButton}>
                                           Изменить приоритет
                                       </button>
                                       <button className={styles.cardEditPopperMenuButton}>
                                           Переместить
                                       </button>
                                       <button className={styles.cardEditPopperMenuButton}>
                                           Копировать
                                       </button>
                                       <button className={styles.cardEditPopperMenuButton}>
                                           Изменить даты
                                       </button>
                                       <button className={styles.cardEditPopperMenuButton}>
                                           Удалить
                                       </button>
                                   </div>
                               </div>
                        {/*</Grow>*/}
                    </Popover>
                </ThemeProvider>
                <div className={styles.taskText}>
                    {task.info}
                </div>
                <button className={styles.editTaskButton}
                        onClick={handleClick}
                >
                    <span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.706004" width="11.0543" height="2.98189" transform="matrix(0.706004 -0.708208 0.706004 0.708208 2.88603 9.03698)" stroke="#DBA498"/>
                            <path d="M1.57791 12.417L2.10495 9.14641L4.8383 11.8883L1.57791 12.417Z" fill="#DBA498"/>
                        </svg>
                    </span>
                </button>
            </div>
        </li>
    )
}

export default CardTasks;