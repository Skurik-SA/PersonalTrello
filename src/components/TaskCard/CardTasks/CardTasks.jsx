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
import Description from "../../../assets/Icons/Description.jsx";
import CheckList from "../../../assets/Icons/CheckList.jsx";
import Comments from "../../../assets/Icons/Comments.jsx";
import Participants from "../../../assets/Icons/Participants.jsx";
import Priority from "../../../assets/Icons/Priority.jsx";
import Marks from "../../../assets/Icons/Marks.jsx";
import Dates from "../../../assets/Icons/Dates.jsx";
import Attachments from "../../../assets/Icons/Attachments.jsx";
import Cover from "../../../assets/Icons/Cover.jsx";
import Moving from "../../../assets/Icons/Moving.jsx";
import Copy from "../../../assets/Icons/Copy.jsx";
import MakeTemplate from "../../../assets/Icons/MakeTemplate.jsx";
import Archive from "../../../assets/Icons/Archive.jsx";
import Share from "../../../assets/Icons/Share.jsx";
import Task from "../../../assets/Icons/Task.jsx";
import ExitModal from "../../../assets/Icons/ExitModal.jsx";
import {Transition} from "react-transition-group";

const CardTasks = (props) => {

    const {
        task,
        column_id,
        changeTaskInfo,
        markTextShow,
        setMarkTextShow
    } = props

    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)

    const [value, setValue] = useState(task.info)
    const [valueDescription, setValueDescription] = useState("")

    const nodeRef = useRef(null);
    const duration = 600;

    const defaultStyle = {
        transition: `max-width ${duration}ms ease-in-out, font-size  ${duration / 2}ms ease-in-out`,
        maxWidth: 240,
        fontSize: '0.8rem',
    }

    const transitionStyles = {
        entering: {
            maxWidth: 36,
            fontSize: '0rem'
        },
        entered:  {
            maxWidth: 36,
            fontSize: '0rem'
        },
        exiting:  {
            maxWidth: 240,
            fontSize: '0.8rem'
        },
        exited:  {
            maxWidth: 240,
            fontSize: '0.8rem',
        },
    };


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
                                       <Task/>
                                   </span>
                                   <div >
                                       <TextareaAutosize
                                           value={value}
                                           className={styles.modalWindowTextArea}
                                           onChange={(e) => {
                                               setValue(e.target.value)
                                           }}
                                           onBlur={() => {
                                               changeTaskInfo(task.id, column_id, value)
                                           }}
                                           spellCheck="false"
                                       />
                                       <span>
                                           В колонке
                                       </span>
                                       <div>
                                           <span>Метки</span>
                                           <span>Уведомления</span>
                                           <span>Срок</span>
                                       </div>
                                   </div>
                                   <button className={styles.modalWindowCloseButton} onClick={handleModalClose}>
                                       <span>
                                           <ExitModal/>
                                       </span>
                                   </button>
                               </section>

                               <section className={styles.fullEditMidWrapper}>
                                   <div className={styles.fullEditDescriptionWrapper}>
                                       <div className={styles.fullEditDescriptionHeader}>
                                           <Description/>
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
                                       <div>
                                           <CheckList/>
                                           <div>Чек-лист</div>
                                       </div>
                                       <div>
                                           <Comments/>
                                           <div>Комментарии</div>
                                       </div>
                                   </div>
                                   <div className={styles.fullEditMenuWrapper}>
                                       <span className={styles.fullEditMenuSpan}>Добавить на задачу</span>
                                       <button className={styles.fullEditMenuButton}>
                                           <span>
                                               <Participants/>
                                           </span>
                                           <span>
                                               Участники
                                           </span>
                                       </button>
                                       <button className={styles.fullEditMenuButton}>
                                           <span>
                                                <Priority/>
                                           </span>
                                           <span>
                                               Приоритет
                                           </span>
                                       </button>
                                       <button className={styles.fullEditMenuButton}>
                                           <span>
                                               <Marks/>
                                           </span>
                                           <span>
                                               Метки
                                           </span>
                                       </button>
                                       <button className={styles.fullEditMenuButton}>
                                           <span>
                                                <CheckList/>
                                           </span>
                                           <span>
                                               Чек-лист
                                           </span>
                                       </button>
                                       <button className={styles.fullEditMenuButton}>
                                           <span>
                                               <Dates/>
                                           </span>
                                           <span>
                                               Даты
                                           </span>
                                       </button>
                                       <button className={styles.fullEditMenuButton}>
                                           <span>
                                               <Attachments/>
                                           </span>
                                           <span>
                                               Вложение
                                           </span>
                                       </button>
                                       <button className={styles.fullEditMenuButton}>
                                           <span>
                                               <Cover/>
                                           </span>
                                           <span>
                                               Обложка
                                           </span>
                                       </button>
                                       <span className={styles.fullEditMenuSpan}>
                                           Действия
                                       </span>
                                       <button className={styles.fullEditMenuButton}>
                                            <span>
                                                <Moving/>
                                            </span>
                                           <span>
                                               Перемещение
                                           </span>
                                       </button>
                                       <button className={styles.fullEditMenuButton}>
                                           <span>
                                               <Copy/>
                                           </span>
                                           <span>
                                               Копирование
                                           </span>
                                       </button>
                                       <button className={styles.fullEditMenuButton}>
                                           <span>
                                               <MakeTemplate/>
                                           </span>
                                           <span>
                                               Создать шаблон
                                           </span>
                                       </button>
                                       <Divider style={{color: '#DBA498', background: '#DBA498'}}/>
                                       <button className={styles.fullEditMenuButton}>
                                           <span>
                                               <Archive/>
                                           </span>
                                           <span>
                                               Архивация
                                           </span>
                                       </button>
                                       <button className={styles.fullEditMenuButton}>
                                           <span>
                                               <Share/>
                                           </span>
                                           <span>
                                               Поделиться
                                           </span>
                                       </button>

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
                                           <div className={styles.marksPopper}>
                                               {task.marks.length > 0
                                                   ?
                                                   <Transition  nodeRef={nodeRef} in={markTextShow} timeout={duration}>
                                                       {state => (
                                                           <div className={styles.taskMarksWrapper}>
                                                               {task.marks.map((mark, i) =>
                                                                   <div
                                                                       key={i}
                                                                       className={styles.taskMark}
                                                                       style={{
                                                                           ...defaultStyle,
                                                                           ...transitionStyles[state],
                                                                           background: `${mark.color}`,
                                                                           color: `${mark.font_color}`
                                                                       }}
                                                                       onClick={() => {
                                                                           setMarkTextShow(!markTextShow)
                                                                       }}
                                                                       ref={nodeRef}
                                                                   >
                                                                        <span className={styles.taskSpanContent} >
                                                                            {mark.mark_text}
                                                                        </span>
                                                                   </div>
                                                               )}
                                                           </div>
                                                       )}
                                                   </Transition>
                                                   :
                                                   <>
                                                   </>
                                               }
                                           </div>
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
                                       <span>
                                           <Task/>
                                       </span>
                                       <span>
                                           Открыть задачу
                                       </span>
                                   </button>
                                   <button className={styles.cardEditPopperMenuButton}>
                                        <span>
                                            <Marks/>
                                        </span>
                                        <span>
                                            Изменить метки
                                        </span>
                                   </button>
                                   <button className={styles.cardEditPopperMenuButton}>
                                       <span>
                                            <Priority/>
                                       </span>
                                       <span>
                                            Изменить приоритет
                                       </span>
                                   </button>
                                   <button className={styles.cardEditPopperMenuButton}>
                                       <span>
                                            <Moving/>
                                       </span>
                                       <span>
                                            Переместить
                                       </span>
                                   </button>
                                   <button className={styles.cardEditPopperMenuButton}>
                                       <span>
                                            <Copy/>
                                       </span>
                                       <span>
                                            Копировать
                                       </span>
                                   </button>
                                   <button className={styles.cardEditPopperMenuButton}>
                                       <span>
                                            <Dates/>
                                       </span>
                                       <span>
                                            Изменить даты
                                       </span>
                                   </button>
                                   <button className={styles.cardEditPopperMenuButton}>
                                       Удалить
                                   </button>
                               </div>
                           </div>
                       </Popover>
                   </ThemeProvider>
                   <div>
                       {task.marks.length > 0
                           ?
                           <Transition  nodeRef={nodeRef} in={markTextShow} timeout={duration}>
                               {state => (
                                   <div className={styles.taskMarksWrapper}>
                                       {task.marks.map((mark, i) =>
                                           <div
                                               key={i}
                                                className={styles.taskMark}
                                                style={{
                                                    ...defaultStyle,
                                                    ...transitionStyles[state],
                                                    background: `${mark.color}`,
                                                    color: `${mark.font_color}`
                                                }}
                                                onClick={() => {
                                                    setMarkTextShow(!markTextShow)
                                                }}
                                                ref={nodeRef}
                                           >
                                                <span className={styles.taskSpanContent} >
                                                    {mark.mark_text}
                                                </span>
                                           </div>
                                       )}
                                   </div>
                               )}
                           </Transition>
                           :
                           <>
                           </>
                       }
                        <div className={styles.taskText}
                             onClick={(e) => {
                                 handleClick(e, 'full')
                             }}
                        >
                            {task.info}
                        </div>
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