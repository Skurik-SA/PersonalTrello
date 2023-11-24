import styles from "./ButtonCopyCard.module.css"
import ExitModal from "../../../../assets/Icons/ExitModal.jsx";
import {
    Checkbox,
    createTheme,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select, styled,
    ThemeProvider
} from "@mui/material";
import {useState} from "react";


const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#106ba3',
    },
});

const ContentCopyCard = (props) => {

    const {
        clientVisibleData,
        task,
        task_id,
        copyCardTo,
        handleClose,
        popover_id,
        button_id,

        copiedValue = ""
    } = props

    const [column, setColumn] = useState(0);
    const [row, setRow] = useState(0);
    const [board, setBoard] = useState(0);
    const [textAreaValue, setTextAreaValue] = useState(copiedValue)

    const [checkedMarks, setCheckedMarks] = useState(true);
    const [checkedSubTasks, setCheckedSubTasks] = useState(true);
    const [checkedDescription, setCheckedDescription] = useState(true);

    const handleChangeMarks = (event) => {
        setCheckedMarks(event.target.checked);
        console.log(event.target.checked)
        console.log(checkedMarks)
    };

    const handleChangeSubTasks = (event) => {
        setCheckedSubTasks(event.target.checked);
    };

    const handleChangeDescription = (event) => {
        setCheckedDescription(event.target.checked);
    };

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

    const onClickCopyCard = (
        source_task_id,
        destination_task_index,
        destination_column_index,
        isCopyMarks,
        isCopySubTasks,
        isCopyDescription,
        value,
    ) => {
        // if (current_column_id)
        copyCardTo(
            source_task_id,
            destination_task_index,
            destination_column_index,
            isCopyMarks,
            isCopySubTasks,
            isCopyDescription,
            value,
        )
        handleClose()
    }

    const theme = createTheme({
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
        <div className={styles.contentCopyCardWrapper}>
            <div className={styles.contentCopyCard_title}>
                Копировать
                <button className={styles.contentCopyCard_exit} onClick={handleClose}>
                    <ExitModal/>
                </button>
            </div>
            <section className={styles.contentCopyCard_movingSector}>
                <ThemeProvider theme={theme}>
                    <div>
                        <textarea
                            id={'text-area-copy'}
                            value={textAreaValue}
                            onChange={(e) => setTextAreaValue(e.target.value)}
                            className={styles.contentCopyCard_textArea}
                            onMouseMove={() => {
                                if (
                                    document.getElementById('text-area-copy').offsetHeight > 120 &&
                                    document.getElementById('text-area-copy').offsetHeight < 500 &&
                                    window.innerWidth > 1200
                                )
                                    document.getElementById(popover_id).style.top = `-${document.getElementById('text-area-copy').offsetHeight / 1 - 120}px`
                            }}
                            onFocus={() => {
                                if (
                                    document.getElementById('text-area-copy').offsetHeight > 120 &&
                                    document.getElementById('text-area-copy').offsetHeight < 500 &&
                                    window.innerWidth > 1200
                                )
                                    document.getElementById(popover_id).style.top = `-${document.getElementById('text-area-copy').offsetHeight / 1 - 120}px`
                            }}
                        />
                    </div>

                    <div className={styles.contentCopyCard_controlWrapper}>
                        <Divider />
                        <span style={{fontSize: '0.9rem'}}>Также копировать...</span>

                        <div className={styles.contentCopyCard_checkBoxesWrapper}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedMarks}
                                        onChange={handleChangeMarks}
                                        size="small"
                                        checkedIcon={<BpCheckedIcon />}
                                        icon={<BpIcon />}
                                    />
                                }
                                label={`Метки (${task.marks.length})`}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedSubTasks}
                                        onChange={handleChangeSubTasks}
                                        size="small"
                                        checkedIcon={<BpCheckedIcon />}
                                        icon={<BpIcon />}
                                    />
                                }
                                label={`Чек-листы (${task.sub_tasks.length})`}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedDescription}
                                        onChange={handleChangeDescription}
                                        size="small"
                                        checkedIcon={<BpCheckedIcon />}
                                        icon={<BpIcon />}
                                    />
                                }
                                label={`Описание`}
                            />
                        </div>

                        <Divider />
                        <span style={{fontSize: '0.9rem', marginBottom: '10px'}}>Копировать в...</span>

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
                        <div className={styles.contentCopyCard_buttonsDown}>
                            <FormControl sx={{  width: 'calc(55% + 100px)' }} size="small">
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
                            className={styles.contentCopyCard_buttonMove}
                            style={{width: '100%'}}
                            onClick={() => onClickCopyCard(task_id, row, column, checkedMarks, checkedSubTasks, checkedDescription, textAreaValue)}
                        >
                        <span >
                            Копировать
                        </span>
                        </button>
                    </div>
                </ThemeProvider>
            </section>
        </div>
    )
}

export default ContentCopyCard;