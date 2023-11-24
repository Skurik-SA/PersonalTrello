
import styles from "./ButtonCopyCard.module.css"
import TaskBaseButton from "../TaskBaseButton/TaskBaseButton.jsx";
import {useState} from "react";

import Copy from "../../../../assets/Icons/Copy.jsx";
import ContentCopyCard from "./ContentCopyCard.jsx";

const ButtonCopyCard = (props) => {

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
            button_id={button_id ? button_id : "copy-card"}
            buttonContent={buttonContent ? buttonContent : "Копировать"}
            buttonIcon={buttonIcon ? buttonIcon : <Copy/>}

            rootPopoverStyle={rootPopoverStyle}
            rootButtonStyle={rootButtonStyle}
        >
            <ContentCopyCard
                popover_id={"button-popper"}
                button_id={button_id ? button_id : "copy-card"}

                clientVisibleData={clientVisibleData}
                task_id={task_id}
                handleClose={handleClose}
            />
        </TaskBaseButton>
    )
}

export default ButtonCopyCard;