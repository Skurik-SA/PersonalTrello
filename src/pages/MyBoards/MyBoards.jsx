import styles from "./MyBoards.module.css"
import SideBar from "../../components/SideBar/SideBar.jsx";
import SearchBoards from "../../components/SearchBoards/SearchBoards.jsx";
import {useState} from "react";
import {useSelector} from "react-redux";

const MyBoards = () => {

    const boards_data = useSelector(state => state.boards.boards_data)
    const [searchText, setSearchText] = useState("")

    let displayedBoards = boards_data.filter((board) => {
        return board.title.toLowerCase().includes(searchText.toLowerCase())
    })
    
    return (
        <div className={styles.mainBase}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <SideBar/>
            </div>
            <div className={styles.mainBaseWrapper}>
                <section className={styles.boardsWrapper_section}>
                    <div className={styles.boards_Header}>
                        <div className={styles.boards_Title}>
                            Доски
                        </div>
                        <div className={styles.boards_boardsControls}>
                            <select className={styles.boards_selector}>
                                <option value={"All"}>Все</option>
                                <option value={"Fav"}>В избранном</option>
                                <option value={"Recent"}>Недавно изменено</option>
                                <option value={"Forgotten"}>Давно не изменялись</option>
                            </select>
                            <SearchBoards value={searchText} onChange={setSearchText}/>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '100%',
                        alignContent: 'center',
                    }}>
                        <div className={styles.boards_List}>
                            {displayedBoards.map((data, index) =>
                                <div key={index} className={styles.boards_boardCard} style={data.fav ? {border: "gold 1px solid", boxShadow: '0px -1px 19px 0px rgba(255, 215, 0, 0.3) inset'} : {}}>
                                    <span>{data.title}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default MyBoards;