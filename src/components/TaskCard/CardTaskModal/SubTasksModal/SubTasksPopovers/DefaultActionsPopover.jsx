import styles from "../SubTasksModal.module.css";
import {Popover} from "@mui/material";
import {useState} from "react";


const DefaultActionsPopover = (props) => {

    const {
        currentTaskValue,
        setCurrentTaskValue,
        targetElement,
        targetElementData,
        addNewTaskIntoCheckList,
        onChangeValueCheckBox,
        anchorEl,
        setAnchorEl,
    } = props

    const open = Boolean(anchorEl);
    const id = open ? 'editing-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentTaskValue("")
    };

    return (
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
                        id={"task-area"}
                        value={currentTaskValue}
                        autoFocus={true}
                        onChange={(e) => {
                            setCurrentTaskValue(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && currentTaskValue !== "" && targetElement === 'add') {
                                addNewTaskIntoCheckList(
                                    targetElementData.sub_task_id,
                                    currentTaskValue
                                )
                                setCurrentTaskValue("")
                                document.getElementById("task-area").focus()
                            }
                            else if (e.key === 'Enter' && currentTaskValue !== "" && targetElement === 'label') {
                                console.log("ads")
                                onChangeValueCheckBox(
                                    targetElementData.sub_task_id,
                                    targetElementData.check_box_id,
                                    currentTaskValue
                                )
                                handleClose()
                            }
                            else if (e.key === 'Enter' && currentTaskValue !== "") {
                                handleClose()
                            }
                        }}
                        className={styles.addInput}

                    />
                <div>
                    {targetElement === 'add'
                        ?
                        <button onClick={() => {
                            console.log(anchorEl)
                            if (currentTaskValue.length > 0) {
                                addNewTaskIntoCheckList(
                                    targetElementData.sub_task_id,
                                    currentTaskValue
                                )
                            }
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
    )
}

export default DefaultActionsPopover;