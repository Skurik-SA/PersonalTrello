import styles from "./CardTasks.module.css"
import {useContext, useEffect, useRef, useState} from "react";
import {
    createTheme,
    Popover,
    TextareaAutosize,
    ThemeProvider,
} from "@mui/material";
import Dates from "../../../assets/Icons/Dates.jsx";
import Task from "../../../assets/Icons/Task.jsx";
import {Transition} from "react-transition-group";
import CardTaskModal from "../CardTaskModal/CardTaskModal.jsx";
import ButtonChangeMark from "../TaskButtons/ButtonChangeMark/ButtonChangeMark.jsx";
import ButtonMoveCard from "../TaskButtons/ButtonMoveCard/ButtonMoveCard.jsx";
import ButtonDate from "../TaskButtons/ButtonDate/ButtonDate.jsx";
import ButtonCopyCard from "../TaskButtons/ButtonCopyCard/ButtonCopyCard.jsx";
import ButtonDeleteCard from "../TaskButtons/ButtonDeleteCard/ButtonDeleteCard.jsx";
import ButtonChangePriorityCard from "../TaskButtons/ButtonChangePriorityCard/ButtonChangePriorityCard.jsx";
import Pen from "../../../assets/Icons/Pen.jsx";
import Description from "../../../assets/Icons/Description.jsx";
import Comments from "../../../assets/Icons/Comments.jsx";
import CheckList from "../../../assets/Icons/CheckList.jsx";
import {sum} from "lodash-es";
import dayjs from "dayjs";
import {useCurrentDate} from "../../../hooks/useCurrentDate.js";
import WorkDone from "../../../assets/Icons/WorkDone.jsx";
import EmptyBox from "../../../assets/Icons/EmptyBox.jsx";
import * as deadline from  "../../../utils/StatusConstants.js";
import Notifications from "../../../assets/Icons/Notifications.jsx";
import BoardContext from "../../../context/BoardContext.jsx";
import {set_todolist} from "../../../redux/store/slices/slice_ToDoList.js";
import {useDispatch} from "react-redux";
import {useDeadLine} from "../../../hooks/useDeadLine.js";

const CardTasks = (props) => {
    const {
        task,
        column_id,
        onChangeCardMark,
        markTextShow,
        setMarkTextShow,
    } = props


    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)

    const dispatch = useDispatch()
    const setDeadLine = useDeadLine()

    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)

    const [value, setValue] = useState(task.info)

    const [currentDate, setCurrentDate, daysLeft, smallDeadlineDate] = useCurrentDate(task.deadline.dateJsFormatDate)

    const [totalSubTasks, setTotalSubTasks] = useState(sum(task.sub_tasks.map((task) => task.total_amount)))
    const [totalSuccessSubTasks, setTotalSuccessSubTasks] = useState(sum(task.sub_tasks.map((task) => task.success_amount)))

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

    const changeTaskInfo = (task_id, card_id, value) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)
        let newTask = {
            id: clientVisibleData[columnIndex].content[taskIndex].id,
            info: value,
            marks: clientVisibleData[columnIndex].content[taskIndex].marks,
            task_cover: clientVisibleData[columnIndex].content[taskIndex].task_cover,
            deadline: clientVisibleData[columnIndex].content[taskIndex].deadline,
            task_description: clientVisibleData[columnIndex].content[taskIndex].task_description,
            sub_tasks: clientVisibleData[columnIndex].content[taskIndex].sub_tasks,
            priority: clientVisibleData[columnIndex].content[taskIndex].priority,
            comments: clientVisibleData[columnIndex].content[taskIndex].comments,
        }
        const newItems = [...(clientVisibleData.map((column_id, col_index) =>
            column_id.id !== card_id
                ?
                clientVisibleData[col_index]
                :
                {
                    id:  clientVisibleData[col_index].id,
                    title: clientVisibleData[col_index].title,
                    content: [...clientVisibleData[col_index].content.map((task, row_index) =>
                        task.id !== task_id
                            ?
                            clientVisibleData[col_index].content[row_index]
                            :
                            newTask
                    )]
                }
        ))]

        dispatch(set_todolist(newItems))
        setClientVisibleData(newItems)
    }


    const onChangeDescription = (task_id, card_id, value) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)
        let newTask = {
            id: clientVisibleData[columnIndex].content[taskIndex].id,
            info: clientVisibleData[columnIndex].content[taskIndex].info,
            marks: clientVisibleData[columnIndex].content[taskIndex].marks,
            task_cover: clientVisibleData[columnIndex].content[taskIndex].task_cover,
            deadline: clientVisibleData[columnIndex].content[taskIndex].deadline,
            task_description: {
                text: value
            },
            sub_tasks: clientVisibleData[columnIndex].content[taskIndex].sub_tasks,
            priority: clientVisibleData[columnIndex].content[taskIndex].priority,
            comments: clientVisibleData[columnIndex].content[taskIndex].comments,
        }
        const newItems = [...(clientVisibleData.map((column_id, col_index) =>
            column_id.id !== card_id
                ?
                clientVisibleData[col_index]
                :
                {
                    id:  clientVisibleData[col_index].id,
                    title: clientVisibleData[col_index].title,
                    content: [...clientVisibleData[col_index].content.map((task, row_index) =>
                        task.id !== task_id
                            ?
                            clientVisibleData[col_index].content[row_index]
                            :
                            newTask
                    )]
                }
        ))]

        console.log(newItems)
        setClientVisibleData(newItems)
    }

    const handleClick = (event, type) => {
        console.log(task.task_description.text)
        if (type === 'mini' || event.type === 'contextmenu') {
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

    useEffect(() => {
        setTotalSuccessSubTasks(sum(task.sub_tasks.map((task) => task.success_amount)))
        setTotalSubTasks(sum(task.sub_tasks.map((task) => task.total_amount)))
        // console.log(daysLeft)
    }, [currentDate, daysLeft])

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
               onChangeDescription={onChangeDescription}
               totalSubTasks={totalSubTasks}
               totalSuccessSubTasks={totalSuccessSubTasks}

               onChangeCardMark={onChangeCardMark}
           />
           <li className={styles.taskContents}
               onContextMenu={(e) => {
                   e.preventDefault()
                   handleClick(e, 'mini')
               }}
           >
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
                                       <span className={styles.buttonTextMobile}>
                                           Открыть задачу
                                       </span>
                                   </button>
                                    <ButtonChangeMark
                                        onChangeCardMark={onChangeCardMark}
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

                   <div>
                       <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                           {task.priority && task.priority.type !== 'default'
                                ?
                               <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', background: '#000148FF', padding: '4px', fontSize: '0.9rem', borderRadius: '10px'}}>
                                   {task.priority.label}
                               </div>
                               :
                               <></>
                           }
                       </div>
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
                       <div className={styles.cardTasks_downLabelsWrapper}
                            onClick={(e) => {
                                handleClick(e, 'full')
                            }}
                       >
                           {task.deadline.dateJsFormatDate
                                ?
                               <div className={styles.cardTasks_downLabelDate}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (task.deadline.type === deadline.DONE) {
                                            setDeadLine(task.id, column_id, task.deadline.dateJsFormatDate, "set", deadline.NOT_DONE)
                                        }
                                        else {
                                            setDeadLine(task.id, column_id, task.deadline.dateJsFormatDate, "set", deadline.DONE)
                                        }
                                    }}
                                    style={
                                       task.deadline.type === deadline.DONE
                                           ?
                                                {background: "#2d600f"}
                                           :
                                                daysLeft < 0
                                                    ?
                                                        {background: "#600f27"}
                                                    :
                                                        3 >= daysLeft > 0
                                                        ?
                                                            {background: '#833606'}
                                                        :
                                                            {
                                                                background: 'transparent',
                                                                border: '1px solid #722eb9'
                                                            }
                                                            /*{background: '#722eb9'}*/
                                    }
                               >
                                   {task.deadline.type === deadline.DONE
                                       ?
                                        <>
                                            <span className={styles.cardTasks_dateLogoClock}>
                                                <Dates/>
                                            </span>
                                            <span className={styles.cardTasks_dateLogoCheckList}>
                                                <WorkDone/>
                                            </span>
                                        </>
                                       :
                                       <>
                                            <span className={styles.cardTasks_dateLogoClock} >
                                                <Dates/>
                                            </span>
                                           <span className={styles.cardTasks_dateLogoCheckList} >
                                                <EmptyBox/>
                                            </span>
                                       </>
                                   }
                                    <div>
                                        {dayjs(task.deadline.dateJsFormatDate).format('DD MMM')}
                                    </div>
                               </div>
                               :
                               <></>
                           }
                           {task.task_description.text
                               ?
                               <div className={styles.cardTasks_downLabel}>
                                   <Description/>
                               </div>
                               :
                               <></>
                           }
                           {task.comments && task.comments.length > 0
                               ?
                               <div className={styles.cardTasks_downLabel}>
                                   <Comments/>
                                   {task.comments.length}
                               </div>
                               :
                               <></>
                           }
                           {task.sub_tasks && task.sub_tasks.length > 0
                               ?
                               <div className={styles.cardTasks_downLabel}>
                                   <CheckList/>
                                   {totalSuccessSubTasks}/{totalSubTasks}
                               </div>
                               :
                               <></>
                           }
                           <div className={styles.cardTasks_downLabel}>
                               <Notifications/>
                               5
                           </div>
                       </div>
                   </div>
                   <button className={styles.editTaskButton}
                           onClick={(e) => {
                               e.stopPropagation();
                               handleClick(e, 'mini')
                           }}
                   >
                        <span>
                            <Pen/>
                        </span>
                   </button>
               </div>
           </li>
       </>
    )
}

export default CardTasks;