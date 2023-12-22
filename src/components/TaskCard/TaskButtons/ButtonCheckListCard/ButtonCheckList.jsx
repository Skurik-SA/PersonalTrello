import styles from "./ButtonCheckList.module.css"
import TaskBaseButton from "../TaskBaseButton/TaskBaseButton.jsx";
import {useState} from "react";
import ContentCheckList from "./ContentCheckList.jsx";
import CheckList from "../../../../assets/Icons/CheckList.jsx";
import {useCheckListActions} from "../../../../hooks/useCheckListActions.js";

const ButtonCheckList = (props) => {

    const {
        task_id,
        column_id,

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
            button_id={button_id ? button_id : "check-list-card"}
            buttonContent={buttonContent ? buttonContent : "Чек-лист"}
            buttonIcon={buttonIcon ? buttonIcon : <CheckList/>}

            rootPopoverStyle={rootPopoverStyle ? rootPopoverStyle : styles.buttonWrapper}
            rootButtonStyle={rootButtonStyle}
        >
            <ContentCheckList
                task_id={task_id}
                column_id={column_id}
                handleClose={handleClose}
            />
        </TaskBaseButton>
    )
}

export default ButtonCheckList;