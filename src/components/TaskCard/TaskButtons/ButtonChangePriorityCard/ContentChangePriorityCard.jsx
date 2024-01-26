import styles from "./ButtonChangePriorityCard.module.css"
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";
import {createTheme, FormControl, InputLabel, MenuItem, Select, ThemeProvider} from "@mui/material";
import {useContext, useState} from "react";
import {cloneDeep} from "lodash-es";
import BoardContext from "../../../../context/BoardContext.jsx";
import {useDispatch} from "react-redux";
import {set_todolist} from "../../../../redux/store/slices/slice_ToDoList.js";

const ContentChangePriorityCard = (props) => {

    const {
        task_id,
        column_id,
        handleClose,
    } = props

    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)

    const dispatch = useDispatch()

    const task_priorities = [
        {
            id: 0,
            type: 'default',
            label: 'Нет установлен'
        },
        {
            id: 1,
            type: 'Low',
            label: 'Низкий'
        },
        {
            id: 2,
            type: 'Middle',
            label: 'Средний'
        },
        {
            id: 3,
            type: 'High',
            label: 'Высокий'
        },
        {
            id: 4,
            type: 'Critical',
            label: 'Критичный'
        },
    ]
    const [taskPriority, setTaskPriority] = useState()

    const handleChangeTaskPriority = (event) => {
        setTaskPriority(event.target.value);
    };

    const setPriorityCard = (task_id, card_id, priority_data) => {
        console.log(priority_data)
        const columnIndex = clientVisibleData.findIndex((column_id) => column_id.id === card_id)
        const taskIndex = clientVisibleData[columnIndex].content.findIndex((task) => task.id === task_id)

        const newData = cloneDeep(clientVisibleData)
        newData[columnIndex].content[taskIndex].priority = priority_data

        dispatch(set_todolist(newData))
        setClientVisibleData(newData)
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
                        fontSize: '1rem',
                        top: -5
                    },
                }
            },
        },
    });

    return (
        <div className={styles.contentChangePriorityWrapper}>
            <div className={styles.contentChangePriority_title}>
                Приоритет
                <button className={styles.contentChangePriority_exit} onClick={handleClose}>
                    <ExitModal/>
                </button>
            </div>
            <div className={styles.contentChangePriorityControlsWrapper}>
                <ThemeProvider theme={theme2}>
                    <FormControl sx={{  width: '100%' }}>
                        <InputLabel id="priority-select-helper-label" >Приоритет</InputLabel>
                        <Select
                            labelId="priority-select-helper-label"
                            id="priority-select-helper"
                            value={taskPriority}
                            label="Приоритет"
                            onChange={handleChangeTaskPriority}
                            size={"small"}
                        >
                            {task_priorities.map((pr) =>
                                <MenuItem key={pr.id} value={pr.id}>{pr.label}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </ThemeProvider>
                <button className={styles.contentChangePriority_setButton}
                        onClick={() => {
                            setPriorityCard(task_id, column_id, task_priorities[taskPriority])
                            handleClose()
                        }}
                >
                    Установить
                </button>
            </div>
        </div>
    )
}

export default ContentChangePriorityCard;