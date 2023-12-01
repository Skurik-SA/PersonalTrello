import styles from "./SubTasksModal.module.css"
import {Checkbox, FormControlLabel, Popover} from "@mui/material";
import CheckList from "../../../../assets/Icons/CheckList.jsx";
import {BpCheckedIcon, BpIcon} from "../../TaskButtons/ButtonCopyCard/ContentCopyCard.jsx";
import Dates from "../../../../assets/Icons/Dates.jsx";
import {useCheckListActions} from "../../../../hooks/useCheckListActions.js";
import {useState} from "react";
import DefaultActionsPopover from "./SubTasksPopovers/DefaultActionsPopover.jsx";
import ContextActionsPopover from "./SubTasksPopovers/ContextActionsPopover.jsx";


const SubTasksModal = (props) => {

    const {
        task,
        column_id
    } = props

    const [currentTaskValue, setCurrentTaskValue] = useState("")

    const [targetElement, setTargetElement] = useState("")
    const [targetElementData, setTargetElementData] = useState("")

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const handleClickAddButton = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickActionButton = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const {
        deleteSomeCheckList,
        deleteSomeCheckBox,
        addNewTaskIntoCheckList,
        onChangeCheckListCheckBox,
        onChangeValueCheckBox
    } = useCheckListActions(task.id, column_id)

    return (
        <>
            <DefaultActionsPopover
                currentTaskValue={currentTaskValue}
                setCurrentTaskValue={setCurrentTaskValue}
                targetElement={targetElement}
                targetElementData={targetElementData}
                addNewTaskIntoCheckList={addNewTaskIntoCheckList}
                onChangeValueCheckBox={onChangeValueCheckBox}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
            />
            <ContextActionsPopover
                targetElementData={targetElementData} //
                deleteSomeCheckBox={deleteSomeCheckBox} //
                anchorEl2={anchorEl2} //
                setAnchorEl2={setAnchorEl2} //
            />
            <div>
                {task.sub_tasks && task.sub_tasks.map((sub_task, index) =>
                    <div key={index} style={{paddingBottom: '20px'}}>
                        <div className={styles.fullEditDescriptionHeader_CheckList}>
                            <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                                <div style={{paddingTop: '5px'}}>
                                    <CheckList/>
                                </div>
                                <div style={{fontSize: '1.1rem', textDecoration: 'underline'}}>
                                    {sub_task.title}
                                </div>
                            </div>
                            <button
                                className={styles.checkBoxAddButton}
                                onClick={() => {
                                    deleteSomeCheckList(sub_task.id)
                                }}
                            >
                                Удалить
                            </button>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <span style={{width: '50px'}}>
                                {task.sub_tasks[index].check_list.length > 0
                                    ?
                                    `${Math.trunc(task.sub_tasks[index].success_amount * 100 / task.sub_tasks[index].check_list.length)} %`
                                    :
                                    `0 %`
                                }
                            </span>
                            <progress
                                id={`progress-${sub_task.id}`}
                                // style={{width: '460px', transition: 'all 1s'}}
                                className={styles.progressBar}
                                max={task.sub_tasks[index].check_list.length}
                                value={task.sub_tasks[index].success_amount}>
                            </progress>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            {sub_task.check_list && sub_task.check_list.map((list, jindex) =>
                                <FormControlLabel
                                    key={jindex + 100}
                                    control={
                                        <Checkbox
                                            checked={task.sub_tasks[index].check_list[jindex].isChecked}
                                            onChange={(e) => {
                                                onChangeCheckListCheckBox(sub_task.id, list.id, e.target.checked)
                                            }}
                                            size="small"
                                            checkedIcon={<BpCheckedIcon />}
                                            icon={<BpIcon />}

                                        />
                                    }
                                    label={
                                        <div className={styles.checkBoxLabel}>
                                            <span
                                                className={styles.checkBoxSpan}
                                                style={
                                                    task.sub_tasks[index].check_list[jindex].isChecked ?
                                                        {textDecoration: 'line-through', opacity: 0.7} :
                                                        {}
                                                }
                                                onClick={(e) => {
                                                    e.preventDefault()

                                                    setTargetElement("label")
                                                    setCurrentTaskValue(task.sub_tasks[index].check_list[jindex].label)
                                                    setTargetElementData({
                                                        task_id: task.id,
                                                        column_id: column_id,
                                                        sub_task_id: sub_task.id,
                                                        check_box_id: task.sub_tasks[index].check_list[jindex].id
                                                    })

                                                    handleClickAddButton(e)
                                                }}
                                            >
                                                {list.label}
                                            </span>
                                            <div className={styles.checkBoxIcons}>
                                                <span className={styles.checkBoxIconDates}
                                                      onClick={(e) => {
                                                          e.preventDefault()
                                                          handleClickActionButton(e)
                                                      }}
                                                >
                                                    <Dates/>
                                                </span>
                                                <span className={styles.checkBoxIconContext}
                                                      onClick={(e) => {
                                                          e.preventDefault()
                                                          handleClickActionButton(e)
                                                          setTargetElementData({
                                                              task_id: task.id,
                                                              column_id: column_id,
                                                              sub_task_id: sub_task.id,
                                                              check_box_id: task.sub_tasks[index].check_list[jindex].id,
                                                              checked: task.sub_tasks[index].check_list[jindex].isChecked,
                                                          })
                                                      }}
                                                >
                                                    <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="3" height="3" fill="#DBA498"/>
                                                    <rect x="12" width="3" height="3" fill="#DBA498"/>
                                                    <rect x="6" width="3" height="3" fill="#DBA498"/>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    }
                                />
                            )}
                        </div>
                        <button
                            className={styles.checkBoxAddButton}
                            onClick={(e) => {
                                handleClickAddButton(e)
                                setTargetElement("add")
                                setTargetElementData({
                                    task_id: task.id,
                                    column_id: column_id,
                                    sub_task_id: sub_task.id
                                })
                                // addNewTaskIntoCheckList(task.id, column_id, sub_task.id)
                            }}>
                            Добавить элемент
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default SubTasksModal;