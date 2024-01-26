import styles from "./MoveContextView.module.css"
import {createTheme, FormControl, InputLabel, MenuItem, Select, ThemeProvider} from "@mui/material";
import {useContext, useEffect, useMemo, useState} from "react";
import BoardContext from "../../../../../../context/BoardContext.jsx";
import PropTypes from "prop-types";
import {set_todolist} from "../../../../../../redux/store/slices/slice_ToDoList.js";
import {flushSync} from "react-dom";
import {useDispatch} from "react-redux";

const MoveContextView = (props) => {

    const {
        card_data_id,
        handleClose,
    } = props

    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)

    const dispatch = useDispatch()

    const initialDestination = useMemo(
        () => clientVisibleData.findIndex((nd) => nd.id === card_data_id),
        [card_data_id, clientVisibleData]
    )
    const [columnDestination, setColumnDestination] = useState(initialDestination)

    const handleChangeColumn = (event) => {
        setColumnDestination(event.target.value)
    }

    const moveColumn = () => {
        const reorderedData = [...clientVisibleData]
        const [removedItem] = reorderedData.splice(initialDestination, 1);
        reorderedData.splice(Number(columnDestination), 0, removedItem);

        dispatch(set_todolist(reorderedData));
        flushSync(() => setClientVisibleData(reorderedData));

    }

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
                        fontSize: '1rem',
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
                        fontSize: '1.1rem',

                    },
                }
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        background: '#8d325f',
                        width: '270px',
                    },
                }
            }
        },
    });

    return (
        <ThemeProvider theme={theme2}>
            <div className={styles.moveContentViewContainer}>
                <FormControl sx={{width: '100%'}} size="small">
                    <InputLabel id="board-select-helper-label">Доска</InputLabel>
                    <Select
                        labelId="board-select-helper-label"
                        id="board-select-helper"
                        // value={board}
                        label="Доска"
                        // onChange={handleChangeBoard}

                    >
                        <MenuItem value={0}>Task Board For Study</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{width: '100%'}} size="small">
                    <InputLabel id="row-select-helper-label">Позиция</InputLabel>
                    <Select
                        labelId="row-select-helper-label"
                        id="row-select-helper"
                        value={columnDestination}
                        label="Позиция"
                        onChange={handleChangeColumn}

                    >
                        {clientVisibleData && clientVisibleData.map((column, index) =>
                            <MenuItem
                                key={index}
                                value={index}
                            >
                                {index === initialDestination
                                    ?
                                    <>
                                        {index + 1} (Текущая)
                                    </>
                                    :
                                    <>
                                        {index + 1}
                                    </>
                                }
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <button className={styles.copyContextView_button}
                        onClick={() => {
                            moveColumn()
                            handleClose()
                        }}
                        // onClick={() => {
                        //     if (textAreaValue === "") {
                        //         textAreaRef.current.focus()
                        //         return
                        //     }
                        // }}
                >
                    Переместить
                </button>
            </div>
        </ThemeProvider>
    )
}

MoveContextView.propTypes = {
    card_data_id: PropTypes.any,
    handleClose: PropTypes.func
}

export default MoveContextView;