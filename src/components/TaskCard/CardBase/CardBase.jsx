import styles from "./CardBase.module.css"
import {useEffect, useRef, useState} from "react";
import {TextareaAutosize} from "@mui/material";
import CardTasks from "../CardTasks/CardTasks.jsx";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {v4 as uuidv4} from "uuid";

const CardBase = (props) => {

    const {
        card_data,
        index,
        card_title
    } = props

    const [titleText, setTitleText] = useState(card_title)

    const [titleTextVisibility, setTitleTextVisibility] = useState(false)

    const wrapRef = useRef(null)

    const handleClick = (event) => {
        if (wrapRef.current && !wrapRef.current.contains(event.target))
        {
            document.getElementById(index).blur()
            setTitleTextVisibility(false)
        }
    }

    const test = () => {
        setTitleTextVisibility(!titleTextVisibility)
        setTimeout(() => {
            document.getElementById(index).focus()
        }, 50);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick)

        return () => {
            document.removeEventListener("mousedown", handleClick)
        }

    }, [])

    return (
        <li className={styles.boardLi}>
            <Droppable droppableId={card_data.id} type={"row"}>
                {(provided) => (
                    <div
                        className={styles.cardBaseContainer}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <div className={styles.cardHead}>
                            <div className={styles.cardHead_contentLeft}>
                                {titleTextVisibility
                                    ?
                                    <TextareaAutosize
                                        id={index}
                                        maxRows={14}
                                        maxLength={250}
                                        cols={23}
                                        placeholder={"Введите название"}
                                        className={styles.titleArea}
                                        value={titleText}
                                        spellCheck="false"
                                        ref={wrapRef}
                                        onChange={(e) => {
                                            setTitleText(e.target.value)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                // document.getElementById(index).focus()
                                                document.getElementById(index).blur()
                                                console.log(document.getElementById("auf"))
                                                setTitleTextVisibility(!titleTextVisibility)
                                            }
                                        }}

                                    />
                                    :
                                    <span style={{display: 'flex', paddingLeft: '10px', color: 'white'}}
                                          onClick={() => {
                                              test()
                                              setTitleText(card_title)
                                          }}
                                    >
                                        {card_title}
                                    </span>
                                }

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
                            {card_data.content.map((task, index_map) =>
                                <Draggable draggableId={task.id} key={task.id} index={index_map}>
                                    {(provided) => (
                                        <div
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                        >
                                            <CardTasks
                                                task={task}
                                            />

                                        </div>
                                    )}
                                </Draggable>
                            )}
                            {provided.placeholder}
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
                )}
            </Droppable>
        </li>

    )
}

export default CardBase;