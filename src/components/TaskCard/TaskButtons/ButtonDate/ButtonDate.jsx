
import styles from "./ButtonDate.module.css"
import TaskBaseButton from "../TaskBaseButton/TaskBaseButton.jsx";
import {useState} from "react";
import ContentDate from "./ContentDate.jsx";
import Dates from "../../../../assets/Icons/Dates.jsx";

const ButtonDate = (props) => {

    const {
        task_id,
        column_id,
        renderByAnchor,
        clientVisibleData,
        task,

        setDeadline,

        button_id,
        buttonContent,
        buttonIcon,

        rootPopoverStyle,
        rootButtonStyle,
    } = props

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <TaskBaseButton
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            renderByAnchor={renderByAnchor}
            task_id={task_id}

            popover_id={"button-popper"}
            button_id={button_id ? button_id : "date-to"}
            buttonContent={buttonContent ? buttonContent : "Изменить даты"}
            buttonIcon={buttonIcon ? buttonIcon : <Dates/>}

            rootPopoverStyle={rootPopoverStyle}
            rootButtonStyle={rootButtonStyle}
        >
            <ContentDate
                clientVisibleData={clientVisibleData}
                task_id={task_id}
                column_id={column_id}
                setDeadline={setDeadline}
                handleClose={handleClose}
                task={task}
            />
        </TaskBaseButton>
    )
}

export default ButtonDate;