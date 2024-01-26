import styles from "./NavigationIconButton.module.css"
import {Avatar, Divider, Grow, IconButton, Popper} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const NavigationIconButton = () => {

    const [anchorIconMenu, setAnchorIconMenu] = useState(null);
    const [animMenuFlag, setAnimMenuFlag] = useState(false);

    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorIconMenu(anchorIconMenu ? null : event.currentTarget)
        setAnimMenuFlag(!animMenuFlag)
    };

    const open = Boolean(anchorIconMenu);
    const id = open ? 'icon-menu-popper' : undefined;

    let popperRef = useRef(null)
    let buttonPopperRef = useRef(null)

    useEffect(() => {
        let handler = (e) => {
            try {
                if (!popperRef.current.contains(e.target) && !buttonPopperRef.current.contains(e.target)) {
                    setAnchorIconMenu(null);
                    setAnimMenuFlag(false)
                }
            }
            catch (err) {
                // console.log("ads")
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{
                    ml: 1,
                    cursor: 'pointer'
                }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                ref={buttonPopperRef}
            >
                <Avatar sx={{ width: 32, height: 32, background: 'black',}}>U</Avatar>
            </IconButton>

            <Popper id={id} open={open} anchorEl={anchorIconMenu} placement={'bottom-start'} ref={popperRef} transition>
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} in={animMenuFlag} ref={popperRef} timeout={150} style={{ transformOrigin: '100% 0 0' }}>
                        <div className={styles.popupMenu}>
                            <div className={styles.popupMenuItems}>
                                Профиль
                            </div>
                            <Divider/>
                            <div>
                                <div className={styles.popupMenuItems}>
                                    Настройки
                                </div>
                                <div className={styles.popupMenuItems} onClick={() => navigate('/')}>
                                    Выйти
                                </div>
                            </div>
                        </div>
                    </Grow>
                )}
            </Popper>
        </>
    )
}

export default NavigationIconButton;