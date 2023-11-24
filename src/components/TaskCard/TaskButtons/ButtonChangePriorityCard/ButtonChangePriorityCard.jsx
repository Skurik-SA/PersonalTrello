import styles from "./ButtonChangePriorityCard.module.css"
import TaskBaseButton from "../TaskBaseButton/TaskBaseButton.jsx";
import {useState} from "react";
import ContentChangePriorityCard from "./ContentChangePriorityCard.jsx";
import Priority from "../../../../assets/Icons/Priority.jsx";

const ButtonChangePriorityCard = (props) => {

    const {
        task_id,
        renderByAnchor,
        clientVisibleData,

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
            button_id={button_id ? button_id : "change-priority-card"}
            buttonContent={buttonContent ? buttonContent : "Изменить приоритет"}
            buttonIcon={buttonIcon ? buttonIcon : <Priority/>}

            rootPopoverStyle={rootPopoverStyle ? rootPopoverStyle : styles.buttonWrapper}
            rootButtonStyle={rootButtonStyle}
        >
            <ContentChangePriorityCard
                clientVisibleData={clientVisibleData}
                task_id={task_id}
                handleClose={handleClose}
            />
        </TaskBaseButton>
    )
}

export default ButtonChangePriorityCard;