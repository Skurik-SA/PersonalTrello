import styles from "./BoardContextSideBar.module.css"
import {Collapse, Divider, TextareaAutosize} from "@mui/material";
import {useState} from "react";
import ExitModal from "../../assets/Icons/ExitModal.jsx";
import ReturnArrow from "../../assets/Icons/ReturnArrow.jsx";
import Info_LS from "../../assets/Icons/Info_LS.jsx";
import Archive_LS from "../../assets/Icons/Archive_LS.jsx";
import Settings_LS from "../../assets/Icons/Settings_LS.jsx";
import BackGroundIco from "../../assets/Icons/BackGroundIco.jsx";
import Marks_LS from "../../assets/Icons/Marks_LS.jsx";
import Copy_LS from "../../assets/Icons/Copy_LS.jsx";
import CloseBoardIco from "../../assets/Icons/CloseBoardIco.jsx";
import PropTypes from "prop-types";
import SideBarMainButton from "./SideBarMainButton/SideBarMainButton.jsx";

const RETURN_CONTEXT = "return_context"
const ABOUT_CONTEXT = "About"
const ARCHIVE_CONTEXT = "Archive"
const SETTINGS_CONTEXT = "Settings"
const BACKGROUND_CONTEXT = "BackGround"
const MARKS_CONTEXT = "Marks"
const COPY_BOARD_CONTEXT = "CopyBoard"
const CLOSE_BOARD_CONTEXT = "CloseBoard"


// Если будет плохо по оптимизации, то необходимо убрать mountOn внутри второго уровня
const BoardContextSideBar = (props) => {
    const {
        checked,
        handleChecked
    } = props

    const initialState = {
        Main: true,
        About: false,
        Archive: false,
        Settings: false,
        BackGround: false,
        Marks: false,
        CopyBoard: false,
        CloseBoard: false,
    };

    const [secondLevelChecked, setSecondLevelChecked] = useState(initialState);

    const handleSecondLevelChecked = (action) => {
        if (action !== RETURN_CONTEXT) {
            setSecondLevelChecked((prev) => ({
                ...initialState,
                "Main": false,
                [action]: !prev[action],
            }));
        }
        else {
            setSecondLevelChecked(initialState)
        }
    };

    return (
        <>
            <Collapse in={checked} orientation="horizontal" collapsedSize={0} timeout={160}>
                <nav className={styles.boardContextSideBarWrapper}>
                    <Collapse in={checked} orientation="horizontal" timeout={160}>
                        <div className={styles.boardContextSideBarWrapper}>


                            <Divider sx={{background: '#DBA498', width: '100%', opacity: '0.5'}}/>

                            {/*Menu Header*/}
                            <div className={styles.boardContextMenuHeaderWrapper}>
                                <button className={styles.sideBar_arrow}
                                        style={secondLevelChecked.Main ? {opacity: 0, cursor: 'default'} : {opacity: 1, cursor: 'pointer'}}
                                        onClick={() => {
                                    handleSecondLevelChecked(RETURN_CONTEXT)
                                }}>
                                    <span>
                                        <ReturnArrow/>
                                    </span>
                                </button>
                                <div className={styles.boardContextTitleText}>
                                    Меню
                                </div>
                                <button className={styles.sideBar_CloseContextBar} onClick={() => {
                                    handleChecked()
                                    handleSecondLevelChecked(RETURN_CONTEXT)
                                }}>
                                    <span>
                                        <ExitModal/>
                                    </span>
                                </button>
                            </div>

                            <Divider sx={{background: '#DBA498', width: '94%', opacity: '0.5'}}/>

                            {/*Hidden level*/}
                            <section className={styles.sideBar_sectionRight}>
                                <Collapse in={secondLevelChecked.About}
                                          orientation="horizontal"
                                          timeout={100}
                                          collapsedSize={0}
                                          sx={{zIndex: 1}}
                                          mountOnEnter={true}
                                          unmountOnExit={true}
                                >
                                    <div className={styles.sideBar_hiddenLevelWrapper}>
                                        <div className={styles.sideBar_TitleLabels}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 9.57141H11C15.4183 9.57141 19 13.1531 19 17.5714V19H1V17.5714C1 13.1531 4.58172 9.57141 9 9.57141Z"
                                                      stroke="#DBA498" strokeWidth="2"/>
                                                <path
                                                    d="M13.6666 5C13.6666 7.27524 11.9611 9 9.99992 9C8.03874 9 6.33325 7.27524 6.33325 5C6.33325 2.72476 8.03874 1 9.99992 1C11.9611 1 13.6666 2.72476 13.6666 5Z"
                                                    stroke="#DBA498" strokeWidth="2"/>
                                            </svg>
                                            <span>
                                                Администратор доски
                                            </span>
                                        </div>
                                        <span className={styles.sideBar_hiddenMenuSpan}>
                                            FNAME SNAME
                                        </span>
                                        <div className={styles.sideBar_TitleLabels}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <rect width="20" height="2.85714" rx="1.42857" fill="#DBA498"/>
                                                    <rect y="17.1428" width="12" height="2.85714" rx="1.42857" fill="#DBA498"/>
                                                    <rect y="12.8572" width="20" height="2.85714" rx="1.42857" fill="#DBA498"/>
                                                    <rect y="8.57141" width="20" height="2.85714" rx="1.42857" fill="#DBA498"/>
                                                    <rect y="4.28577" width="20" height="2.85714" rx="1.42857" fill="#DBA498"/>
                                                </svg>
                                            <span>
                                                Описание доски
                                            </span>
                                        </div>
                                        <TextareaAutosize
                                            className={styles.sideBar_TextArea}
                                            spellCheck={"false"}
                                            maxRows={20}
                                        />
                                    </div>
                                </Collapse>
                            </section>
                            <section className={styles.sideBar_sectionRight}>
                                <Collapse in={secondLevelChecked.Archive}
                                          orientation="horizontal"
                                          timeout={100}
                                          collapsedSize={0}
                                          sx={{zIndex: 1}}
                                          mountOnEnter={true}
                                          unmountOnExit={true}
                                >
                                    <div className={styles.sideBar_hiddenLevelWrapper}>
                                        <div className={styles.sideBar_ArchiveSearchWrapper}>
                                            <input className={styles.sideBar_searchInput} placeholder={"Поиск в архиве"}/>
                                            <button className={styles.sideBar_btnTo}>К спискам</button>
                                        </div>
                                        <Divider sx={{background: '#DBA498', width: '100%', opacity: '0.5'}}/>
                                        <div>
                                            <div>
                                                Некоторый удалённый объект
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </section>
                            <section className={styles.sideBar_sectionRight}>
                                <Collapse in={secondLevelChecked.Settings}
                                          orientation="horizontal"
                                          timeout={100}
                                          collapsedSize={0}
                                          sx={{zIndex: 1}}
                                          mountOnEnter={true}
                                          unmountOnExit={true}
                                >
                                    <div className={styles.sideBar_hiddenLevelWrapper}>
                                        <div className={styles.sideBar_SettingsBlock}>
                                            <span className={styles.sideBar_TitleLabels}>
                                                Права доступа
                                            </span>
                                            <SideBarMainButton
                                                handleClick={()=>{}}
                                                actionEvent={ABOUT_CONTEXT}
                                                buttonContent={
                                                    <div style={{display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '4px'}}>
                                                        <span className={styles.sideBar_btnTitle}>Комментирование</span>
                                                        <span>Участники</span>
                                                    </div>
                                                }
                                            />
                                            <SideBarMainButton
                                                handleClick={()=>{}}
                                                actionEvent={ABOUT_CONTEXT}
                                                buttonContent={
                                                    <div style={{display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '4px'}}>
                                                        <span className={styles.sideBar_btnTitle}>Добавление участников</span>
                                                        <span>Участники</span>
                                                    </div>
                                                }
                                            />
                                            <SideBarMainButton
                                                handleClick={()=>{}}
                                                actionEvent={ABOUT_CONTEXT}
                                                buttonContent={
                                                    <div style={{display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '4px'}}>
                                                        <span className={styles.sideBar_btnTitle}>Редактирование</span>
                                                        <span>Участники</span>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    </div>
                                </Collapse>
                            </section>
                            <section className={styles.sideBar_sectionRight}>
                                <Collapse in={secondLevelChecked.BackGround}
                                          orientation="horizontal"
                                          timeout={100}
                                          collapsedSize={0}
                                          sx={{zIndex: 1}}
                                          mountOnEnter={true}
                                          unmountOnExit={true}
                                >
                                    <div className={styles.sideBar_menuBlock}>
                                        <button className={styles.sideBar_menuButtons}>
                                            <div className={styles.sideBar_ButtonEntrails}>
                                                <span>
                                                    <BackGroundIco/>
                                                </span>
                                                <span>
                                                    Сменить фон
                                                </span>
                                            </div>

                                        </button>
                                    </div>
                                </Collapse>
                            </section>
                            <section className={styles.sideBar_sectionRight}>
                                <Collapse in={secondLevelChecked.Marks}
                                          orientation="horizontal"
                                          timeout={100}
                                          collapsedSize={0}
                                          sx={{zIndex: 1}}
                                          mountOnEnter={true}
                                          unmountOnExit={true}
                                >
                                    <div className={styles.sideBar_menuBlock}>
                                        <button className={styles.sideBar_menuButtons}>
                                            <div className={styles.sideBar_ButtonEntrails}>
                                                <span>
                                                    <Marks_LS/>
                                                </span>
                                                <span>
                                                    Метки
                                                </span>
                                            </div>

                                        </button>
                                    </div>
                                </Collapse>
                            </section>
                            <section className={styles.sideBar_sectionRight}>
                                <Collapse in={secondLevelChecked.CopyBoard}
                                          orientation="horizontal"
                                          timeout={100}
                                          collapsedSize={0}
                                          sx={{zIndex: 1}}
                                          mountOnEnter={true}
                                          unmountOnExit={true}
                                >
                                    <div className={styles.sideBar_menuBlock}>
                                        <button className={styles.sideBar_menuButtons}>
                                            <div className={styles.sideBar_ButtonEntrails}>
                                                <span>
                                                    <Copy_LS/>
                                                </span>
                                                <span>
                                                    Копировать доску
                                                </span>
                                            </div>

                                        </button>
                                    </div>
                                </Collapse>
                            </section>
                            <section className={styles.sideBar_sectionRight}>
                                <Collapse in={secondLevelChecked.CloseBoard}
                                          orientation="horizontal"
                                          timeout={100}
                                          collapsedSize={0}
                                          sx={{zIndex: 1}}
                                          mountOnEnter={true}
                                          unmountOnExit={true}
                                >
                                    <div className={styles.sideBar_menuBlock}>
                                        <button className={styles.sideBar_menuButtons}>
                                            <div className={styles.sideBar_ButtonEntrails}>
                                                <span style={{paddingBottom: 4}}>
                                                    <CloseBoardIco/>
                                                </span>
                                                <span>
                                                    Закрыть доску
                                                </span>
                                            </div>

                                        </button>
                                    </div>
                                </Collapse>
                            </section>

                            {/*Base menu controls*/}
                            <section className={styles.sideBar_sectionLeft}>
                                <Collapse in={secondLevelChecked.Main}
                                          orientation="horizontal"
                                          timeout={60}
                                          collapsedSize={0}
                                >
                                    <div className={styles.sideBar_menuBlock}>
                                        <SideBarMainButton
                                            handleClick={handleSecondLevelChecked}
                                            actionEvent={ABOUT_CONTEXT}
                                            icon={<Info_LS/>}
                                            buttonContent={"О доске"}
                                        />
                                        <SideBarMainButton
                                            handleClick={handleSecondLevelChecked}
                                            actionEvent={ARCHIVE_CONTEXT}
                                            icon={<Archive_LS/>}
                                            buttonContent={"Архив"}
                                        />
                                    </div>
                                    <Divider sx={{background: '#DBA498', width: '100%', opacity: '0.5'}}/>
                                    <div className={styles.sideBar_menuBlock}>
                                        <SideBarMainButton
                                            handleClick={handleSecondLevelChecked}
                                            actionEvent={SETTINGS_CONTEXT}
                                            icon={<Settings_LS/>}
                                            buttonContent={"Настройки"}
                                        />
                                        <SideBarMainButton
                                            handleClick={handleSecondLevelChecked}
                                            actionEvent={BACKGROUND_CONTEXT}
                                            icon={<BackGroundIco/>}
                                            buttonContent={"Сменить фон"}
                                        />
                                        <SideBarMainButton
                                            handleClick={handleSecondLevelChecked}
                                            actionEvent={MARKS_CONTEXT}
                                            icon={<Marks_LS/>}
                                            buttonContent={"Метки"}
                                        />
                                    </div>
                                    <Divider sx={{background: '#DBA498', width: '100%', opacity: '0.5'}}/>
                                    <div className={styles.sideBar_menuBlock}>
                                        <SideBarMainButton
                                            handleClick={handleSecondLevelChecked}
                                            actionEvent={COPY_BOARD_CONTEXT}
                                            icon={<Copy_LS/>}
                                            buttonContent={"Копировать доску"}
                                        />
                                        <SideBarMainButton
                                            handleClick={handleSecondLevelChecked}
                                            actionEvent={CLOSE_BOARD_CONTEXT}
                                            icon={<CloseBoardIco/>}
                                            buttonContent={"Закрыть доску"}
                                        />
                                    </div>
                                </Collapse>
                            </section>
                        </div>
                    </Collapse>
                </nav>
            </Collapse>
        </>
    )
}

BoardContextSideBar.propTypes = {
    checked: PropTypes.bool,
    handleChecked: PropTypes.func,
}

export default BoardContextSideBar;