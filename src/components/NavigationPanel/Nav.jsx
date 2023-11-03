import styles from "./Nav.module.css"
import {useEffect, useRef, useState} from "react";
import {Avatar, Box, Divider, Fade, Grow, IconButton, Popper} from "@mui/material";
import AccountMenu from "../AccountMenu/AccountMenu.jsx";
import FadeOwn from "../AnimationComponents/FadeOwn/FadeOwn.jsx";

const Nav = (props) => {
    const {

    } = props

    const [anchorEl, setAnchorEl] = useState(null);


    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    let popperRef = useRef(null)
    let buttonPopperRef = useRef(null)

    useEffect(() => {
        let handler = (e) => {
            try {
                if (!popperRef.current.contains(e.target) && !buttonPopperRef.current.contains(e.target)) {
                    setAnchorEl(null);
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
        <nav>
            <section>
                <div>asd</div>
                <div>asd</div>
                <div>asd</div>
            </section>
            <section>
                <div>asd</div>
                <div>asd</div>
                <div>
                    Типа будущий попап
                </div>
                <AccountMenu/>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        ml: 2,
                        cursor: 'pointer',
                    }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    ref={buttonPopperRef}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>

                <Popper id={id} open={open} anchorEl={anchorEl} placement={'bottom-start'} ref={popperRef} transition>
                    {({ TransitionProps }) => (
                        <Grow {...TransitionProps} in={anchorEl} ref={popperRef} timeout={350} >
                            <div className={styles.popupMenu}>
                                <div className={styles.popupMenuItems}>
                                    Профиль
                                </div>
                                <Divider/>
                                <div>
                                    <div className={styles.popupMenuItems}>
                                        Настройки
                                    </div>
                                    <div className={styles.popupMenuItems}>
                                        Выйти
                                    </div>
                                </div>
                            </div>
                        </Grow>
                    )}
                </Popper>

            </section>
        </nav>
    )
}

export default Nav;