import style from "./MoveCard.module.css"
import TaskBaseButton from "../TaskBaseButton/TaskBaseButton.jsx";
import {useState} from "react";
import Moving from "../../../../assets/Icons/Moving.jsx";
import ContentMoveCard from "./ContentMoveCard.jsx";

const ButtonMoveCard = (props) => {

    const {
        task_id,
        renderByAnchor,

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
            button_id={button_id ? button_id : "move-card-to"}
            buttonContent={buttonContent ? buttonContent : "Переместить"}
            buttonIcon={buttonIcon ? buttonIcon : <Moving/>}

            rootPopoverStyle={rootPopoverStyle}
            rootButtonStyle={rootButtonStyle}
        >
            <ContentMoveCard
                task_id={task_id}
                handleClose={handleClose}
            />
        </TaskBaseButton>
    )
}

export default ButtonMoveCard;