import PropTypes from "prop-types";
import styles from "./SideBarMainButton.module.css"

const SideBarMainButton = (props) => {

    const {
        handleClick,
        actionEvent,
        icon,
        buttonContent
    } = props

    return (
        <button className={styles.sideBar_menuButtons} onClick={() => {
            handleClick(actionEvent)
        }}>
            <div className={styles.sideBar_ButtonEntrails}>
                {icon ? <span>{icon}</span> : <></>}
                <span>
                    {buttonContent}
                </span>
            </div>
        </button>
    )
}

SideBarMainButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    actionEvent: PropTypes.string.isRequired,
    icon: PropTypes.any,
    buttonContent: PropTypes.any
}

export default SideBarMainButton;