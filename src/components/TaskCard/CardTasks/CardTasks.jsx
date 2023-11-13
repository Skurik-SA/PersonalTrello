import styles from "./CardTasks.module.css"
import {useEffect, useRef, useState} from "react";
import {
    createTheme, Divider,
    Fade,
    Grow,
    Modal,
    Popover,
    Popper,
    TextareaAutosize,
    ThemeProvider,
    Typography
} from "@mui/material";

const CardTasks = (props) => {

    const {
        task,
        column_id,
        changeTaskInfo,
    } = props

    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)

    const [value, setValue] = useState(task.info)
    const [valueDescription, setValueDescription] = useState("")

    const handleModalClose = () => setModalOpen(false);

    const handleClick = (event, type) => {

        if (type === 'mini') {
            setAnchorEl(event.currentTarget);
            var element = document.getElementById(task.id);
            var rect = element.getBoundingClientRect();
            var xPosition = rect.left;
            var yPosition = rect.top;

            setTop(yPosition)
            setLeft(xPosition)
            console.log(task)
            console.log(column_id)
        }
        else if (type === 'full') {
            setModalOpen(true);
        }
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

    const theme2 = createTheme({
        components: {
            // Name of the component
            MuiModal: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        display: 'flex',
                        background: 'rgba(0, 0, 0, 0.5)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'auto',
                        height: '100vh',

                    },
                    backdrop: {
                        border: 'none',
                        background: 'transparent',
                        paddingTop: '200px'
                        // transformOrigin: '0 100 0',
                        // boxShadow: 'none',
                    }
                },
            },
        },
    });

    return (
       <>
           <ThemeProvider theme={theme2}>
           <Modal
               disableAutoFocus
               open={modalOpen}
               onClose={handleModalClose}

           >
                   <div className={styles.fullEditWrapper}>
                       <div className={styles.fullEdit}>
                           <section className={styles.fullEditHead}>
                               <span className={styles.modalWindowTitleSVG}>
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="14" height="14" stroke="#DBA498"/>
                                        <rect x="2.72729" y="2.72729" width="9.54545" height="6.81818" fill="#DBA498"/>
                                        <rect x="2.72729" y="10.9091" width="5.45455" height="1.36364" fill="#DBA498"/>
                                        <rect x="9.54541" y="10.9091" width="2.72727" height="1.36364" fill="#DBA498"/>
                                    </svg>
                               </span>
                               <div >
                                   <TextareaAutosize
                                       value={value}
                                       className={styles.modalWindowTextArea}
                                       onChange={(e) => {
                                           setValue(e.target.value)
                                           changeTaskInfo(task.id, column_id, value)
                                       }}
                                       spellCheck="false"
                                   />
                                   <span>
                                       В колонке
                                   </span>
                               </div>
                               <button className={styles.modalWindowCloseButton} onClick={handleModalClose}>
                                       <span>
                                           <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path d="M1 1L12 12" stroke="#DBA498"/>
                                               <path d="M1 12L12 0.999993" stroke="#DBA498"/>
                                           </svg>
                                       </span>
                               </button>
                           </section>

                           <section className={styles.fullEditMidWrapper}>
                               <div className={styles.fullEditDescriptionWrapper}>
                                   <div className={styles.fullEditDescriptionHeader}>
                                       <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                           <rect width="15" height="2" rx="1" fill="#DBA498"/>
                                           <rect y="12" width="9" height="2" rx="1" fill="#DBA498"/>
                                           <rect y="9" width="15" height="2" rx="1" fill="#DBA498"/>
                                           <rect y="6" width="15" height="2" rx="1" fill="#DBA498"/>
                                           <rect y="3" width="15" height="2" rx="1" fill="#DBA498"/>
                                       </svg>
                                       <div>
                                           Описание
                                       </div>
                                   </div>
                                   <TextareaAutosize
                                       value={valueDescription}
                                       className={styles.modalWindowTextAreaDescription}
                                       onChange={(e) => {
                                           setValueDescription(e.target.value)
                                       }}
                                       spellCheck="false"
                                   />
                               </div>
                               <div className={styles.fullEditMenuWrapper}>
                                   <span className={styles.fullEditMenuSpan}>Добавить на задачу</span>
                                   <button className={styles.fullEditMenuButton}>Участники</button>
                                   <button className={styles.fullEditMenuButton}>Приоритет</button>
                                   <button className={styles.fullEditMenuButton}>Метки</button>
                                   <button className={styles.fullEditMenuButton}>Чек-лист</button>
                                   <button className={styles.fullEditMenuButton}>Даты</button>
                                   <button className={styles.fullEditMenuButton}>Вложение</button>
                                   <button className={styles.fullEditMenuButton}>Обложка</button>
                                   <span className={styles.fullEditMenuSpan}>Действия</span>
                                   <button className={styles.fullEditMenuButton}>Перемещение</button>
                                   <button className={styles.fullEditMenuButton}>Копирование</button>
                                   <button className={styles.fullEditMenuButton}>Создать шаблон</button>
                                   <Divider style={{color: 'white', background: 'white'}}/>
                                   <button className={styles.fullEditMenuButton}>Архивация</button>
                                   <button className={styles.fullEditMenuButton}>Поделиться</button>

                               </div>
                           </section>
                       </div>
                   </div>
           </Modal>
           </ThemeProvider>
           <li className={styles.taskContents} >
               <div id={task.id} className={styles.taskWrapper}
                    >
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
                                           <TextareaAutosize
                                               className={styles.taskTextArea}
                                               value={value}
                                               onChange={(e) => {
                                                   setValue(e.target.value)
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
                       </Popover>
                   </ThemeProvider>
                   <div className={styles.taskText}
                        onClick={(e) => {
                            handleClick(e, 'full')
                        }}
                   >
                       {task.info}
                   </div>
                   <button className={styles.editTaskButton}
                           onClick={(e) => {
                               e.stopPropagation();
                               handleClick(e, 'mini')
                           }}
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
       </>
    )
}

export default CardTasks;