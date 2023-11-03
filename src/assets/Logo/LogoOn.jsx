export const LogoOn = (props) => {

    const {
        style,
    } = props

    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={style}>
            <rect width="6" height="6" fill="#DBA498"/>
            <rect x="7" width="9" height="16" fill="#DBA498"/>
            <rect y="7" width="7" height="9" fill="#DBA498"/>
        </svg>
    )
}