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
import Description from "../../assets/Icons/Description.jsx";

const RETURN_CONTEXT = "return_context"
const INFO_CONTEXT = "info_context"
const ARCHIVE_CONTEXT = "archive_context"
const SETTINGS_CONTEXT = "settings_context"
const BACKGROUND_CONTEXT = "background_context"
const MARKS_CONTEXT = "marks_context"
const COPY_BOARD_CONTEXT = "copy_board_context"
const CLOSE_BOARD_CONTEXT = "close_board_context"

const BoardContextSideBar = (props) => {

    const {
        checked,
        handleChecked
    } = props

    const [secondLevelCheckedMain, setSecondLevelCheckedMain] = useState(true)
    const [secondLevelCheckedAbout, setSecondLevelCheckedAbout] = useState(false)
    const [secondLevelCheckedArchive, setSecondLevelCheckedArchive] = useState(false)
    const [secondLevelCheckedSettings, setSecondLevelCheckedSettings] = useState(false)
    const [secondLevelCheckedBackGround, setSecondLevelCheckedBackGround] = useState(false)
    const [secondLevelCheckedMarks, setSecondLevelCheckedMarks] = useState(false)
    const [secondLevelCheckedCopyBoard, setSecondLevelCheckedCopyBoard] = useState(false)
    const [secondLevelCheckedCloseBoard, setSecondLevelCheckedCloseBoard] = useState(false)

    const handleSecondLevelChecked = (action) => {
        if (action === RETURN_CONTEXT) {
            setSecondLevelCheckedMain(true)
            setSecondLevelCheckedAbout(false)
            setSecondLevelCheckedArchive(false)
            setSecondLevelCheckedSettings(false)
            setSecondLevelCheckedBackGround(false)
            setSecondLevelCheckedMarks(false)
            setSecondLevelCheckedCopyBoard(false)
            setSecondLevelCheckedCloseBoard(false)
        }
        else {
            if (action === INFO_CONTEXT) {
                setSecondLevelCheckedAbout((prev) => !prev)
            }
            if (action === ARCHIVE_CONTEXT) {
                setSecondLevelCheckedArchive((prev) => !prev)
            }
            if (action === SETTINGS_CONTEXT) {
                setSecondLevelCheckedSettings((prev) => !prev)
            }
            if (action === BACKGROUND_CONTEXT) {
                setSecondLevelCheckedBackGround((prev) => !prev)
            }
            if (action === MARKS_CONTEXT) {
                setSecondLevelCheckedMarks((prev) => !prev)
            }
            if (action === COPY_BOARD_CONTEXT) {
                setSecondLevelCheckedCopyBoard((prev) => !prev)
            }
            if (action === CLOSE_BOARD_CONTEXT) {
                setSecondLevelCheckedCloseBoard((prev) => !prev)
            }
            setSecondLevelCheckedMain(false)
        }

    }

    return (
        <>
            <Collapse in={checked} orientation="horizontal" collapsedSize={0} timeout={160}>
                <nav className={styles.boardContextSideBarWrapper}>
                    <Collapse in={checked} orientation="horizontal" timeout={160}>
                        <div className={styles.boardContextSideBarWrapper}>


                            <Divider sx={{background: '#DBA498', width: '100%', opacity: '0.5'}}/>

                            {/*Menu Header*/}
                            <div className={styles.boardContextMenuHeaderWrapper}>
                                <button className={styles.sideBar_arrow} onClick={() => {
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
                                <Collapse in={secondLevelCheckedAbout} orientation="horizontal" timeout={100}
                                          collapsedSize={0}>
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
                                <Collapse in={secondLevelCheckedArchive} orientation="horizontal" timeout={100}
                                          collapsedSize={0}>
                                    <div className={styles.sideBar_menuBlock}>
                                        <button className={styles.sideBar_menuButtons}>
                                            <div className={styles.sideBar_ButtonEntrails}>
                                                <span>
                                                    <Archive_LS/>
                                                </span>
                                                <span>
                                                    Архив
                                                </span>
                                            </div>

                                        </button>
                                    </div>
                                </Collapse>
                            </section>
                            <section className={styles.sideBar_sectionRight}>
                                <Collapse in={secondLevelCheckedSettings} orientation="horizontal" timeout={100}
                                          collapsedSize={0}>
                                    <div className={styles.sideBar_menuBlock}>
                                        <button className={styles.sideBar_menuButtons}>
                                            <div className={styles.sideBar_ButtonEntrails}>
                                                <span>
                                                    <Settings_LS/>
                                                </span>
                                                <span>
                                                    <span>
                                                        Настройки
                                                    </span>
                                                </span>
                                            </div>

                                        </button>
                                    </div>
                                </Collapse>
                            </section>
                            <section className={styles.sideBar_sectionRight}>
                                <Collapse in={secondLevelCheckedBackGround} orientation="horizontal" timeout={100}
                                          collapsedSize={0}>
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
                                <Collapse in={secondLevelCheckedMarks} orientation="horizontal" timeout={100}
                                          collapsedSize={0}>
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
                                <Collapse in={secondLevelCheckedCopyBoard} orientation="horizontal" timeout={100}
                                          collapsedSize={0}>
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
                                <Collapse in={secondLevelCheckedCloseBoard} orientation="horizontal" timeout={100}
                                          collapsedSize={0}>
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
                                <Collapse in={secondLevelCheckedMain}
                                          orientation="horizontal"
                                          timeout={60}
                                          collapsedSize={0}>
                                    <div className={styles.sideBar_menuBlock}>
                                        <button className={styles.sideBar_menuButtons} onClick={() => {
                                            handleSecondLevelChecked(INFO_CONTEXT)
                                        }}>
                                            <div className={styles.sideBar_ButtonEntrails}>
                                                <span>
                                                    <Info_LS/>
                                                </span>
                                                <span>
                                                    О доске
                                                </span>
                                            </div>
                                        </button>
                                        <button className={styles.sideBar_menuButtons} onClick={() => {
                                            handleSecondLevelChecked(ARCHIVE_CONTEXT)
                                        }}>
                                            <div className={styles.sideBar_ButtonEntrails}>
                                                <span>
                                                    <Archive_LS/>
                                                </span>
                                                <span>
                                                    Архив
                                                </span>
                                            </div>

                                        </button>
                                    </div>
                                    <Divider sx={{background: '#DBA498', width: '100%', opacity: '0.5'}}/>
                                    <div className={styles.sideBar_menuBlock}>
                                        <button className={styles.sideBar_menuButtons} onClick={() => {
                                            handleSecondLevelChecked(SETTINGS_CONTEXT)
                                        }}>
                                            <div className={styles.sideBar_ButtonEntrails}>
                                                <span>
                                                    <Settings_LS/>
                                                </span>
                                                <span>
                                                    <span>
                                                        Настройки
                                                    </span>
                                                </span>
                                            </div>
                                        </button>
                                        <button className={styles.sideBar_menuButtons} onClick={() => {
                                            handleSecondLevelChecked(BACKGROUND_CONTEXT)
                                        }}>
                                            <div className={styles.sideBar_ButtonEntrails}>
                                                <span>
                                                    <BackGroundIco/>
                                                </span>
                                                <span>
                                                    Сменить фон
                                                </span>
                                            </div>
                                        </button>
                                        <button className={styles.sideBar_menuButtons} onClick={() => {
                                            handleSecondLevelChecked(MARKS_CONTEXT)
                                        }}>
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
                                    <Divider sx={{background: '#DBA498', width: '100%', opacity: '0.5'}}/>
                                    <div className={styles.sideBar_menuBlock}>
                                        <button className={styles.sideBar_menuButtons} onClick={() => {
                                            handleSecondLevelChecked(COPY_BOARD_CONTEXT)
                                        }}>
                                            <div className={styles.sideBar_ButtonEntrails}>
                                                <span>
                                                    <Copy_LS/>
                                                </span>
                                                <span>
                                                    Копировать доску
                                                </span>
                                            </div>
                                        </button>
                                        <button className={styles.sideBar_menuButtons} onClick={() => {
                                            handleSecondLevelChecked(CLOSE_BOARD_CONTEXT)
                                        }}>
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
                        </div>
                    </Collapse>
                </nav>
            </Collapse>
        </>
    )
}

export default BoardContextSideBar;