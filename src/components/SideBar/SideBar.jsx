import styles from "./SideBar.module.css"
import {Collapse, Divider} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const SideBar = () => {

    const boards_data = useSelector(state => state.boards.boards_data)
    const [checked, setChecked] = useState(true);
    const navigate = useNavigate()

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <>
            <Collapse in={checked} orientation="horizontal" collapsedSize={20} timeout={100}>
                <nav className={styles.sideBarWrapper}>
                    <Collapse in={checked} orientation="horizontal" timeout={10}>
                        <div className={styles.sideBarWrapper}>

                            {/*visible side*/}
                            <Divider sx={{background: '#DBA498', width: '100%', opacity: '0.5'}}/>

                            <div className={styles.userDataWrapper}>
                                <div className={styles.userData_leftContent}>
                                    Fname Lname
                                </div>
                                <div className={styles.userData_rightContent}>
                                    <button className={styles.sideBar_arrow} onClick={handleChange}>
                                        <span>
                                            <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.896729" y="7.38086" width="11" height="2" rx="1" transform="rotate(-41.3176 0.896729 7.38086)" fill="#DBA498"/>
                                                <rect x="2.13623" y="6.16138" width="11" height="2" rx="1" transform="rotate(39.2293 2.13623 6.16138)" fill="#DBA498"/>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <Divider sx={{background: '#DBA498', width: '100%', opacity: '0.5'}}/>

                            {/*hidden side*/}

                            <div className={styles.navigationAreaWrapper}>
                                <div className={styles.buttonsLayerAreaWrapper}>
                                    <div className={styles.buttonsLayerWrapper}>
                                        <div className={styles.buttonsGroupMark}>
                                            Навигация:
                                        </div>
                                        <div className={styles.buttonsLayer}>
                                            <button className={styles.navButton} onClick={() => navigate('/my-boards')}>Доски</button>
                                            <button className={styles.navButton}>Участники</button>
                                            <button className={styles.navButton}>Настройки</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.buttonsLayerAreaWrapper}>
                                    <div className={styles.buttonsLayerWrapper}>
                                        <div className={styles.buttonsGroupMark}>
                                            Мои доски:
                                        </div>
                                        <div className={styles.buttonsLayer}>
                                            {boards_data.map((data, index) =>
                                                <button key={index} className={styles.navButton}>{data.title}</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Collapse>

                </nav>
            </Collapse>
            {!checked
                ?
                    <div>
                        <button className={styles.navButtonSideBar} onClick={handleChange}>
                            <span>
                                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="9.79715" height="1.71168" rx="0.855839" transform="matrix(-0.843274 0.537484 -0.771444 -0.636297 9.76025 5.28308)" fill="#DBA498"/>
                                    <rect width="9.90186" height="1.69164" rx="0.845821" transform="matrix(-0.860528 -0.509403 0.747706 -0.664029 8.52075 6.16736)" fill="#DBA498"/>
                                </svg>
                            </span>
                        </button>
                    </div>
                :
                <>
                </>
            }
        </>
    )
}

export default SideBar;