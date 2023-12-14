import styles from "./FiltersBlock.module.css"
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import NavigationDefaultButton
    from "../NavigationPanel/NavigationButtons/NavigationDefaultButton/NavigationDefaultButton.jsx";
import {useContext, useEffect, useState} from "react";
import BoardContext from "../../context/BoardContext.jsx";

const filterCards = (searchText, listOfData) => {

    if (!searchText) {
        return listOfData.map((data) => {
            // const newContent = data.content.filter((inf) => inf.info.toLowerCase().includes(searchText.toLowerCase()))
            // newContent.map()
            return {
                id: data.id,
                title: data.title,
                content: data.content.map((inf) => {
                    return {
                        id: inf.id,
                        is_visible: true,
                        info: inf.info,
                        marks: inf.marks,
                        task_cover: inf.task_cover,
                        deadline: inf.deadline,
                        task_description: inf.task_description,
                        sub_tasks: inf.sub_tasks,
                        priority : inf.priority,
                        comments: inf.comments,
                    }
                })
            }
        })
    }

    return listOfData.map((data) => {
        // const newContent = data.content.filter((inf) => inf.info.toLowerCase().includes(searchText.toLowerCase()))
        // newContent.map()
        return {
            id: data.id,
            title: data.title,
            content: data.content.map((inf) => {
                return {
                    id: inf.id,
                    is_visible: inf.info.toLowerCase().includes(searchText.toLowerCase()),
                    info: inf.info,
                    marks: inf.marks,
                    task_cover: inf.task_cover,
                    deadline: inf.deadline,
                    task_description: inf.task_description,
                    sub_tasks: inf.sub_tasks,
                    priority : inf.priority,
                    comments: inf.comments,
                }
            })
        }
    })

}

const FiltersBlock = (props) => {

    const [keyWordSearchValue, setKeyWordSearchValue] = useState("")

    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)



    useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredData = filterCards(keyWordSearchValue, clientVisibleData)
            setClientVisibleData(filteredData)
        })

        return () => clearTimeout(Debounce)
    }, [keyWordSearchValue])

    return (
        <NavigationDefaultButton
            customButtonBaseStyle={styles.filtersIcoButton}
            customPopperBaseStyle={styles.filtersPopper}
            popperBtnId={'filters-popper'}
            placement={"bottom"}
            growAnimationStyle={{ transformOrigin: '0 50 0'}}
            clickCloseOutside={false}
            buttonContent={
                <>
                    <span>
                        <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 1C0 0.447715 0.447715 0 1 0H14C14.5523 0 15 0.447715 15 1V1C15 2.10457 14.1046 3 13 3H2C0.89543 3 0 2.10457 0 1V1Z" fill="#002036"/>
                            <path d="M3 6C3 5.44772 3.44772 5 4 5H11C11.5523 5 12 5.44772 12 6V7C12 7.55228 11.5523 8 11 8H4C3.44772 8 3 7.55228 3 7V6Z" fill="#002036"/>
                            <path d="M6 10H9V11.5C9 12.3284 8.32843 13 7.5 13V13C6.67157 13 6 12.3284 6 11.5V10Z" fill="#002036"/>
                        </svg>
                    </span>
                    <span>
                        Фильтры
                    </span>
                </>
            }
        >
            <div className={styles.filtersPopperWrapper}>
                <div className={styles.filtersPopperTitle}>
                    <span >
                        Фильтр
                    </span>
                </div>
                <section className={styles.filtersPopperSection}>
                    <span className={styles.filtersPopperNaming}>
                        Ключевое слово
                    </span>
                    <input
                        value={keyWordSearchValue}
                        onChange={(e) => setKeyWordSearchValue(e.target.value)}

                        className={styles.filtersSearchInput}
                        placeholder={"Введите ключевое слово"}
                    />
                    <span className={styles.filtersPopperNaming}>
                        Поиск карточек
                    </span>
                </section>
                <section  className={styles.filtersPopperSection}>
                    <span className={styles.filtersPopperNaming}>
                        Участники
                    </span>
                    <div className={styles.checkBoxWrapper}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}/>} label="Нет участников" />
                            <FormControlLabel control={<Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}/>} label="Для меня" />
                        </FormGroup>
                    </div>
                </section>
                <section className={styles.filtersPopperSection}>
                    <span className={styles.filtersPopperNaming}>
                        Срок
                    </span>
                    <div className={styles.checkBoxWrapper}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}/>} label="Без даты" />
                            <FormControlLabel control={<Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}/>} label="Просроченные" />
                            <FormControlLabel control={<Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}/>} label="Истекает" />
                            <FormControlLabel control={<Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}/>} label="Выполнено" />
                            <FormControlLabel control={<Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}/>} label="По приоритету" />
                        </FormGroup>
                    </div>
                </section>
                <section className={styles.filtersPopperSection}>
                    <span className={styles.filtersPopperNaming}>
                        Метки
                    </span>
                    <div className={styles.checkBoxWrapper}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}/>} label="Нет меток" />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{ '& + *': { fontSize: '0.9rem' } }}
                                    />
                                }
                                label={
                                    <div style={{background: '#7bbb39'}} className={styles.markStyle}>
                                        <span>
                                            NameTag
                                        </span>
                                    </div>
                                } />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{ '& + *': { fontSize: '0.9rem' } }}
                                    />
                                }
                                label={
                                    <div style={{background: '#cc2525'}} className={styles.markStyle}>

                                    </div>
                                } />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{ '& + *': { fontSize: '0.9rem' } }}
                                    />
                                }
                                label={
                                    <div style={{background: '#32b09c'}} className={styles.markStyle}>

                                    </div>
                                } />
                        </FormGroup>
                    </div>
                </section>
            </div>
        </NavigationDefaultButton>
    )
}

export default FiltersBlock;