import styles from "./Portal.module.css"
import {useEffect, useMemo} from "react";
import {createPortal} from "react-dom";

const modalRootElement = document.querySelector("#portal")

const Portal = (props) => {

    const element = useMemo(() => document.createElement("div"), [])

    const {
        open,
        onClose,
        style
    } = props

    useEffect(() => {
        if (open) {
            modalRootElement.appendChild(element)

            return () => {
                modalRootElement.removeChild(element)
            }
        }
    });

    if (open) {
        return createPortal(
            <div className={styles.portal_background} onClick={onClose}>
                <div className={styles.portal_card} style={style} onClick={(e) => e.stopPropagation()}>
                    {/* eslint-disable-next-line react/prop-types */}
                    {props.children}
                </div>
            </div>,
            element
        )
    }

    return null;
}

export default Portal;