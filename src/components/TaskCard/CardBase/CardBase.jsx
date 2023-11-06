import styles from "./CardBase.module.css"
import {useState} from "react";
import {TextareaAutosize} from "@mui/material";

const CardBase = (props) => {

    const {
        card_data,
        index,
    } = props

    const [titleText, setTitleText] = useState(card_data.title)

    return (
        <li className={styles.boardLi} >
            <div className={styles.cardBaseContainer}>
                <div className={styles.cardHead}>
                    <div className={styles.cardHead_contentLeft}>
                        <TextareaAutosize
                            id={'auf'}
                            maxRows={14}
                            maxLength={250}
                            cols={23}
                            placeholder={"Введите название"}
                            className={styles.titleArea}
                            value={titleText}
                            spellCheck="false"
                            onChange={(e) => {
                                setTitleText(e.target.value)
                                document.onkeypress = function (event) {
                                    e = event || window.event;
                                    if (e.keyCode === 13) {
                                        e.preventDefault();
                                        document.getElementById(e.target.id).submit()
                                    }
                                }
                            }}
                        />
                    </div>
                    <button className={styles.cardHead_contentRight}>
                        <span>
                            <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="3" height="3" fill="#DBA498"/>
                                <rect x="12" width="3" height="3" fill="#DBA498"/>
                                <rect x="6" width="3" height="3" fill="#DBA498"/>
                            </svg>
                        </span>
                    </button>
                </div>
                <ol className={styles.cardOl}>
                    {card_data.content.map((task, i) =>
                        <li key={i} className={styles.taskContents}>
                            <div className={styles.taskWrapper}>
                                <div >
                                    {task}
                                </div>
                            </div>
                        </li>
                    )
                    }
                </ol>
                <div className={styles.cardCellar}>
                    <button className={styles.cardCellar_contentLeft}>
                        + Добавить карточку
                    </button>
                    <button className={styles.cardCellar_contentRight}>
                        <span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="1" width="18" height="18" rx="2" stroke="#DBA498" strokeWidth="2"/>
                                <rect x="9" y="7" width="2" height="8" fill="#DBA498"/>
                                <rect x="14" y="5" width="2" height="8" transform="rotate(90 14 5)" fill="#DBA498"/>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </li>
    )
}

export default CardBase;