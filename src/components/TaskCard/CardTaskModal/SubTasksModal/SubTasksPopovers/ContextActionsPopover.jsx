import {Popover} from "@mui/material";
import {useState} from "react";


const ContextActionsPopover = (props) => {

    const {
        targetElementData,
        deleteSomeCheckBox,
        anchorEl2,
        setAnchorEl2,
    } = props

    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'action-popover' : undefined;

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    return (
        <Popover
            id={id2}
            open={open2}
            anchorEl={anchorEl2}
            onClose={handleClose2}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <button>Создать карточку</button>
                    <button
                        onClick={() => {
                            deleteSomeCheckBox(
                                targetElementData.sub_task_id,
                                targetElementData.check_box_id,
                                targetElementData.checked
                            )
                            handleClose2()
                        }}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </Popover>
    )
}

export default ContextActionsPopover;