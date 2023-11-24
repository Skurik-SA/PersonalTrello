import styles from "./ButtonDeleteCard.module.css"
import TaskBaseButton from "../TaskBaseButton/TaskBaseButton.jsx";
import {useState} from "react";
import Delete from "../../../../assets/Icons/Delete.jsx";
import ContentDeleteCard from "./ContentDeleteCard.jsx";

const ButtonMoveCard = (props) => {

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
            button_id={button_id ? button_id : "delete-card"}
            buttonContent={buttonContent ? buttonContent : "Удалить"}
            buttonIcon={buttonIcon ? buttonIcon : <Delete/>}

            rootPopoverStyle={rootPopoverStyle ? rootPopoverStyle : styles.buttonWrapper}
            rootButtonStyle={rootButtonStyle}
        >
            <ContentDeleteCard
                clientVisibleData={clientVisibleData}
                task_id={task_id}
                handleClose={handleClose}
            />
        </TaskBaseButton>
    )
}

export default ButtonMoveCard;