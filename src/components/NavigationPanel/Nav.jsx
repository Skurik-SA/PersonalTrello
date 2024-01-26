import styles from "./Nav.module.css"
import Search from "../Search/Search.jsx";
import NavigationIconButton from "./NavigationButtons/NavigationIconButton/NavigationIconButton.jsx";
import NavigationDefaultButton from "./NavigationButtons/NavigationDefaultButton/NavigationDefaultButton.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Nav = (props) => {

    const navigate = useNavigate()
    const boards_data = useSelector(state => state.boards.boards_data)

    return (
        <nav>
            <section>
                <NavigationDefaultButton
                    customPopperBaseStyle={styles.customPopperBaseStyleTM}
                    buttonContent={"Task Manager"}
                    popperBtnId={'templates-popper'}
                    isIcon
                >
                    <ul className={styles.navUl}>
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Task Manager
                            </button>
                        </li >
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Task Manager
                            </button>
                        </li>
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Task Manager
                            </button>
                        </li>
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Task Manager
                            </button>
                        </li>
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Task Manager
                            </button>
                        </li>
                    </ul>


                </NavigationDefaultButton>

                <NavigationDefaultButton
                    customPopperBaseStyle={styles.customPopperBaseStyleBoards}
                    buttonContent={"Доски"}
                    popperBtnId={'boards-popper'}
                >
                    <ul className={styles.navUl}>
                        <li className={styles.navLi}>
                            {boards_data.map((data, index) =>
                                <button key={index} className={styles.singlePoint} onClick={() => navigate('/my-boards')}>
                                    {data.title}
                                </button>
                            )}
                        </li>
                    </ul>
                </NavigationDefaultButton>

                <NavigationDefaultButton
                    customPopperBaseStyle={styles.customPopperBaseStyleFavorites}
                    buttonContent={"Избранное"}
                    popperBtnId={'favorites-popper'}
                >
                    <ul className={styles.navUl}>
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Избранное
                            </button>
                        </li>
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Мега избранное
                            </button>
                        </li>
                    </ul>
                </NavigationDefaultButton>

                <NavigationDefaultButton
                    customPopperBaseStyle={styles.customPopperBaseStyleTemplates}
                    buttonContent={"Шаблоны"}
                    popperBtnId={'templates-popper'}
                >
                    <ul className={styles.navUl}>
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Шаблон 1
                            </button>
                        </li>
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Шаблон 2
                            </button>
                        </li>
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Шаблон 3
                            </button>
                        </li>
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Шаблон 4
                            </button>
                        </li>
                        <li className={styles.navLi}>
                            <button className={styles.singlePoint}>
                                Шаблон 5
                            </button>
                        </li>
                    </ul>

                </NavigationDefaultButton>

                <NavigationDefaultButton
                    customPopperBaseStyle={styles.customPopperBaseStyleCreate}
                    customButtonBaseStyle={styles.customButtonBaseStyle}
                    buttonContent={"Создать"}
                    popperBtnId={'create-popper'}
                >
                    <ul className={styles.navUl}>
                        <li className={styles.navLi}>
                            <button className={styles.doublePointButton}>
                                <div>
                                    Создать новую доску
                                </div>
                                <div className={styles.descriptionCard}>
                                    Доска представляет собой совокупность карточек, упорядоченных в списках.
                                    Используйте её для управления проектом, отслеживании или организации чего угодно.
                                </div>
                            </button>
                        </li>
                        <li className={styles.navLi}>
                            <button className={styles.doublePointButton}>
                                <div>
                                    Начать с шаблона
                                </div>
                                <div className={styles.descriptionCard}>
                                    Начните работу быстрее, используя шаблон доски.
                                </div>
                            </button>
                        </li>
                        <li className={styles.navLi}>
                            <button className={styles.doublePointButton}>
                                <div>
                                    Создать проект
                                </div>
                                <div className={styles.descriptionCard}>
                                    Проект представляет собой пространство для группы нескольких пользователей,
                                    предназначенный для совместной работы.
                                </div>
                            </button>
                        </li>
                    </ul>
                </NavigationDefaultButton>
            </section>
            <section>
                <Search/>
                <NavigationIconButton/>
            </section>
        </nav>
    )
}

export default Nav;