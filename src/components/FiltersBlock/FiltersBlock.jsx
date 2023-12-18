import styles from "./FiltersBlock.module.css"
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import NavigationDefaultButton
    from "../NavigationPanel/NavigationButtons/NavigationDefaultButton/NavigationDefaultButton.jsx";
import {useContext, useEffect, useState} from "react";
import BoardContext from "../../context/BoardContext.jsx";
import {useSelector} from "react-redux";
import {DONE, FAILED, NOT_DONE, SOON_EXPIRE} from "../../utils/StatusConstants.js";
import {cloneDeep} from "lodash-es";

const filterCards = (
    filterInterface,
    filtersByMarks,
    searchText,
    listOfData
) => {

    const filterFunction = (
        cont
    ) => {
        console.log(filterInterface.byMarks)

        const datesFilters = () => {
            if (filterInterface.isNoDates && !cont.deadline.dateJsFormatDate) {

                return true
            }

            if (filterInterface.isDone && cont.deadline.type === DONE) {

                return true
            }

            if (filterInterface.isExpired && cont.deadline.type === FAILED) {

                return true
            }

            if (filterInterface.isSoonExpired && cont.deadline.type === SOON_EXPIRE) {

                return true
            }

            if (filterInterface.isNotDone && cont.deadline.type === NOT_DONE) {

                return true
            }

            if (filterInterface.isMarks && cont.marks.length === 0) {
                return true
            }

            if (filtersByMarks.length > 0) {
                // console.log("Вошёл")
                return filtersByMarks.some((index) => {
                    for (let i = 0; i < cont.marks.length; i++) {
                        if (index.id === cont.marks[i].id)
                            return true
                    }
                })
            }

            if (searchText) {
                return cont.info.toLowerCase().includes(searchText.toLowerCase())
            }

            return !filterInterface.isNoDates &&
                   !filterInterface.isExpired &&
                   !filterInterface.isSoonExpired &&
                   !filterInterface.isDone &&
                   !filterInterface.isNotDone &&
                   !filterInterface.isPriority &&
                   !filterInterface.isMarks;

        }

        const filteredContent = cloneDeep(cont)
        filteredContent.is_visible = datesFilters()

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

const FiltersBlock = () => {

    const marks = useSelector(state => state.todolist.mark_store)
    const {
        clientVisibleData,
        setClientVisibleData
    } = useContext(BoardContext)

    const [keyWordSearchValue, setKeyWordSearchValue] = useState("")
    const [filtersByMarks, setFiltersByMarks] = useState([])
    const [filterInterface, setFilterInterface] = useState({
        byText: false,
        isNoDates: false,
        isExpired: false,
        isSoonExpired: false,
        isDone: false,
        isNotDone: false,
        isPriority: false,
        isMarks: false,
    })

    const actionHandler = (actioned_mark) => {
        const markId = filtersByMarks.some((f_mark) => f_mark.id === actioned_mark.id)

        if (markId) {
            setFiltersByMarks(prev =>
                [...prev.filter((mark) => mark.id !== actioned_mark.id)]
            )
        }
        else {
            setFiltersByMarks(prev =>
                [...prev, actioned_mark]
            )
        }
    }

    const clearFilters = () => {
        setKeyWordSearchValue("")
        setFiltersByMarks([])
        setFilterInterface({
            byText: false,
            isNoDates: false,
            isExpired: false,
            isSoonExpired: false,
            isDone: false,
            isNotDone: false,
            isPriority: false,
            isMarks: false,
        })
    }

    useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredData = filterCards(filterInterface, filtersByMarks, keyWordSearchValue, clientVisibleData)
            setClientVisibleData(filteredData)
        })

        return () => clearTimeout(Debounce)
    }, [filterInterface, filtersByMarks, setFilterInterface, keyWordSearchValue, setClientVisibleData])

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
                            filterInterface.isSoonExpired ||
                            filterInterface.isNotDone ||
                            filterInterface.isMarks ||
                            filterInterface.isPriority ||
                            filtersByMarks.length > 0 ||
                            keyWordSearchValue ?
                                {}
                                :
                                {display: 'none'}
                        }
                    >
                        <span>
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
                                setFilterInterface(prev => (
                                    {
                                        ...prev,
                                        byText: true
                                    }
                                ))
                            }
                            else {
                                setFilterInterface(prev => (
                                    {
                                        ...prev,
                                        byText: false
                                    }
                                ))
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
                                                onChange={(e) =>
                                                    setFilterInterface(prev => (
                                                    {
                                                        ...prev,
                                                        isNoDates: e.target.checked
                                                    }
                                                ))}
                                    />
                                }
                                label="Без даты" />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}
                                              checked={filterInterface.isNotDone}
                                              onChange={(e) =>
                                                  setFilterInterface(prev => (
                                                  {
                                                      ...prev,
                                                      isNotDone: e.target.checked
                                                  }
                                              ))}
                                    />
                                }
                                label="Истекает не скоро" />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}
                                              checked={filterInterface.isExpired}
                                              onChange={(e) =>
                                                  setFilterInterface(prev => (
                                                      {
                                                          ...prev,
                                                          isExpired: e.target.checked
                                                      }
                                              ))}
                                    />
                                }
                                label="Просроченные" />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}
                                              checked={filterInterface.isSoonExpired}
                                              onChange={(e) =>
                                                  setFilterInterface(prev => (
                                                      {
                                                          ...prev,
                                                          isSoonExpired: e.target.checked
                                                      }
                                              ))}
                                    />
                                }
                                label="Истекает" />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}
                                              checked={filterInterface.isDone}
                                              onChange={(e) =>
                                                  setFilterInterface(prev => (
                                                      {
                                                          ...prev,
                                                          isDone: e.target.checked
                                                      }
                                              ))}
                                    />
                                }
                                label="Выполнено" />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ '& + *': { fontSize: '0.9rem' } }}
                                              checked={filterInterface.isPriority}
                                              onChange={(e) =>
                                                  setFilterInterface(prev => (
                                                      {
                                                          ...prev,
                                                          isPriority: e.target.checked
                                                      }
                                              ))}
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{ '& + *': { fontSize: '0.9rem' } }}
                                        checked={filterInterface.isMarks}
                                        onChange={(e) => {
                                            setFilterInterface(prev => (
                                                {
                                                    ...prev,
                                                    isMarks: e.target.checked,
                                                }
                                            ))
                                            setFiltersByMarks([])
                                        }}
                                    />
                                }
                                label="Нет меток"
                            />
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                {marks && marks.map((mark, index) =>
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                checked={filtersByMarks.some((index) => index === mark)}
                                                sx={{ '& + *': { fontSize: '0.9rem' } }}
                                                onClick={() => {
                                                    setFilterInterface(prev => (
                                                        {
                                                            ...prev,
                                                            isMarks: false,
                                                        }
                                                    ))
                                                    actionHandler(mark)
                                                }}
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