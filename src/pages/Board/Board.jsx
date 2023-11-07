import styles from "./Boards.module.css"
import SideBar from "../../components/SideBar/SideBar.jsx";
import CardBase from "../../components/TaskCard/CardBase/CardBase.jsx";
import {useState} from "react";
import ScrollContainer from "react-indiana-drag-scroll";

const Board = () => {

    let data = [
        {
            title: 'Хуета',
            content: ['Зачем','ты','паришься','Плохое','точно','сбудется','Погода','поменяется','И','все','переобуются','Даже','если','не','верить','слухам','Твои','выдумки','вскроются','Вроде','бы','даже','дом','есть','Так','почему','живу','на','улице','Хочу','пройти','Москву','Мне','нужен','новый','уровень','Но','щас','приходится','надумывать','Убегать','и','трахаться','Мерзнуть','и','сутулиться']

        },
        {
            title: 'Залупная',
            content: ['Пупа', 'Пришла', 'за', 'Лупой', 'а', 'Лупа', 'Пришла', 'Пупой'],
        },
        {
            title: 'Пиздец',
            content: ['Пизда пришла за Лупой, а тут понаписано куча хуйни', 'А мытая лупа пришла за пиздой и хуем, чтоб смачно так отсосать, ну и пиздец же она сосёт. Ну хуйня это веб, я так заебался его писать :('],
        },
        {
            title: 'Залупная',
            content: ['Залупа', 'Пупа'],
        },
        {
            title: 'Пиздец',
            content: ['Пизда', 'Мытая'],
        },
        {
            title: 'Залупная',
            content: ['Чтобы','просто','все','забили','на','чувства','Не','ценили','искусство','Особенный','возраст','нет','Им','не','было','грустно','Поцелуи','укусы','Танцуют','что','в','усмерть','Перезагрузка','Перезабить','притупившиеся','мысли','Чтоб','тучи','нависли','Бессмысленным','сгустком','грузом','Просто','забили','на','чувства','Понимали','всех','плоско','понимали','все','тускло'],
        },
        {
            title: 'Пиздец',
            content: ['Пизда', 'Мытая'],
        },
        {
            title: 'Залупная',
            content: ['Залупа', 'Пупа'],
        },
        {
            title: 'Пиздец',
            content: ['Пизда', 'Мытая'],
        },
        {
            title: 'Пиздец',
            content: ['Пизда', 'Мытая'],
        },
        {
            title: 'Залупная',
            content: ['Залупа', 'Пупа'],
        },
        {
            title: 'Пиздец',
            content: ['Пизда', 'Мытая'],
        },
        {
            title: 'Пиздец',
            content: ['Пизда', 'Мытая'],
        },
        {
            title: 'Пиздец',
            content: ['Пизда', 'Мытая'],
        },
        {
            title: 'Залупная',
            content: ['Залупа', 'Пупа'],
        },
        {
            title: 'Пиздец',
            content: ['Пизда', 'Мытая'],
        }
    ]


    const [inVal, setInVal] = useState("Task Board For Study")

    return (
        <>
            <div style={{display: 'flex', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <SideBar/>
                </div>
                <div className={styles.mainBaseWrapper}>
                    {/*ToolBar*/}
                    <div className={styles.toolBar}>
                        <div className={styles.toolBar_contentLeft}>
                            <div style={{display:'flex'}}>
                                <input id={"booba"}
                                       style={{width: 'auto'}}
                                       value={inVal}
                                       maxLength={127}
                                       className={styles.boardTitleInput}
                                       placeholder={"Введите название доски"}
                                       onChange={(e) => {
                                           setInVal(e.target.value)
                                           document.getElementById("booba").style.width = (e.target.value.length + 5) * 9 + 'px'

                                       }}
                                       onBlur={(e) => {
                                           e.target.setSelectionRange(0, 0)
                                           if (inVal.length <= 0) {
                                               document.getElementById("booba").style.minWidth = '200px'
                                           }
                                           else {
                                               document.getElementById("booba").style.minWidth = 'unset'
                                           }
                                       }}
                                       onKeyDown={(e) => {
                                           if (e.key === 'Enter') {
                                               document.getElementById("booba").blur()
                                           }
                                       }}
                                />
                                <button style={{background: 'transparent'}}>
                                    <span>
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.5 1.35573L9.16615 4.73173L9.30576 5.01459L9.61792 5.05995L13.3435 5.60132L10.6477 8.22916L10.4218 8.44934L10.4751 8.76024L11.1115 12.4708L7.7792 10.7189L7.5 10.5721L7.2208 10.7189L3.88849 12.4708L4.5249 8.76024L4.57823 8.44934L4.35234 8.22916L1.65645 5.60132L5.38208 5.05995L5.69424 5.01459L5.83385 4.73173L7.5 1.35573Z" stroke="#002036" strokeWidth="1.2"/>
                                        </svg>
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.5 0L9.7042 4.46619L14.6329 5.18237L11.0665 8.65881L11.9084 13.5676L7.5 11.25L3.09161 13.5676L3.93354 8.65881L0.367076 5.18237L5.2958 4.46619L7.5 0Z" fill="#002036"/>
                                        </svg>
                                    </span>
                                </button>
                                <div>
                                    <button style={{background: 'transparent'}}>
                                        <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="6.5" width="12" height="8" stroke="#002036"/>
                                            <path d="M9.5 3.5V6.5H3.5V3.5C3.5 1.84315 4.84315 0.5 6.5 0.5C8.15685 0.5 9.5 1.84315 9.5 3.5Z" stroke="#002036"/>
                                            <rect x="5" y="9" width="3" height="3" fill="#002036"/>
                                        </svg>

                                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="7.5" width="13" height="8" rx="4" stroke="#002036"/>
                                            <circle cx="7" cy="4" r="3.5" stroke="#002036"/>
                                            <ellipse cx="5.5" cy="4" rx="0.5" ry="1" fill="#002036"/>
                                            <ellipse cx="8.5" cy="4" rx="0.5" ry="1" fill="#002036"/>
                                            <ellipse cx="7" cy="11" rx="3" ry="1" fill="#002036"/>
                                        </svg>

                                        PrivateIco

                                    </button>
                                </div>
                            </div>


                        </div>

                        <div className={styles.toolBar_contentRight}>
                            <div>
                                <button style={{background: 'transparent'}}>
                                    <span>
                                        <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 1C0 0.447715 0.447715 0 1 0H14C14.5523 0 15 0.447715 15 1V1C15 2.10457 14.1046 3 13 3H2C0.89543 3 0 2.10457 0 1V1Z" fill="#002036"/>
                                            <path d="M3 6C3 5.44772 3.44772 5 4 5H11C11.5523 5 12 5.44772 12 6V7C12 7.55228 11.5523 8 11 8H4C3.44772 8 3 7.55228 3 7V6Z" fill="#002036"/>
                                            <path d="M6 10H9V11.5C9 12.3284 8.32843 13 7.5 13V13C6.67157 13 6 12.3284 6 11.5V10Z" fill="#002036"/>
                                        </svg>
                                    </span>
                                    Фильтры
                                </button>
                            </div>
                            <div>
                                Share
                            </div>
                            <div>
                                OneMoreMenu
                            </div>
                        </div>
                    </div>
                    {/*CardList*/}
                    <div className={styles.cardList} >
                        <ScrollContainer
                            horizontal={true}
                            vertical={false}
                            hideScrollbars={false}
                            style={{display: 'flex', top: '0', left: 0, marginRight: '0'}}
                            ignoreElements={"li"}
                        >
                        <ol className={styles.boardOl} >
                                {data.map((card, i) =>
                                    <div key={i} >
                                        <CardBase card_data={card} index={i} />
                                    </div>
                                )}
                        </ol>
                        <button className={styles.addNewCardButton}>
                            + Добавьте ещё одну колонку
                        </button>
                        </ScrollContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Board;