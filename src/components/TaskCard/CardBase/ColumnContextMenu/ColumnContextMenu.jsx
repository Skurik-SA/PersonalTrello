import styles from "./ColumnContextMenu.module.css"
import {createTheme, Divider, Popover, ThemeProvider} from "@mui/material";
import PropTypes from "prop-types";
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";
import {useContext, useState} from "react";
import BoardContext from "../../../../context/BoardContext.jsx";
import {v4 as uuidv4} from "uuid";
import {cloneDeep} from "lodash-es";
import {set_todolist} from "../../../../redux/store/slices/slice_ToDoList.js";
import {useDispatch} from "react-redux";
import ReturnArrow from "../../../../assets/Icons/ReturnArrow.jsx";
import BaseContextView from "./ContextViews/BaseContextView/BaseContextView.jsx";
import CopyContextView from "./ContextViews/CopyContextView/CopyContextView.jsx";
import MoveContextView from "./ContextViews/MoveContextView/MoveContextView.jsx";

const COPY_CARD = "copy_card"
const MOVE_CARD = "move_card"
const SORT_CARD = "sort_card"

const ColumnContextMenu = (props) => {

    const {
        anchorEl,
        setAnchorEl,
        newTaskOnClick,
        card_data_id
    } = props

    const {
        clientVisibleData,
        setClientVisibleData,
    } = useContext(BoardContext)

    const dispatch = useDispatch()

    const [currentContextView, setCurrentContextView] = useState("")

    const copyColumn = (column_id, title_text) => {
        const columnIndex = clientVisibleData.findIndex((column) => column.id === column_id)
        let newContent = cloneDeep(clientVisibleData[columnIndex].content)
        newContent = newContent.map((task) => {
            task.id = uuidv4()
            return task
        })
        let newColumn = {
            id: uuidv4(),
            title: title_text ? title_text : clientVisibleData[columnIndex].title,
            content: newContent,
        }

        const newData = [...clientVisibleData];
        newData.splice(columnIndex + 1, 0, newColumn);
        dispatch(set_todolist(newData))
        setClientVisibleData(newData)
        // dispatch(set_todolist([...clientVisibleData, newColumn]))
        // setClientVisibleData([...clientVisibleData, newColumn])
        handleClose()
    }

    const deleteColumn = (column_id) => {
        const columnIndex = clientVisibleData.findIndex((column) => column.id === column_id)
        let newContent = cloneDeep(clientVisibleData)
        newContent.splice(columnIndex, 1)
        setClientVisibleData(newContent)
        dispatch(set_todolist(newContent))
    }

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentContextView("")
    };

    const open = Boolean(anchorEl);
    const id = open ? 'context-menu-popover' : undefined;
    const theme = createTheme({
        components: {
            // Name of the component
            MuiPopover: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        background: 'rgba(0, 0, 0, 0)',
                    },
                    paper: {
                        background: '#491537',
                        transformOrigin: '0 100 0',
                        paddingTop: '5px',
                        paddingBottom: '10px',
                        border: '1px solid rgba(255, 0, 0, 0.2)',
                        borderRadius: '10px',
                        boxShadow: 'none',
                        width: '270px',
                    }
                },
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Popover
                id={id}
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transitionDuration={0}
            >
                {/*Header*/}
                <div className={styles.columnContextMenu_header}>
                    <button className={styles.columnContextMenu_ExitButton}
                            onClick={() => {
                                setCurrentContextView("")
                            }}
                            style={currentContextView === "" ? {opacity: 0, cursor: "default"} : {opacity: 1, cursor: "pointer"}}>
                        <ReturnArrow/>
                    </button>
                    <span>
                        Действия с колонкой
                    </span>
                    <button className={styles.columnContextMenu_ExitButton} onClick={handleClose}>
                        <ExitModal/>
                    </button>
                </div>
                {/*End Header*/}
                {currentContextView === ""
                    ?
                        <BaseContextView
                            handleClose={handleClose}
                            card_data_id={card_data_id}
                            copyColumn={copyColumn}
                            deleteColumn={deleteColumn}
                            newTaskOnClick={newTaskOnClick}
                            setCurrentContextView={setCurrentContextView}
                        />
                    :
                    <></>
                }
                {currentContextView === COPY_CARD
                    ?
                        <CopyContextView
                            card_data_id={card_data_id}
                            copyColumn={copyColumn}
                        />
                    :
                    <></>
                }
                {currentContextView === MOVE_CARD
                    ?
                    <MoveContextView
                        card_data_id={card_data_id}
                        handleClose={handleClose}

                    />
                    :
                    <></>
                }

            </Popover>
        </ThemeProvider>
    )
}

ColumnContextMenu.propTypes = {
    anchorEl: PropTypes.any,
    setAnchorEl: PropTypes.func,
    newTaskOnClick: PropTypes.func,
    card_data_id: PropTypes.any,
}

export default ColumnContextMenu;