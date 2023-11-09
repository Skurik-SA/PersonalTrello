import styles from "./NavigationDefaultButton.module.css"

import {useEffect, useRef, useState} from "react";
import {Grow, Popper} from "@mui/material";
import {LogoOff} from "../../../../assets/Logo/LogoOff.jsx";
import {LogoOn} from "../../../../assets/Logo/LogoOn.jsx";

const NavigationDefaultButton = (props) => {

    const {
        popperBtnId,
        placement,
        children,
        buttonContent,
        isIcon,
        customButtonBaseStyle,
        customPopperBaseStyle,
        growAnimationStyle,
        clickClose= false,
    } = props

    const [anchorEl, setAnchorEl] = useState(null);
    const [animElFlag, setAnimElFlag] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
        setAnimElFlag(!animElFlag)
    };

    const open = Boolean(anchorEl);
    const id = open ? popperBtnId ? popperBtnId : 'el-popper' : undefined;

    let popperRef2 = useRef(null)
    let buttonPopperRef = useRef(null)

    useEffect(() => {
        let handler = (e) => {
            try {
                if (!popperRef2.current.contains(e.target) && !buttonPopperRef.current.contains(e.target)) {
                    setAnchorEl(null);
                    setAnimElFlag(false)
                }
            }
            catch (err) {
                console.log("ads")
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    return (
        <>
            <button className={
                customButtonBaseStyle
                    ?
                        customButtonBaseStyle
                    :
                        styles.menuButton
            }
                    onClick={handleClick}
                    ref={buttonPopperRef}
            >
                {isIcon
                    ?
                        <>
                            <LogoOff style={styles.logoOn}/>
                            <LogoOn style={styles.logoOff}/>
                            {buttonContent}
                        </>
                    :
                        <>
                            {buttonContent}
                        </>
                }
            </button>
            <Popper id={id}
                    open={open}
                    anchorEl={anchorEl}
                    placement={placement ? placement : 'bottom-start'}
                    ref={popperRef2}
                    transition
            >
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        in={animElFlag}
                        ref={popperRef2}
                        timeout={150}
                        style={growAnimationStyle ? growAnimationStyle : { transformOrigin: '0 0 0' }}
                    >
                        <div className={
                            customPopperBaseStyle
                                ?
                                customPopperBaseStyle
                                :
                                styles.popupBaseContent
                            }
                             onClick={() => {
                                 if (clickClose) {
                                     setAnchorEl(null)
                                     setAnimElFlag(false)
                                 }
                             }}
                        >
                            {children}
                        </div>
                    </Grow>
                )}
            </Popper>
        </>
    )
}

export default NavigationDefaultButton;