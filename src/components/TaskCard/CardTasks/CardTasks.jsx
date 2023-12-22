import styles from "./CardTasks.module.css"
import {useContext, useEffect, useState} from "react";
import CardTaskModal from "../CardTaskModal/CardTaskModal.jsx";
import Pen from "../../../assets/Icons/Pen.jsx";
import {sum} from "lodash-es";
import {useCurrentDate} from "../../../hooks/useCurrentDate.js";
import BoardContext from "../../../context/BoardContext.jsx";
import {set_todolist} from "../../../redux/store/slices/slice_ToDoList.js";
import {useDispatch} from "react-redux";
import CardMarks from "./CardMarks/CardMarks.jsx";
import PopoverCardTask from "./PopoverCardTask/PopoverCardTask.jsx";
import CardFooter from "./CardFooter/CardFooter.jsx";

const CardTasks = (props) => {
    const {
        task,
        column_id,
        markTextShow,
        setMarkTextShow,
    } = props

    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)

    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)

    const [value, setValue] = useState(task.info)

    const [
        currentDate,
        setCurrentDate,
        daysLeft,
        smallDeadlineDate
    ] = useCurrentDate(task.deadline.dateJsFormatDate)

    const [totalSubTasks, setTotalSubTasks] = useState(sum(task.sub_tasks.map((task) => task.total_amount)))
    const [totalSuccessSubTasks, setTotalSuccessSubTasks] = useState(sum(task.sub_tasks.map((task) => task.success_amount)))


    const changeTaskInfo = (task_id, card_id, value) => {
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)
        let newTask = {
            id: clientVisibleData[columnIndex].content[taskIndex].id,
            is_visible: clientVisibleData[columnIndex].content[taskIndex].is_visible,
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


    const handleClick = (event, type) => {
        if (type === 'mini' || event.type === 'contextmenu') {
            setAnchorEl(event.currentTarget);
            var element = document.getElementById(task.id);
            var rect = element.getBoundingClientRect();
            var xPosition = rect.left;
            var yPosition = rect.top;

            setTop(yPosition)
            setLeft(xPosition)
        }
        else if (type === 'full') {
            setModalOpen(true);
        }
    };

    useEffect(() => {
        setTotalSuccessSubTasks(sum(task.sub_tasks.map((task) => task.success_amount)))
        setTotalSubTasks(sum(task.sub_tasks.map((task) => task.total_amount)))
        // console.log(daysLeft)
    }, [currentDate, daysLeft, task.sub_tasks])

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
               totalSubTasks={totalSubTasks}
               totalSuccessSubTasks={totalSuccessSubTasks}
           />
           <li className={styles.taskContents}
               onContextMenu={(e) => {
                   e.preventDefault()
                   handleClick(e, 'mini')
               }}
           >
               <div id={task.id} className={styles.taskWrapper} style={task.is_visible ? {} : {display: 'none'}}>
                   <PopoverCardTask
                       anchorEl={anchorEl}
                       setAnchorEl={setAnchorEl}
                       top={top}
                       left={left}

                       markTextShow={markTextShow}
                       setMarkTextShow={setMarkTextShow}
                       task={task}
                       value={value}
                       setValue={setValue}
                       column_id={column_id}
                       handleClick={handleClick}
                       changeTaskInfo={changeTaskInfo}
                   />
                   <div>
                       {/*Приоритет*/}
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
                       {/*Метки*/}
                       <CardMarks
                           marks={task.marks}
                           markTextShow={markTextShow}
                           setMarkTextShow={setMarkTextShow}
                       />
                       {/*Текст*/}
                       <div className={styles.taskText}
                             onClick={(e) => {
                                 handleClick(e, 'full')
                             }}
                       >
                           {task.info}
                       </div>
                       {/*Футер*/}
                       <CardFooter
                           task={task}
                           daysLeft={daysLeft}
                           column_id={column_id}

                           handleClick={handleClick}
                           totalSubTasks={totalSubTasks}
                           totalSuccessSubTasks={totalSuccessSubTasks}
                       />
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