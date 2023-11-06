import styles from "../styles/AuthPages.module.css"
import {LogoOn} from "../../../assets/Logo/LogoOn.jsx";
import {useNavigate} from "react-router-dom";

const RegistrationPage = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.authWrapper}>
            <div className={styles.authContentWrapper}>
                <section className={styles.authSection}>
                    <div className={styles.logoBase}>
                        <LogoOn/> TaskManager
                    </div>
                    <div>
                        Зарегистрируйтесь, чтобы продолжить
                    </div>
                    <div className={styles.authMidBase}>
                        <form className={styles.authForm}>
                            <input placeholder="Email" type='email' className={styles.authInput}/>
                            <input placeholder="Пароль" type='password' className={styles.authInput}/>
                            <input placeholder="Повторите пароль" type='password' className={styles.authInput}/>
                            <button className={styles.authButton} onClick={(e) => {
                                e.preventDefault()
                            }}>
                                Продолжить
                            </button>
                        </form>
                    </div>
                    или
                    <div className={styles.authDownBase}>
                        <button className={styles.authOAuthButton}>
                            Войти с помощью 1
                        </button>
                        <button className={styles.authOAuthButton}>
                            Войти с помощью 2
                        </button>
                        <div>
                           <span
                               className={styles.authLink}
                               onClick={() => {
                                   navigate('/login')
                               }}>
                                Уже есть аккаунт? Войти
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default RegistrationPage;