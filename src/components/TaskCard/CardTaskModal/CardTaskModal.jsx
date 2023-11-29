import {
    Checkbox,
    createTheme,
    Divider,
    FormControlLabel,
    Modal,
    Popover,
    TextareaAutosize,
    ThemeProvider
} from "@mui/material";
import styles from "./CardTaskModal.module.css"
import Task from "../../../assets/Icons/Task.jsx";
import ExitModal from "../../../assets/Icons/ExitModal.jsx";
import Description from "../../../assets/Icons/Description.jsx";
import CheckList from "../../../assets/Icons/CheckList.jsx";
import Comments from "../../../assets/Icons/Comments.jsx";
import Participants from "../../../assets/Icons/Participants.jsx";
import Marks from "../../../assets/Icons/Marks.jsx";
import Dates from "../../../assets/Icons/Dates.jsx";
import Attachments from "../../../assets/Icons/Attachments.jsx";
import Cover from "../../../assets/Icons/Cover.jsx";
import MakeTemplate from "../../../assets/Icons/MakeTemplate.jsx";
import Archive from "../../../assets/Icons/Archive.jsx";
import Share from "../../../assets/Icons/Share.jsx";
import {useEffect, useState} from "react";
import ButtonChangeMark from "../TaskButtons/ButtonChangeMark/ButtonChangeMark.jsx";
import {useSelector} from "react-redux";
import Notifications from "../../../assets/Icons/Notifications.jsx";
import Eye from "../../../assets/Icons/Eye.jsx";
import ButtonMoveCard from "../TaskButtons/ButtonMoveCard/ButtonMoveCard.jsx";
import Status from "../../../assets/Icons/Status.jsx";
import ButtonDate from "../TaskButtons/ButtonDate/ButtonDate.jsx";
import ButtonCopyCard from "../TaskButtons/ButtonCopyCard/ButtonCopyCard.jsx";
import ButtonDeleteCard from "../TaskButtons/ButtonDeleteCard/ButtonDeleteCard.jsx";
import ButtonChangePriorityCard from "../TaskButtons/ButtonChangePriorityCard/ButtonChangePriorityCard.jsx";
import dayjs from "dayjs";
import WorkDone from "../../../assets/Icons/WorkDone.jsx";
import EmptyBox from "../../../assets/Icons/EmptyBox.jsx";
import * as deadline from  "../../../utils/StatusConstants.js";
import {BpCheckedIcon, BpIcon} from "../TaskButtons/ButtonCopyCard/ContentCopyCard.jsx";
import ButtonCheckList from "../TaskButtons/ButtonCheckListCard/ButtonCheckList.jsx";
import {sum} from "lodash-es";

const CardTaskModal = (props) => {

    const {
        modalOpen,
        setModalOpen,
        taskTitleValue,
        setTaskTitleValue,
        changeTaskInfo,
        task,
        column_id,
        onChangeCardMark,
        clientVisibleData,
        moveCardViaButtons,
        onChangeDescription,
        copyCardTo,
        deleteCard,
        setDeadline,
        addNewTaskIntoCheckList,
        onChangeCheckListCheckBox,
        onChangeValueCheckBox,
        deleteSomeCheckList,
        deleteSomeCheckBox,

        totalSubTasks,
        totalSuccessSubTasks,

        addNewCheckList
    } = props

    const marks = useSelector(state => state.todolist.mark_store)

    const handleModalClose = () => setModalOpen(false);
    const [valueDescription, setValueDescription] = useState(task.task_description.text)

    const [currentTaskValue, setCurrentTaskValue] = useState("")

    const [targetElement, setTargetElement] = useState("")
    const [targetElementData, setTargetElementData] = useState("")

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
            MuiPopover: {
                styleOverrides: {
                    root: {
                        background: "none"
                    },
                    paper: {
                        background: 'none'
                    }
                }
            }
        },
    });

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const handleClickAddButton = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickActionButton = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentTaskValue("")
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);
    const id = open ? 'editing-popover' : undefined;
    const id2 = open2 ? 'action-popover' : undefined;



    return (
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
                                    value={taskTitleValue}
                                    className={styles.modalWindowTextArea}
                                    onChange={(e) => {
                                        setTaskTitleValue(e.target.value)
                                    }}
                                    onBlur={() => {
                                        changeTaskInfo(task.id, column_id, taskTitleValue)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') {
                                            changeTaskInfo(task.id, column_id, taskTitleValue)
                                        }
                                    }}
                                    spellCheck="false"
                                />
                                <span>
                                           В колонке
                                </span>
                            </div>
                            <button className={styles.modalWindowCloseButton} onClick={handleModalClose}>
                                   <span>
                                       <ExitModal/>
                                   </span>
                            </button>
                        </section>

                        <section className={styles.fullEditMidWrapper}>
                            <div className={styles.fullEditDescriptionWrapper}>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                    <div className={styles.fullEditMarksWrapper}>
                                        <div className={styles.fullEditDescriptionHeader}>
                                            <Marks/>
                                            <span> Метки: </span>
                                        </div>
                                        <div >
                                            {task.marks.map((mark) =>
                                                <div key={mark.id} className={styles.fullEditMarksTaskMark} style={{background: `${mark.color}`, color: `${mark.font_color}`}}>
                                                    <ButtonChangeMark
                                                        onChangeCardMark={onChangeCardMark}
                                                        task_id={task.id}
                                                        card_marks={task.marks}
                                                        renderByAnchor={true}

                                                        button_id={"modal-card-marks"}
                                                        buttonIcon={<></>}
                                                        buttonContent={
                                                            <span className={styles.fullEditMarksTaskSpanContent} style={{color: `${mark.font_color}`}}>
                                                                {mark.mark_text}
                                                            </span>
                                                        }
                                                        rootButtonStyle={styles.fullEditMarkButton}
                                                    />
                                                </div>
                                            )}
                                            <div className={styles.fullEditMarksTaskMark}>
                                                <ButtonChangeMark
                                                    onChangeCardMark={onChangeCardMark}
                                                    task_id={task.id}
                                                    card_marks={task.marks}
                                                    renderByAnchor={true}

                                                    button_id={"modal-card-marks"}
                                                    buttonIcon={<></>}
                                                    buttonContent={"+"}
                                                    rootButtonStyle={styles.fullEditAddMarkButton}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.fullEditDescriptionHeader}>
                                        <Notifications/>
                                        <span className={styles.fullEditDescriptionHeader_Label}> Уведомления: </span>
                                        <button className={styles.subscribeButton}>
                                            <span>
                                                <Eye/>
                                            </span>
                                            Подписаться
                                        </button>
                                    </div>
                                    {task.deadline.dateJsFormatDate
                                        ?
                                        <div className={styles.fullEditDescriptionHeader}>
                                            <Dates/>
                                            <span className={styles.fullEditDescriptionHeader_Label}>
                                                Срок:
                                            </span>
                                            <span className={
                                                    task.deadline.type === deadline.DONE
                                                        ?
                                                            styles.fullEditDescriptionHeader_DeadlineDone
                                                        :
                                                            styles.fullEditDescriptionHeader_DeadlineNotDone
                                                    }

                                                  onClick={(e) => {
                                                      e.stopPropagation()
                                                      if (task.deadline.type === deadline.DONE) {
                                                          setDeadline(task.id, column_id, task.deadline.dateJsFormatDate, "set", deadline.NOT_DONE)
                                                      }
                                                      else {
                                                          setDeadline(task.id, column_id, task.deadline.dateJsFormatDate, "set", deadline.DONE)
                                                      }
                                                  }}
                                            >
                                                {task.deadline.type === deadline.DONE
                                                    ?
                                                    <WorkDone/>
                                                    :
                                                    <EmptyBox/>
                                                }
                                                <span>
                                                    {dayjs(task.deadline.dateJsFormatDate).format("DD-MMM-YYYY")}
                                                </span>
                                            </span>
                                        </div>
                                        :
                                        <></>
                                    }
                                    {task.deadline.type
                                        ?
                                        <div className={styles.fullEditDescriptionHeader}>
                                            <Status/>
                                            <span className={styles.fullEditDescriptionHeader_Label}>Статус: </span>
                                            <span>
                                                {task.deadline.type === deadline.FAILED ?
                                                    "Срок сдачи просрочен" : <></>
                                                }
                                                {task.deadline.type === deadline.DONE ?
                                                    "Задание выполнено" : <></>
                                                }
                                                {task.deadline.type === deadline.SOON_EXPIRE ?
                                                    "Срок сдачи скоро истекает" : <></>
                                                }
                                                {task.deadline.type === deadline.NOT_DONE ?
                                                    "Срок сдачи нескоро" : <></>
                                                }
                                            </span>
                                        </div>
                                        :
                                        <></>

                                    }
                                </div>
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
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape' || e.key === 'Enter') {
                                            onChangeDescription(task.id, column_id, valueDescription)
                                        }
                                    }}
                                    spellCheck="false"
                                    onMouseOut={(e) => {
                                        onChangeDescription(task.id, column_id, valueDescription)
                                    }}
                                />
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <div>
                                        <textarea
                                            id={"task-area"}
                                            value={currentTaskValue}
                                            autoFocus={true}
                                            onChange={(e) => {
                                                setCurrentTaskValue(e.target.value)
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && currentTaskValue !== "" && targetElement === 'add') {
                                                    addNewTaskIntoCheckList(
                                                        targetElementData.task_id,
                                                        targetElementData.column_id,
                                                        targetElementData.sub_task_id,
                                                        currentTaskValue
                                                    )
                                                    setCurrentTaskValue("")
                                                    document.getElementById("task-area").focus()
                                                }
                                                else if (e.key === 'Enter' && currentTaskValue !== "" && targetElement === 'label') {
                                                    console.log("ads")
                                                    onChangeValueCheckBox(
                                                        targetElementData.task_id,
                                                        targetElementData.column_id,
                                                        targetElementData.sub_task_id,
                                                        targetElementData.check_box_id,
                                                        currentTaskValue
                                                    )
                                                    handleClose()
                                                }
                                                else if (e.key === 'Enter' && currentTaskValue !== "") {
                                                    handleClose()
                                                }
                                            }}
                                            className={styles.addInput}

                                        />
                                        <div>
                                            {targetElement === 'add'
                                                ?
                                                <button onClick={() => {
                                                    console.log(anchorEl)
                                                    if (currentTaskValue.length > 0) {
                                                        addNewTaskIntoCheckList(
                                                            targetElementData.task_id,
                                                            targetElementData.column_id,
                                                            targetElementData.sub_task_id,
                                                            currentTaskValue
                                                        )
                                                    }
                                                    handleClose()
                                                }}
                                                >
                                                    Добавить
                                                </button>
                                                :
                                                <></>
                                            }
                                            {targetElement === 'label'
                                                ?
                                                <button onClick={() => {
                                                    console.log(anchorEl)
                                                    onChangeValueCheckBox(
                                                        targetElementData.task_id,
                                                        targetElementData.column_id,
                                                        targetElementData.sub_task_id,
                                                        targetElementData.check_box_id,
                                                        currentTaskValue
                                                    )
                                                    handleClose()
                                                }}
                                                >
                                                    Сохранить
                                                </button>
                                                :
                                                <>
                                                </>
                                            }
                                            <button
                                                onClick={() => {
                                                    handleClose()
                                                }}
                                            >
                                                Отмена
                                            </button>
                                        </div>
                                    </div>
                                </Popover>
                                <Popover
                                    id={id2}
                                    open={open2}
                                    anchorEl={anchorEl2}
                                    onClose={handleClose2}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <div>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <button>Создать карточку</button>
                                            <button
                                                onClick={() => {
                                                    deleteSomeCheckBox(
                                                        targetElementData.task_id,
                                                        targetElementData.column_id,
                                                        targetElementData.sub_task_id,
                                                        targetElementData.check_box_id,
                                                        targetElementData.checked
                                                    )
                                                    handleClose2()
                                                }}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </Popover>
                                <div>
                                    {task.sub_tasks && task.sub_tasks.map((sub_task, index) =>
                                        <div key={index} style={{paddingBottom: '20px'}}>
                                            <div className={styles.fullEditDescriptionHeader_CheckList}>
                                                <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                                                    <div style={{paddingTop: '5px'}}>
                                                        <CheckList/>
                                                    </div>
                                                    <div style={{fontSize: '1.1rem', textDecoration: 'underline'}}>
                                                        {sub_task.title}
                                                    </div>
                                                </div>
                                                <button
                                                    className={styles.checkBoxAddButton}
                                                    onClick={() => {
                                                        deleteSomeCheckList(task.id, column_id, sub_task.id)
                                                    }}
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                <span style={{width: '50px'}}>
                                                    {task.sub_tasks[index].check_list.length > 0
                                                        ?
                                                        `${Math.trunc(task.sub_tasks[index].success_amount * 100 / task.sub_tasks[index].check_list.length)} %`
                                                        :
                                                        `0 %`
                                                    }
                                                </span>
                                                <progress
                                                    id={`progress-${sub_task.id}`}
                                                    // style={{width: '460px', transition: 'all 1s'}}
                                                    className={styles.progressBar}
                                                    max={task.sub_tasks[index].check_list.length}
                                                    value={task.sub_tasks[index].success_amount}>
                                                </progress>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                                {sub_task.check_list && sub_task.check_list.map((list, jindex) =>
                                                    <FormControlLabel
                                                        key={jindex + 100}
                                                        control={
                                                            <Checkbox
                                                                checked={task.sub_tasks[index].check_list[jindex].isChecked}
                                                                onChange={(e) => {
                                                                    onChangeCheckListCheckBox(task.id, column_id, sub_task.id, list.id, e.target.checked)
                                                                }}
                                                                size="small"
                                                                checkedIcon={<BpCheckedIcon />}
                                                                icon={<BpIcon />}

                                                            />
                                                        }
                                                        label={
                                                        <div className={styles.checkBoxLabel}>
                                                            <span
                                                                className={styles.checkBoxSpan}
                                                                style={
                                                                    task.sub_tasks[index].check_list[jindex].isChecked ?
                                                                    {textDecoration: 'line-through', opacity: 0.7} :
                                                                        {}
                                                                }
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    handleClickAddButton(e)
                                                                    setTargetElement("label")
                                                                    setCurrentTaskValue(task.sub_tasks[index].check_list[jindex].label)
                                                                    setTargetElementData({
                                                                        task_id: task.id,
                                                                        column_id: column_id,
                                                                        sub_task_id: sub_task.id,
                                                                        check_box_id: task.sub_tasks[index].check_list[jindex].id
                                                                    })
                                                                }}
                                                            >
                                                                {list.label}
                                                            </span>
                                                            <div className={styles.checkBoxIcons}>
                                                                <span className={styles.checkBoxIconDates}
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        handleClickActionButton(e)
                                                                    }}
                                                                >
                                                                    <Dates/>
                                                                </span>
                                                                <span className={styles.checkBoxIconContext}
                                                                      onClick={(e) => {
                                                                          e.preventDefault()
                                                                          handleClickActionButton(e)
                                                                          setTargetElementData({
                                                                              task_id: task.id,
                                                                              column_id: column_id,
                                                                              sub_task_id: sub_task.id,
                                                                              check_box_id: task.sub_tasks[index].check_list[jindex].id,
                                                                              checked: task.sub_tasks[index].check_list[jindex].isChecked,
                                                                          })
                                                                      }}
                                                                >
                                                                    <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="3" height="3" fill="#DBA498"/>
                                                                    <rect x="12" width="3" height="3" fill="#DBA498"/>
                                                                    <rect x="6" width="3" height="3" fill="#DBA498"/>
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    }
                                                    />
                                                )}
                                            </div>
                                            <button
                                                className={styles.checkBoxAddButton}
                                                onClick={(e) => {
                                                handleClickAddButton(e)
                                                setTargetElement("add")
                                                setTargetElementData({
                                                    task_id: task.id,
                                                    column_id: column_id,
                                                    sub_task_id: sub_task.id
                                                })
                                                // addNewTaskIntoCheckList(task.id, column_id, sub_task.id)
                                            }}>
                                                Добавить элемент
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.fullEditDescriptionHeader}>
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
                                <ButtonChangePriorityCard
                                    clientVisibleData={clientVisibleData}
                                    task_id={task.id}
                                    button_id={"modal-card-priority"}
                                    buttonContent={"Приоритет"}
                                    rootButtonStyle={styles.fullEditMenuButton}
                                />
                                <ButtonChangeMark
                                    onChangeCardMark={onChangeCardMark}
                                    task_id={task.id}
                                    card_marks={task.marks}
                                    renderByAnchor={true}

                                    button_id={"modal-card-marks"}
                                    buttonContent={"Метки"}
                                    rootButtonStyle={styles.fullEditMenuButton}
                                />
                                <ButtonCheckList
                                    task_id={task.id}
                                    task={task}
                                    column_id={column_id}
                                    addNewCheckList={addNewCheckList}
                                    renderByAnchor={true}
                                    buttonContent={"Чек-листы"}
                                    button_id={"modal-check-list-card"}
                                    rootButtonStyle={styles.fullEditMenuButton}
                                />
                                <ButtonDate
                                    clientVisibleData={clientVisibleData}
                                    setDeadline={setDeadline}
                                    task_id={task.id}
                                    task={task}
                                    column_id={column_id}

                                    renderByAnchor={true}
                                    buttonContent={"Даты"}
                                    button_id={"modal-date-to"}
                                    rootButtonStyle={styles.fullEditMenuButton}
                                />
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
                                <ButtonMoveCard
                                    clientVisibleData={clientVisibleData}
                                    moveCardViaButtons={moveCardViaButtons}
                                    task_id={task.id}

                                    renderByAnchor={true}
                                    buttonContent={"Перемещение"}
                                    button_id={"modal-move-card-to"}
                                    rootButtonStyle={styles.fullEditMenuButton}
                                />
                                <ButtonCopyCard
                                    clientVisibleData={clientVisibleData}
                                    task={task}
                                    copyCardTo={copyCardTo}
                                    copiedValue={taskTitleValue}
                                    task_id={task.id}

                                    renderByAnchor={true}
                                    buttonContent={"Копирование"}
                                    button_id={"modal-copy-card-to"}
                                    rootButtonStyle={styles.fullEditMenuButton}
                                />
                                <button className={styles.fullEditMenuButton}>
                                    <span>
                                       <MakeTemplate/>
                                    </span>
                                    <span>
                                               Создать шаблон
                                    </span>
                                </button>
                                <Divider
                                    className={styles.fullEditDivider}

                                />
                                <ButtonDeleteCard
                                    clientVisibleData={clientVisibleData}
                                    column_id={column_id}
                                    deleteCard={deleteCard}
                                    task_id={task.id}

                                    renderByAnchor={true}
                                    buttonIcon={<Archive/>}
                                    buttonContent={"Архивация"}
                                    button_id={"modal-delete-card-from"}
                                    rootButtonStyle={styles.fullEditMenuButton}
                                />
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
    )
}

export default CardTaskModal;