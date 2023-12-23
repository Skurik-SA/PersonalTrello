import styles from "./Search.module.css"
import PropTypes from "prop-types";

const Search = (props) => {

    const {
        value,
        onChange,
    } = props

    return (
        <div>
            <div className={styles.searchWrapper}>
                <div className={styles.searchIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 23 23" fill="none">
                        <circle cx="14" cy="9" r="8" stroke="#DBA498" strokeWidth="2"/>
                        <line x1="1.5845" y1="21.5871" x2="8.57181" y2="14.5871" stroke="#DBA498" strokeWidth="4"/>
                    </svg>
                </div>
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={styles.searchInputNew}
                    placeholder={"Поиск..."}
                />
            </div>
        </div>
    )
}

Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default Search;