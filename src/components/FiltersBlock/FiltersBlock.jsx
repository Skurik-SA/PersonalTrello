import styles from "./FiltersBlock.module.css"
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import NavigationDefaultButton
    from "../NavigationPanel/NavigationButtons/NavigationDefaultButton/NavigationDefaultButton.jsx";
import {useContext, useEffect, useState} from "react";
import BoardContext from "../../context/BoardContext.jsx";
import {useSelector} from "react-redux";
import {DONE, FAILED, SOON_EXPIRE} from "../../utils/StatusConstants.js";

const filterCards = (
    filterInterface,
    searchText,
    listOfData
) => {

    const filterFunction = (
        cont
    ) => {
        let res = true

        if (filterInterface.byText) {
            res = cont.info.toLowerCase().includes(searchText.toLowerCase())
        }

        if (filterInterface.isNoDates) {
            res = res && !cont.deadline.dateJsFormatDate
        }

        if (filterInterface.isDone) {
            res = res && cont.deadline.type === DONE
        }
        // not working
        if (filterInterface.isSoonExpired) {
            res = res && cont.deadline.type === SOON_EXPIRE
        }

        if (filterInterface.isExpired) {
            res = res && cont.deadline.type === FAILED
        }

        if (filterInterface.isNoDates && filterInterface.isDone && filterInterface.isSoonExpired && filterInterface.isExpired) {
            res = res || cont.deadline.type === DONE || cont.deadline.type === SOON_EXPIRE || cont.deadline.type === FAILED
        }

        return {
            id: cont.id,
            is_visible: res,
            info: cont.info,
            marks: cont.marks,
            task_cover: cont.task_cover,
            deadline: cont.deadline,
            task_description: cont.task_description,
            sub_tasks: cont.sub_tasks,
            priority : cont.priority,
            comments: cont.comments,
        }
    }

    // if (!searchText) {
    //     return listOfData.map((data) => {
    //         // const newContent = data.content.filter((inf) => inf.info.toLowerCase().includes(searchText.toLowerCase()))
    //         // newContent.map()
    //         return {
    //             id: data.id,
    //             title: data.title,
    //             content: data.content.map((inf) => {
    //                 return {
    //                     id: inf.id,
    //                     is_visible: true,
    //                     info: inf.info,
    //                     marks: inf.marks,
    //                     task_cover: inf.task_cover,
    //                     deadline: inf.deadline,
    //                     task_description: inf.task_description,
    //                     sub_tasks: inf.sub_tasks,
    //                     priority : inf.priority,
    //                     comments: inf.comments,
    //                 }
    //             })
    //         }
    //     })
    // }

    return listOfData.map((data) => {
        // const newContent = data.content.filter((inf) => inf.info.toLowerCase().includes(searchText.toLowerCase()))
        // newContent.map()
        return {
            id: data.id,
            title: data.title,
            content: data.content.map((cont) => {
                return filterFunction(cont)
                // return {
                //     id: inf.id,
                //     is_visible: filterFunction(inf.info.toLowerCase().includes(searchText.toLowerCase())),
                //     info: inf.info,
                //     marks: inf.marks,
                //     task_cover: inf.task_cover,
                //     deadline: inf.deadline,
                //     task_description: inf.task_description,
                //     sub_tasks: inf.sub_tasks,
                //     priority : inf.priority,
                //     comments: inf.comments,
                // }
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

    useEffect(() => {
        const Debounce = setTimeout(() => {

            const filteredData = filterCards(filterInterface, keyWordSearchValue, clientVisibleData)
            setClientVisibleData(filteredData)
        }, 300)

        return () => clearTimeout(Debounce)
    }, [filterInterface, keyWordSearchValue])

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
                        onChange={(e) => {
                            setKeyWordSearchValue(e.target.value)
                            if (keyWordSearchValue !== "") {
                                setFilterInterface({
                                    byText: true,
                                    isNoDates: filterInterface.isNoDates,
                                    isExpired: filterInterface.isExpired,
                                    isSoonExpired: filterInterface.isSoonExpired,
                                    isDone: filterInterface.isDone,
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
                                            isPriority: filterInterface.isPriority,
                                            byMarks: filterInterface.byMarks,
                                        })}
                                    />
                                }
                                label="Без даты" />
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
                            {/*<FormControlLabel*/}
                            {/*    control={*/}
                            {/*        <Checkbox*/}
                            {/*            sx={{ '& + *': { fontSize: '0.9rem' } }}*/}
                            {/*        />*/}
                            {/*    }*/}
                            {/*    label={*/}
                            {/*        <div style={{background: '#7bbb39'}} className={styles.markStyle}>*/}
                            {/*            <span>*/}
                            {/*                NameTag*/}
                            {/*            </span>*/}
                            {/*        </div>*/}
                            {/*    } />*/}
                            {/*<FormControlLabel*/}
                            {/*    control={*/}
                            {/*        <Checkbox*/}
                            {/*            sx={{ '& + *': { fontSize: '0.9rem' } }}*/}
                            {/*        />*/}
                            {/*    }*/}
                            {/*    label={*/}
                            {/*        <div style={{background: '#cc2525'}} className={styles.markStyle}>*/}

                            {/*        </div>*/}
                            {/*    } />*/}
                            {/*<FormControlLabel*/}
                            {/*    control={*/}
                            {/*        <Checkbox*/}
                            {/*            sx={{ '& + *': { fontSize: '0.9rem' } }}*/}
                            {/*        />*/}
                            {/*    }*/}
                            {/*    label={*/}
                            {/*        <div style={{background: '#32b09c'}} className={styles.markStyle}>*/}

                            {/*        </div>*/}
                            {/*    } />*/}
                        </FormGroup>
                    </div>
                </section>
            </div>
        </NavigationDefaultButton>
    )
}

export default FiltersBlock;