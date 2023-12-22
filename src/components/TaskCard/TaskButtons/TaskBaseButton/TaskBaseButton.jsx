import styles from "./TaskBaseButton.module.css"
import {createTheme, Popover, ThemeProvider} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
// import {set_selected_task_byId} from "../../../../redux/store/slices/slice_ToDoList.js";

const TaskBaseButton = (props) => {

    const {
        anchorEl,
        setAnchorEl,
        renderByAnchor, // true || false

        task_id,

        children, // Popover content

        popover_id, // Popover id | default = button-popover
        button_id,  // Button id  | default = some-button

        buttonContent, // Button label | default = <span></span>
        buttonIcon,    // Button Icon  | default = <span></span>

        rootPopoverStyle,
        rootButtonStyle,
    } = props

    const dispatch = useDispatch()

    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id =
        open
            ? popover_id
                ? popover_id
                : 'button-popover'
            : undefined;



    const handleClick = (event) => {
        // dispatch(set_selected_task_byId(task_id))

        setAnchorEl(event.currentTarget);

        let element = document.getElementById(button_id);
        let rect = element.getBoundingClientRect();
        let xPosition = rect.left;
        let yPosition = rect.top + element.offsetHeight + 2;


        // let poppppover = (document.getElementById(id)).getBoundingClientRect()
        setTop(yPosition)
        setLeft(xPosition)
        console.log(xPosition)
        console.log(yPosition)
        console.log(rect)
        // console.log(poppppover.)
    }


    const theme = createTheme({
        components: {
            // Name of the component
            MuiPopover: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        background: 'rgba(0, 0, 0, 0)',
                    },
                    paper: {
                        background: 'transparent',
                        transformOrigin: '0 100 0',
                        boxShadow: 'none',
                        color: 'white',
                        overflow: 'hidden',
                        border: '#8d325f 1px solid',
                        borderRadius: '20px',
                    }
                },
            },
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <Popover
                    id={id}
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    anchorReference={renderByAnchor ? "anchorEl" : "anchorPosition"}
                    anchorPosition={{top, left}}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transitionDuration={100}
                >
                    <div
                        id={"ch-div"}
                        className={
                            rootPopoverStyle
                                ?
                                    rootPopoverStyle
                                :
                                    styles.taskBaseButtonWrapper
                        }
                        onMouseUp={() => {
                            console.log((document.getElementById(id)).getBoundingClientRect())
                            console.log(anchorEl)
                        }}
                    >
                        {children}
                    </div>
                </Popover>
            </ThemeProvider>
            <button
                id={button_id}
                className={
                    rootButtonStyle
                        ?
                            rootButtonStyle
                        :
                            styles.cardEditPopperMenuButton
                }
                onClick={(e) => {
                    handleClick(e)
                }}
            >
                <span>
                    {buttonIcon}
                </span>
                <span className={styles.buttonTextMobile}>
                    {buttonContent}
                </span>
            </button>
        </>
    )
}

export default TaskBaseButton;