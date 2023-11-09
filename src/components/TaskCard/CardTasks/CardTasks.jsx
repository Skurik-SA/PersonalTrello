import styles from "./CardTasks.module.css"

const CardTasks = (props) => {

    const {
        task,
        boba2,
        biba2,
        gref2
    } = props

    return (
        <li className={styles.taskContents} {...boba2} {...biba2} ref={gref2}>
            <div className={styles.taskWrapper}>
                <div className={styles.taskText}>
                    {task.info}
                </div>
                <button className={styles.editTaskButton}>
                    <span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.706004" width="11.0543" height="2.98189" transform="matrix(0.706004 -0.708208 0.706004 0.708208 2.88603 9.03698)" stroke="#DBA498"/>
                            <path d="M1.57791 12.417L2.10495 9.14641L4.8383 11.8883L1.57791 12.417Z" fill="#DBA498"/>
                        </svg>
                    </span>
                </button>
            </div>
        </li>
    )
}

export default CardTasks;