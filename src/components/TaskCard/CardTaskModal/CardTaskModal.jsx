import {createTheme, Divider, Modal, TextareaAutosize, ThemeProvider} from "@mui/material";
import styles from "./CardTaskModal.module.css"
import Task from "../../../assets/Icons/Task.jsx";
import ExitModal from "../../../assets/Icons/ExitModal.jsx";
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
import {useState} from "react";
import ButtonChangeMark from "../TaskButtons/ButtonChangeMark/ButtonChangeMark.jsx";
import {useSelector} from "react-redux";
import Notifications from "../../../assets/Icons/Notifications.jsx";
import Eye from "../../../assets/Icons/Eye.jsx";

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
    } = props

    const marks = useSelector(state => state.todolist.mark_store)

    const handleModalClose = () => setModalOpen(false);
    const [valueDescription, setValueDescription] = useState("")

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
                                <div style={{display: 'flex', flexDirection: 'column'}}>
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
                                        <span> Уведомления: </span>
                                        <button className={styles.subscribeButton}>
                                            <span>
                                                <Eye/>
                                            </span>
                                            Подписаться
                                        </button>
                                    </div>
                                    <span>Срок: </span>
                                    <span>Статус: </span>
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
                                    spellCheck="false"
                                />
                                <div className={styles.fullEditDescriptionHeader}>
                                    <CheckList/>
                                    <div>Чек-лист</div>
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
                                <button className={styles.fullEditMenuButton}>
                                    <span>
                                                <Priority/>
                                    </span>
                                    <span>
                                               Приоритет
                                    </span>
                                </button>
                                <ButtonChangeMark
                                    onChangeCardMark={onChangeCardMark}
                                    task_id={task.id}
                                    card_marks={task.marks}
                                    renderByAnchor={true}

                                    button_id={"modal-card-marks"}
                                    buttonContent={"Метки"}
                                    rootButtonStyle={styles.fullEditMenuButton}
                                />
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
    )
}

export default CardTaskModal;