import styles from "./CardTasks.module.css"
import {useRef, useState} from "react";
import {
    createTheme,
    Popover,
    TextareaAutosize,
    ThemeProvider,
} from "@mui/material";
import Priority from "../../../assets/Icons/Priority.jsx";
import Marks from "../../../assets/Icons/Marks.jsx";
import Dates from "../../../assets/Icons/Dates.jsx";
import Moving from "../../../assets/Icons/Moving.jsx";
import Copy from "../../../assets/Icons/Copy.jsx";
import Task from "../../../assets/Icons/Task.jsx";
import {Transition} from "react-transition-group";
import CardTaskModal from "../CardTaskModal/CardTaskModal.jsx";
import ButtonChangeMark from "../TaskButtons/ButtonChangeMark/ButtonChangeMark.jsx";
import ButtonMoveCard from "../TaskButtons/ButtonMoveCard/ButtonMoveCard.jsx";

const CardTasks = (props) => {

    const {
        task,
        column_id,
        changeTaskInfo,
        onChangeCardMark,
        markTextShow,
        setMarkTextShow
    } = props

    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)

    const [value, setValue] = useState(task.info)

    const nodeRef = useRef(null);
    const duration = 600;

    const defaultStyle = {
        transition: `max-width ${duration}ms ease-in-out, font-size  ${duration / 2}ms ease-in-out, min-height ${duration / 2}ms ease-in-out`,
        maxWidth: 240,
        fontSize: '0.8rem',
        minHeight: '20px',
    }

    const transitionStyles = {
        entering: {
            maxWidth: 36,
            fontSize: '0rem',
            minHeight: '8px'
        },
        entered:  {
            maxWidth: 36,
            fontSize: '0rem',
            minHeight: '8px'
        },
        exiting:  {
            maxWidth: 240,
            fontSize: '0.8rem',
            minHeight: '20px'
        },
        exited:  {
            maxWidth: 240,
            fontSize: '0.8rem',
            minHeight: '20px'
        },
    };


    const handleClick = (event, type) => {

        if (type === 'mini') {
            setAnchorEl(event.currentTarget);
            var element = document.getElementById(task.id);
            var rect = element.getBoundingClientRect();
            var xPosition = rect.left;
            var yPosition = rect.top;

            setTop(yPosition)
            setLeft(xPosition)
            // console.log(task)
            // console.log(column_id)
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



    return (
       <>
           <CardTaskModal
               modalOpen={modalOpen}
               setModalOpen={setModalOpen}
               taskTitleValue={value}
               setTaskTitleValue={setValue}
               changeTaskInfo={changeTaskInfo}
               task={task}
               column_id={column_id}
               onChangeCardMark={onChangeCardMark}
           />
           <li className={styles.taskContents} >
               <div id={task.id} className={styles.taskWrapper}>
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
                                       <span>
                                           Открыть задачу
                                       </span>
                                   </button>

                                   {/*<TaskBaseButton*/}
                                   {/*    // open={open2}*/}
                                   {/*    // top={top2}*/}
                                   {/*    // left={left2}*/}
                                   {/*    // anchorEl={anchorEl2}*/}
                                   {/*    // setAnchorEl={setAnchorEl2}*/}
                                   {/*    id={"marks"}*/}
                                   {/*    buttonContent={"adsada"}*/}
                                   {/*    buttonIcon={<Marks/>}*/}
                                   {/*>*/}
                                   {/* /!*     Тут ребёнок*!/*/}
                                   {/*</TaskBaseButton>*/}
                                   {/*<button*/}
                                   {/*    className={styles.cardEditPopperMenuButton}*/}
                                   {/*    onClick={(e) => {*/}
                                   {/*        // handleClick(e, 'mini_secondary')*/}
                                   {/*        console.log("asdasdad")*/}
                                   {/*    }}*/}
                                   {/*>*/}
                                   {/*     <span>*/}
                                   {/*         <Marks/>*/}
                                   {/*     </span>*/}

                                   {/*     <span>*/}
                                   {/*         Изменить метки*/}
                                   {/*     </span>*/}
                                   {/*</button>*/}
                                    <ButtonChangeMark
                                        onChangeCardMark={onChangeCardMark}
                                        task_id={task.id}
                                        card_marks={task.marks}
                                    />


                                   <button className={styles.cardEditPopperMenuButton}>
                                       <span>
                                            <Priority/>
                                       </span>
                                       <span>
                                            Изменить приоритет
                                       </span>
                                   </button>
                                   <ButtonMoveCard
                                       task_id={task.id}
                                   />
                                   {/*<button className={styles.cardEditPopperMenuButton}>*/}
                                   {/*    <span>*/}
                                   {/*         <Moving/>*/}
                                   {/*    </span>*/}
                                   {/*    <span>*/}
                                   {/*         Переместить*/}
                                   {/*    </span>*/}
                                   {/*</button>*/}
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
                                                    color: `${mark.font_color}`,
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