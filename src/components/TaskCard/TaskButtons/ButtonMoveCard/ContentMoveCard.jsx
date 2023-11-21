import styles from "./MoveCard.module.css"
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";
import {createTheme, ThemeProvider, FormControl, InputLabel, MenuItem, Select, Divider} from "@mui/material";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useColumnIndexViaTaskId} from "../../../../hooks/useColumnIndexViaTaskId.js";

const ContentMoveCard = (props) => {
    // Нужны соседние колонки
    const {
        task_id,
        clientVisibleData,
        moveCardViaButtons,
        handleClose,
    } = props

    const [column, setColumn] = useState(0);
    const [row, setRow] = useState(0);
    const [board, setBoard] = useState(0);

    const [current_column_id, isAvailableLeftBorder, isAvailableRightBorder] = useColumnIndexViaTaskId(clientVisibleData, task_id, 'index-neighbors')

    const onClickMoveCard = (source_task_id, destination_task_index, destination_column_index) => {
        // if (current_column_id)
        moveCardViaButtons(source_task_id, destination_task_index, destination_column_index)
        handleClose()
    }

    const handleChangeColumn = (event) => {
        setColumn(event.target.value);
        setRow(1)
    };

    const handleChangeRow = (event) => {
        setRow(event.target.value);
    };

    const handleChangeBoard = (event) => {
        setBoard(event.target.value);
    };

    const theme2 = createTheme({
        components: {
            // Name of the component
            MuiPopover: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                    },
                    paper: {
                        background: '#260d19',
                        transformOrigin: '0 100 0',
                        border: '#8d325f 1px solid',
                        maxHeight: '200px',
                        color: 'white',
                    }
                },
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        color: 'white',
                        '&:before': {
                            background: 'white !important',
                        },
                        '&:after': {
                            background: 'white !important',
                        },
                    },
                    select: {
                        fontSize: '0.8rem',
                        color: 'white',
                    },
                    icon: {
                        color: 'white',
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: '#79284f !important',
                        '&:hover': {
                            borderColor: '#FFF !important'
                        },

                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: "white !important",
                        fontSize: '0.9rem',

                    },
                }
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        background: '#8d325f',
                        width: '240px',
                    },
                }
            }
        },
    });

    return (
        <div className={styles.contentMoveCardWrapper}>
            <div className={styles.contentMoveCard_title}>
                Переместить
                <button className={styles.contentMoveCard_exit} onClick={handleClose}>
                    <ExitModal/>
                </button>
            </div>
            <section className={styles.contentMoveCard_movingSector}>
                <ThemeProvider theme={theme2}>
                <div className={styles.contentMoveCard_buttonsUp} style={!isAvailableLeftBorder || !isAvailableRightBorder ? {justifyContent: 'center'} : {justifyContent: 'space-between'}}>
                    {isAvailableLeftBorder
                        ?
                            <button
                                disabled={!isAvailableLeftBorder}
                                className={styles.contentMoveCard_buttonUp}
                                style={{width: '45%', paddingLeft: '0px'}}
                                onClick={() => onClickMoveCard(task_id, 0, current_column_id - 1)}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.292892 7.29289C-0.0976321 7.68342 -0.097632 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928933C7.68054 0.538409 7.04738 0.538409 6.65685 0.928933L0.292892 7.29289ZM16 7L0.999999 7L0.999999 9L16 9L16 7Z" fill="#DBA498"/>
                                </svg>
                                Влево
                            </button>
                        :
                        <>
                        </>
                    }
                    {isAvailableRightBorder
                        ?
                            <button
                                disabled={!isAvailableRightBorder}
                                className={styles.contentMoveCard_buttonUp}
                                style={{width: '45%', paddingLeft: '0'}}
                                onClick={() => onClickMoveCard(task_id, 0, current_column_id + 1)}
                            >
                                Вправо
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928932C8.95262 0.538408 8.31946 0.538408 7.92893 0.928932C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34315 15.0711L15.7071 8.70711ZM0 9H15V7H0V9Z" fill="#DBA498"/>
                                </svg>
                            </button>
                        :
                        <>
                        </>
                    }
                </div>
                <Divider />
                    <FormControl sx={{  width: '100%' }} size="small">
                        <InputLabel id="board-select-helper-label" >Доска</InputLabel>
                        <Select
                            labelId="board-select-helper-label"
                            id="board-select-helper"
                            value={board}
                            label="Доска"
                            onChange={handleChangeBoard}

                        >
                            <MenuItem value={0}>Task Board For Study</MenuItem>
                        </Select>
                    </FormControl>
                <div className={styles.contentMoveCard_buttonsDown}>
                    <FormControl sx={{  width: '55%' }} size="small">
                        <InputLabel id="column-select-helper-label" >Колонка</InputLabel>
                        <Select
                            labelId="column-select-helper-label"
                            id="column-select-helper"
                            value={column}
                            label="Колонка"
                            onChange={handleChangeColumn}

                        >
                            {clientVisibleData && clientVisibleData.map((list, index) =>
                                <MenuItem key={list.id} value={index}>{list.title}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl sx={{  width: '45%' }} size="small">
                        <InputLabel id="row-select-helper-label" >Позиция</InputLabel>
                        <Select
                            labelId="row-select-helper-label"
                            id="row-select-helper"
                            value={row}
                            label="Позиция"
                            onChange={handleChangeRow}

                        >
                            {clientVisibleData && clientVisibleData[column].content.map((list_row, index) =>
                                <MenuItem
                                    key={index}
                                    value={index}
                                >
                                    {index + 1}
                                </MenuItem>
                            )}
                            <MenuItem
                                key={clientVisibleData[column].content.length + 1}
                                value={clientVisibleData[column].content.length + 1}
                            >
                                {clientVisibleData[column].content.length + 1}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <button
                    className={styles.contentMoveCard_buttonMove}
                    style={{width: '100%'}}
                    onClick={() => onClickMoveCard(task_id, row, column)}
                >
                    <span >
                        Переместить
                    </span>
                </button>
                </ThemeProvider>
            </section>
        </div>
    )
}

export default ContentMoveCard;