import style from "./ChangeMark.module.css"
import TaskBaseButton from "../TaskBaseButton/TaskBaseButton.jsx";
import Marks from "../../../../assets/Icons/Marks.jsx";
import ContentChangeMark from "./ContentChangeMark.jsx";
import {useState} from "react";

const ButtonChangeMark = (props) => {

    const {
        task_id,
        card_marks,
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
            button_id={button_id ? button_id : "change-marks"}
            buttonContent={buttonContent ? buttonContent : "Изменить метки"}
            buttonIcon={buttonIcon ? buttonIcon : <Marks/>}

            rootPopoverStyle={rootPopoverStyle}
            rootButtonStyle={rootButtonStyle}
        >
            <ContentChangeMark
                task_id={task_id}
                card_marks={card_marks}
                handleClose={handleClose}
            />
        </TaskBaseButton>
    )
}

export default ButtonChangeMark;