

export const LogoOff = (props) => {

    const {
        style,
    } = props

    return (
        <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={style}>
                <rect x="3" y="3" width="3" height="3" fill="#DBA498"/>
                <rect x="9" width="7" height="16" fill="#DBA498"/>
                <rect y="9" width="9" height="7" fill="#DBA498"/>
            </svg>
        </>
    )
}