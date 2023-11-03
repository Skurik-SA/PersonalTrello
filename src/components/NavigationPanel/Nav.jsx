import styles from "./Nav.module.css"
import Search from "../Search/Search.jsx";
import NavigationIconButton from "./NavigationButtons/NavigationIconButton/NavigationIconButton.jsx";
import NavigationDefaultButton from "./NavigationButtons/NavigationDefaultButton/NavigationDefaultButton.jsx";

const Nav = (props) => {
    return (
        <nav>
            <section>
                <NavigationDefaultButton
                    customPopperBaseStyle={styles.customPopperBaseStyleTM}
                    buttonContent={"Task Manager"}
                    popperBtnId={'templates-popper'}
                    isIcon
                >
                    <div>
                        Task Manager
                    </div>
                    <div>
                        Task Manager
                    </div>
                    <div>
                        Task Manager
                    </div>
                    <div>
                        Task Manager
                    </div>
                    <div>
                        Task Manager
                    </div>
                    <div>
                        Task Manager
                    </div>
                </NavigationDefaultButton>

                <NavigationDefaultButton
                    customPopperBaseStyle={styles.customPopperBaseStyleBoards}
                    buttonContent={"Доски"}
                    popperBtnId={'boards-popper'}
                >
                    <div>
                        Доски
                    </div>
                </NavigationDefaultButton>

                <NavigationDefaultButton
                    customPopperBaseStyle={styles.customPopperBaseStyleFavorites}
                    buttonContent={"Избранное"}
                    popperBtnId={'favorites-popper'}
                >
                    <div>
                        Избранное
                    </div>
                </NavigationDefaultButton>

                <NavigationDefaultButton
                    customPopperBaseStyle={styles.customPopperBaseStyleTemplates}
                    buttonContent={"Шаблоны"}
                    popperBtnId={'templates-popper'}
                >
                    <div>
                        Шаблоны
                    </div>
                </NavigationDefaultButton>

                <NavigationDefaultButton
                    customPopperBaseStyle={styles.customPopperBaseStyleCreate}
                    customButtonBaseStyle={styles.customButtonBaseStyle}
                    buttonContent={"Создать"}
                    popperBtnId={'create-popper'}
                >
                    <div>
                        Создать
                    </div>
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