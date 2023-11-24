import styles from "./CardBase.module.css"
import {Component, useEffect, useRef, useState} from "react";
import {TextareaAutosize} from "@mui/material";
import CardTasks from "../CardTasks/CardTasks.jsx";
import {Draggable, Droppable} from "react-beautiful-dnd";


class InnerCardTaskList extends Component {
    shouldComponentUpdate(nextProps) {
        if (
            nextProps.column_id === this.props.column_id &&
            nextProps.task === this.props.task &&
            nextProps.changeTaskInfo === this.props.changeTaskInfo &&
            nextProps.onChangeCardMark === this.props.onChangeCardMark &&
            nextProps.markTextShow === this.props.markTextShow &&
            nextProps.setMarkTextShow === this.props.setMarkTextShow &&
            nextProps.clientVisibleData === this.props.clientVisibleData &&
            nextProps.moveCardViaButtons === this.props.moveCardViaButtons &&
            nextProps.copyCardTo === this.props.copyCardTo &&
            nextProps.deleteCard === this.props.deleteCard &&
            nextProps.onChangeDescription === this.props.onChangeDescription
        ) {
            return false;
        }

        return true
    }

    render() {
        return <CardTasks
                    key={this.props.task.id}
                    task={this.props.task}
                    column_id={this.props.column_id}
                    changeTaskInfo={this.props.changeTaskInfo}
                    onChangeCardMark={this.props.onChangeCardMark}
                    clientVisibleData={this.props.clientVisibleData}
                    markTextShow={this.props.markTextShow}
                    setMarkTextShow={this.props.setMarkTextShow}
                    moveCardViaButtons={this.props.moveCardViaButtons}
                    copyCardTo={this.props.copyCardTo}
                    deleteCard={this.props.deleteCard}
                    onChangeDescription={this.props.onChangeDescription}
                />
    }
}

const CardBase = (props) => {

    const {
        card_data,
        index,
        card_title,
        titleOnChange,
        newTaskOnClick,
        changeTaskInfo,
        onChangeCardMark,
        markTextShow,
        setMarkTextShow,
        clientVisibleData,
        moveCardViaButtons,
        onChangeDescription,
        copyCardTo,
        deleteCard
    } = props

    const [titleTextVisibility, setTitleTextVisibility] = useState(false)

    // const [titleValue, setTitleValue] = useState(card_title)

    const wrapRef = useRef(null)

    const handleClick = (event) => {
        if (wrapRef.current && !wrapRef.current.contains(event.target)) {
            document.getElementById(index).blur()
            setTitleTextVisibility(false)
        }
    }

    const swapHeadCardInputElements = () => {
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
                            {/*<InnerList booba={"Game"}/>*/}

                            <div className={styles.cardHead_contentLeft}>
                                {titleTextVisibility
                                    ?
                                    <TextareaAutosize
                                        id={index}
                                        maxRows={14}
                                        maxLength={250}
                                        cols={23}
                                        placeholder={"Введите название"}
                                        className={styles.titleTextArea}
                                        value={card_title}
                                        spellCheck="false"
                                        ref={wrapRef}
                                        onChange={(e) => {
                                            // setTitleValue(e.target.value)
                                            titleOnChange(card_data.id, e.target.value)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                // document.getElementById(index).focus()
                                                document.getElementById(index).blur()
                                                setTitleTextVisibility(!titleTextVisibility)
                                            }
                                        }}

                                    />
                                    :
                                    <span className={styles.titleSpanArea}
                                          onClick={() => {
                                              swapHeadCardInputElements()
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
                                            {/*<CardTasks*/}
                                            {/*    key={task.id}*/}
                                            {/*    task={task}*/}
                                            {/*    column_id={card_data.id}*/}
                                            {/*    changeTaskInfo={changeTaskInfo}*/}
                                            {/*    onChangeCardMark={onChangeCardMark}*/}

                                            {/*    markTextShow={markTextShow}*/}
                                            {/*    setMarkTextShow={setMarkTextShow}*/}
                                            {/*/>*/}
                                            <InnerCardTaskList
                                                key={task.id}
                                                task={task}
                                                column_id={card_data.id}
                                                changeTaskInfo={changeTaskInfo}
                                                onChangeCardMark={onChangeCardMark}
                                                onChangeDescription={onChangeDescription}

                                                clientVisibleData={clientVisibleData}
                                                moveCardViaButtons={moveCardViaButtons}
                                                copyCardTo={copyCardTo}
                                                deleteCard={deleteCard}
                                                markTextShow={markTextShow}
                                                setMarkTextShow={setMarkTextShow}
                                                />
                                        </div>
                                    )}
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </ol>
                        <div className={styles.cardCellar}>
                            <button
                                className={styles.cardCellar_contentLeft}
                                onClick={() => {
                                    newTaskOnClick(card_data.id)
                                }}
                            >
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