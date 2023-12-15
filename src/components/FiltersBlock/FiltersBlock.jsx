import styles from "./FiltersBlock.module.css"
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import NavigationDefaultButton
    from "../NavigationPanel/NavigationButtons/NavigationDefaultButton/NavigationDefaultButton.jsx";
import {useContext, useEffect, useState} from "react";
import BoardContext from "../../context/BoardContext.jsx";
import {useSelector} from "react-redux";
import {DONE, FAILED, NOT_DONE, SOON_EXPIRE, UNSET} from "../../utils/StatusConstants.js";
import {cloneDeep} from "lodash-es";

const filterCards = (
    filterInterface,
    searchText,
    listOfData
) => {

    const filterFunction = (
        cont
    ) => {
        let res = true
        console.log("asdasd")
        const datesFilters = () => {
            console.log("Первое вхождение")

            if (filterInterface.isNoDates || filterInterface.isNotDone || filterInterface.isDone || filterInterface.isExpired || filterInterface.isSoonExpired) {
                console.log("Второе вхождение")

                if (filterInterface.isNoDates && !cont.deadline.dateJsFormatDate) {
                    console.log("Вхождение без дат")

                    return true
                }

                if (filterInterface.isDone && cont.deadline.type === DONE) {
                    console.log("Вхождение завершено")

                    return true
                }

                if (filterInterface.isExpired && cont.deadline.type === FAILED) {
                    console.log("Вхождение просрочено")


                    return true
                }

                if (filterInterface.isSoonExpired && cont.deadline.type === SOON_EXPIRE) {
                    console.log("Вхождение скоро истекает")

                    return true
                }

                if (filterInterface.isNotDone && cont.deadline.type === NOT_DONE) {
                    console.log("Вхождение не завершено")

                    return true
                }
            }

            return false
        }

        const datesVar = datesFilters()

        if (searchText) {
            if (datesVar) {
                res = cont.info.toLowerCase().includes(searchText.toLowerCase()) && datesVar
            }
            else {
                res = cont.info.toLowerCase().includes(searchText.toLowerCase())
            }
        }
        else {
            if (filterInterface.isNoDates || filterInterface.isNotDone || filterInterface.isDone || filterInterface.isExpired || filterInterface.isSoonExpired) {
                res = datesVar
            }
            else {
                res = true
            }
        }

        const filteredContent = cloneDeep(cont)
        filteredContent.is_visible = res

        return filteredContent
    }

    return listOfData.map((data) => {
        return {
            id: data.id,
            title: data.title,
            content: data.content.map((cont) => {
                return filterFunction(cont)
            })
        }
    })

}

const FiltersBlock = (props) => {

    const marks = useSelector(state => state.todolist.mark_store)

    const [keyWordSearchValue, setKeyWordSearchValue] = useState("")

    const [filterInterface, setFilterInterface] = useState({
        byText: false,
        isNoDates: false,
        isExpired: false,
        isSoonExpired: false,
        isDone: false,
        isNotDone: false,
        isPriority: false,
        byMarks: false,
    })

    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)

    const [filtersByMarks, setFiltersByMarks] = useState([])

    const addMarkToFilters = (newFilteredMark) => {
        setFiltersByMarks([...filtersByMarks, newFilteredMark])
    }

    const deleteMarkFromFilters = (deletedFilteredMark) => {
        setFiltersByMarks([...filtersByMarks.filter((mark) => mark !== deletedFilteredMark)])
    }

    const clearFilters = () => {
        setFilterInterface({
            byText: false,
            isNoDates: false,
            isExpired: false,
            isSoonExpired: false,
            isDone: false,
            isNotDone: false,
            isPriority: false,
            byMarks: false,
        })
        setKeyWordSearchValue("")
    }

    useEffect(() => {
        const Debounce = setTimeout(() => {

            const filteredData = filterCards(filterInterface, keyWordSearchValue, clientVisibleData)
            setClientVisibleData(filteredData)
        })

        return () => clearTimeout(Debounce)
    }, [filterInterface, keyWordSearchValue, setClientVisibleData])

    return (
        <NavigationDefaultButton
            customButtonBaseStyle={styles.filtersIcoButton}
            customPopperBaseStyle={styles.filtersPopper}
            popperBtnId={'filters-popper'}
            placement={"bottom-end"}
            growAnimationStyle={{ transformOrigin: '0 50 0'}}
            clickCloseOutside={false}
            buttonContent={
                <>
                    <div className={styles.filtersSpanButton}>
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
                    </div>
                    <button
                        className={styles.clearButton}
                        onClick={(e) => {
                            e.stopPropagation()
                            clearFilters()
                        }}
                        style={
                            filterInterface.isDone ||
                            filterInterface.isNoDates ||
                            filterInterface.isExpired ||
                            filterInterface.byMarks ||
                            filterInterface.isSoonExpired ||
                            filterInterface.isNotDone ||
                            keyWordSearchValue ?
                                {}
                                :
                                {display: 'none'}
                        }
                    >
                        <span >
                            Очистить x
                        </span>
                    </button>

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
                        onChange={(e) => {
                            setKeyWordSearchValue(e.target.value)
                            if (keyWordSearchValue !== "") {
                                setFilterInterface({
                                    byText: true,
                                    isNoDates: filterInterface.isNoDates,
                                    isExpired: filterInterface.isExpired,
                                    isSoonExpired: filterInterface.isSoonExpired,
                                    isDone: filterInterface.isDone,
                                    isNotDone: filterInterface.isNotDone,
                                    isPriority: filterInterface.isPriority,
                                    byMarks: filterInterface.byMarks,
                                })
                            }
                            else {
                                setFilterInterface({
                                    byText: false,
                                    isNoDates: filterInterface.isNoDates,
                                    isExpired: filterInterface.isExpired,
                                    isSoonExpired: filterInterface.isSoonExpired,
                                    isDone: filterInterface.isDone,
                                    isNotDone: filterInterface.isNotDone,
                                    isPriority: filterInterface.isPriority,
                                    byMarks: filterInterface.byMarks,
                                })
                            }
                        }}

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
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}
                                        checked={filterInterface.isNoDates}
                                        onChange={(e) => setFilterInterface({
                                            byText: filterInterface.byText,
                                            isNoDates: e.target.checked,
                                            isExpired: filterInterface.isExpired,
                                            isSoonExpired: filterInterface.isSoonExpired,
                                            isDone: filterInterface.isDone,
                                            isNotDone: filterInterface.isNotDone,
                                            isPriority: filterInterface.isPriority,
                                            byMarks: filterInterface.byMarks,
                                        })}
                                    />
                                }
                                label="Без даты" />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}
                                              checked={filterInterface.isNotDone}
                                              onChange={(e) => setFilterInterface({
                                                  byText: filterInterface.byText,
                                                  isNoDates: filterInterface.isNoDates,
                                                  isExpired: filterInterface.isExpired,
                                                  isSoonExpired: filterInterface.isSoonExpired,
                                                  isDone: filterInterface.isDone,
                                                  isNotDone: e.target.checked,
                                                  isPriority: filterInterface.isPriority,
                                                  byMarks: filterInterface.byMarks,
                                              })}
                                    />
                                }
                                label="Истекает не скоро" />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}
                                        checked={filterInterface.isExpired}
                                        onChange={(e) => setFilterInterface({
                                            byText: filterInterface.byText,
                                            isNoDates: filterInterface.isNoDates,
                                            isExpired: e.target.checked,
                                            isSoonExpired: filterInterface.isSoonExpired,
                                            isDone: filterInterface.isDone,
                                            isNotDone: filterInterface.isNotDone,
                                            isPriority: filterInterface.isPriority,
                                            byMarks: filterInterface.byMarks,
                                        })}
                                    />
                                }
                                label="Просроченные" />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}
                                        checked={filterInterface.isSoonExpired}
                                        onChange={(e) => setFilterInterface({
                                            byText: filterInterface.byText,
                                            isNoDates: filterInterface.isNoDates,
                                            isExpired: filterInterface.isExpired,
                                            isSoonExpired: e.target.checked,
                                            isDone: filterInterface.isDone,
                                            isNotDone: filterInterface.isNotDone,
                                            isPriority: filterInterface.isPriority,
                                            byMarks: filterInterface.byMarks,
                                        })}
                                    />
                                }
                                label="Истекает" />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}
                                        checked={filterInterface.isDone}
                                        onChange={(e) => setFilterInterface({
                                            byText: filterInterface.byText,
                                            isNoDates: filterInterface.isNoDates,
                                            isExpired: filterInterface.isExpired,
                                            isSoonExpired: filterInterface.isSoonExpired,
                                            isDone: e.target.checked,
                                            isNotDone: filterInterface.isNotDone,
                                            isPriority: filterInterface.isPriority,
                                            byMarks: filterInterface.byMarks,
                                        })}
                                    />
                                }
                                label="Выполнено" />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}
                                        checked={filterInterface.isPriority}
                                        onChange={(e) => setFilterInterface({
                                            byText: filterInterface.byText,
                                            isNoDates: filterInterface.isNoDates,
                                            isExpired: filterInterface.isExpired,
                                            isSoonExpired: filterInterface.isSoonExpired,
                                            isDone: filterInterface.isDone,
                                            isNotDone: filterInterface.isNotDone,
                                            isPriority: e.target.checked,
                                            byMarks: filterInterface.byMarks,
                                        })}
                                    />
                                }
                                label="По приоритету" />
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
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                {marks && marks.map((mark, index) =>
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                sx={{ '& + *': { fontSize: '0.9rem' } }}
                                            />
                                        }
                                        label={
                                            <div style={{background: mark.color, color: mark.font_color}} className={styles.markStyle}>
                                                <div  className={styles.markStyleSpan}>
                                                    {mark.mark_text}
                                                </div>
                                            </div>
                                        } />
                                )}
                            </div>
                        </FormGroup>
                    </div>
                </section>
            </div>
        </NavigationDefaultButton>
    )
}

export default FiltersBlock;