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
                        background: "transparent"
                    }
                }
            }
        },
    });

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickAddButton = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentTaskValue("")
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
                                            value={currentTaskValue}
                                            onChange={(e) => {
                                                setCurrentTaskValue(e.target.value)
                                            }}
                                            style={{
                                                width: '470px',
                                                height: '45px'
                                            }}
                                        />
                                        <div>
                                            {targetElement === 'add'
                                                ?
                                                <button onClick={() => {
                                                    console.log(anchorEl)
                                                    addNewTaskIntoCheckList(
                                                        targetElementData.task_id,
                                                        targetElementData.column_id,
                                                        targetElementData.sub_task_id,
                                                        currentTaskValue
                                                    )
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
                                <div>
                                    {task.sub_tasks && task.sub_tasks.map((sub_task, index) =>
                                        <div key={index} style={{paddingBottom: '20px'}}>
                                            <div className={styles.fullEditDescriptionHeader} style={{height: '100%', alignItems: 'flex-start'}}>
                                                <div style={{paddingTop: '5px'}}>
                                                    <CheckList/>
                                                </div>
                                                <div style={{fontSize: '1.1rem', textDecoration: 'underline'}}>
                                                    {sub_task.title}
                                                </div>
                                            </div>
                                            <progress
                                                id={`progress-${sub_task.id}`}
                                                style={{width: '500px', transition: 'all 1s'}}
                                                max={task.sub_tasks[index].check_list.length}
                                                value={task.sub_tasks[index].success_amount}>
                                            </progress>
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
                                                                sx={{
                                                                    paddingLeft: '10px'
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <span
                                                                style={{userSelect: 'none'}}
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
                                                    }
                                                    />
                                                )}
                                            </div>
                                            <button onClick={(e) => {
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
                                {/*<button className={styles.fullEditMenuButton}>*/}
                                {/*    <span>*/}
                                {/*                <Priority/>*/}
                                {/*    </span>*/}
                                {/*    <span>*/}
                                {/*               Приоритет*/}
                                {/*    </span>*/}
                                {/*</button>*/}
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
                                {/*<button className={styles.fullEditMenuButton}>*/}
                                {/*    <span>*/}
                                {/*                <CheckList/>*/}
                                {/*    </span>*/}
                                {/*    <span>*/}
                                {/*               Чек-лист*/}
                                {/*    </span>*/}
                                {/*</button>*/}
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