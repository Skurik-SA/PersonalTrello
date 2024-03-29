import styles from "./Boards.module.css"
import SideBar from "../../components/SideBar/SideBar.jsx";
import {useState} from "react";
import BoardTitleInput from "../../components/CustomInputs/BoardTitleInput/BoardTitleInput.jsx";
import NavigationDefaultButton
    from "../../components/NavigationPanel/NavigationButtons/NavigationDefaultButton/NavigationDefaultButton.jsx";
import CardBoard from "../../components/TaskCard/CardBoard/CardBoard.jsx";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {useSelector} from "react-redux";
import Share from "../../assets/Icons/Share.jsx";
import BoardContext from "../../context/BoardContext.jsx";
import FiltersBlock from "../../components/FiltersBlock/FiltersBlock.jsx";
import BoardContextSideBar from "../../components/BoardContextSideBar/BoardContextSideBar.jsx";
import PropTypes from "prop-types";
import CardTasks from "../../components/TaskCard/CardTasks/CardTasks.jsx";

const Board = (props) => {

    const {
        board_id
    } = props

    const data = useSelector(state => state.todolist.data)

    const [clientVisibleData, setClientVisibleData] = useState(data) // Условно не изменяемый стейт

    const [keyWordSearchValue, setKeyWordSearchValue] = useState("") // Условно изменяемый стейт

    // const [inVal, setInVal] = useState("Task Board For Study")
    const [iconFavMode, setIconFavMode] = useState(false)
    const [iconPrivacyMode, setIconPrivacyMode] = useState(0)
    const [boardContext, setBoardContext] = useState(false);

    const handleBoardContextChange = () => {
        setBoardContext((prev) => !prev);
    };

    return (
        <BoardContext.Provider value={{clientVisibleData, setClientVisibleData}}>
            <div className={styles.mainBase}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <SideBar/>
                </div>
                <div className={styles.mainBaseWrapper}>
                    {/*ToolBar*/}
                    <div className={styles.toolBar}>
                        <div className={styles.toolBar_contentLeft}>
                            <div style={{display: 'flex'}}>
                                <BoardTitleInput
                                    // input={inVal}
                                    // setInput={setInVal}
                                />
                                <button className={styles.favIcoButton}
                                        onClick={() => {
                                            setIconFavMode(!iconFavMode)
                                        }}
                                >
                                    <span>
                                        {iconFavMode
                                            ?
                                            <svg className={styles.favIconSVG} width="15" height="14"
                                                 viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.5 0L9.7042 4.46619L14.6329 5.18237L11.0665 8.65881L11.9084 13.5676L7.5 11.25L3.09161 13.5676L3.93354 8.65881L0.367076 5.18237L5.2958 4.46619L7.5 0Z"
                                                    fill="#002036"/>
                                            </svg>
                                            :
                                            <svg className={styles.favIconSVG} width="15" height="14"
                                                 viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.5 1.35573L9.16615 4.73173L9.30576 5.01459L9.61792 5.05995L13.3435 5.60132L10.6477 8.22916L10.4218 8.44934L10.4751 8.76024L11.1115 12.4708L7.7792 10.7189L7.5 10.5721L7.2208 10.7189L3.88849 12.4708L4.5249 8.76024L4.57823 8.44934L4.35234 8.22916L1.65645 5.60132L5.38208 5.05995L5.69424 5.01459L5.83385 4.73173L7.5 1.35573Z"
                                                    stroke="#002036" strokeWidth="1.2"/>
                                            </svg>
                                        }
                                    </span>
                                </button>
                                <NavigationDefaultButton
                                    customButtonBaseStyle={styles.privacyIcoButton}
                                    customPopperBaseStyle={styles.privacyIcoPopper}
                                    popperBtnId={'privacy-popper'}
                                    clickClose={true}
                                    buttonContent={
                                        <>
                                            {iconPrivacyMode === 0
                                                ?
                                                <div className={styles.privacyPopperLiUpContent}>
                                                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="0.5" y="6.5" width="12" height="8" stroke="#002036"/>
                                                        <path
                                                            d="M9.5 3.5V6.5H3.5V3.5C3.5 1.84315 4.84315 0.5 6.5 0.5C8.15685 0.5 9.5 1.84315 9.5 3.5Z"
                                                            stroke="#002036"/>
                                                        <rect x="5" y="9" width="3" height="3" fill="#002036"/>
                                                    </svg>
                                                    <span>
                                                        Приватная
                                                    </span>
                                                </div>
                                                :
                                                <>
                                                    {iconPrivacyMode === 1
                                                        ?
                                                        <div className={styles.privacyPopperLiUpContent}>
                                                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="0.5" y="7.5" width="13" height="8" rx="4"
                                                                      stroke="#002036"/>
                                                                <circle cx="7" cy="4" r="3.5" stroke="#002036"/>
                                                                <ellipse cx="5.5" cy="4" rx="0.5" ry="1"
                                                                         fill="#002036"/>
                                                                <ellipse cx="8.5" cy="4" rx="0.5" ry="1"
                                                                         fill="#002036"/>
                                                                <ellipse cx="7" cy="11" rx="3" ry="1" fill="#002036"/>
                                                            </svg>
                                                            <span>
                                                                Публичная
                                                            </span>
                                                        </div>
                                                        :
                                                        <>

                                                        </>

                                                    }
                                                </>
                                            }
                                        </>
                                    }
                                >
                                    <ul className={styles.privacyPopperUl}>
                                        <li className={styles.privacyPopperLi}
                                            onClick={() => {
                                                setIconPrivacyMode(0)
                                            }}
                                        >
                                            <div className={styles.privacyPopperLiUpContent}>
                                                <svg width="13" height="15" viewBox="0 0 13 15" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.5" y="6.5" width="12" height="8" stroke="white"/>
                                                    <path
                                                        d="M9.5 3.5V6.5H3.5V3.5C3.5 1.84315 4.84315 0.5 6.5 0.5C8.15685 0.5 9.5 1.84315 9.5 3.5Z"
                                                        stroke="white"/>
                                                    <rect x="5" y="9" width="3" height="3" fill="white"/>
                                                </svg>
                                                <span>Приватный режим</span>
                                            </div>
                                            <div className={styles.privacyPopperLiDownContent}>
                                                Просматривать и изменять эту доску может только владелец доски
                                            </div>
                                        </li>

                                        <li className={styles.privacyPopperLi}
                                            onClick={() => {
                                                setIconPrivacyMode(1)
                                            }}
                                        >
                                            <div className={styles.privacyPopperLiUpContent}>
                                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.5" y="7.5" width="13" height="8" rx="4" stroke="white"/>
                                                    <circle cx="7" cy="4" r="3.5" stroke="white"/>
                                                    <ellipse cx="5.5" cy="4" rx="0.5" ry="1" fill="white"/>
                                                    <ellipse cx="8.5" cy="4" rx="0.5" ry="1" fill="white"/>
                                                    <ellipse cx="7" cy="11" rx="3" ry="1" fill="white"/>
                                                </svg>
                                                <span>Публичный режим</span>
                                            </div>
                                            <div className={styles.privacyPopperLiDownContent}>
                                                Просматривать и изменять эту доску могут все учатники добавленные в
                                                белый список
                                            </div>
                                        </li>
                                    </ul>
                                </NavigationDefaultButton>
                            </div>
                        </div>

                        <div className={styles.toolBar_contentRight}>
                            <FiltersBlock

                            />
                            <button className={styles.shareIcoButton}>
                                <span>
                                    <Share/>
                                </span>
                                <span>
                                    Поделиться
                                </span>
                            </button>

                            {/*Отвечает за активацию контекстного меню доски*/}
                            <button className={boardContext ? styles.moreOptionsIcoButtonFromVisibleTo : styles.moreOptionsIcoButtonToVisibleFrom} onClick={handleBoardContextChange}>
                                    <span>
                                        <svg className={boardContext ? styles.svgMoreOptionsFromVisibleTo : styles.svgMoreOptionsToVisibleFrom}
                                            // style={!boardContext ? {opacity: 1} : {opacity: 0}}
                                            width="18" height="4" viewBox="0 0 18 4" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect width="4" height="4" fill="#002036"/>
                                            <rect x="14" width="4" height="4" fill="#002036"/>
                                            <rect x="7.10522" width="4" height="4" fill="#002036"/>
                                        </svg>
                                    </span>
                            </button>
                        </div>
                    </div>

                    {/*CardList*/}
                    <CardBoard data={data}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <BoardContextSideBar
                        checked={boardContext}
                        handleChecked={handleBoardContextChange}
                    />
                </div>
            </div>
        </BoardContext.Provider>
    )
}

CardTasks.propTypes = {
    board_id: PropTypes.any,
}

export default Board;