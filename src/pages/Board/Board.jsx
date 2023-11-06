import styles from "./Boards.module.css"
import SideBar from "../../components/SideBar/SideBar.jsx";
import CardBase from "../../components/TaskCard/CardBase/CardBase.jsx";
import {Fragment} from "react";

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
                            asd
                        </div>
                        <div className={styles.toolBar_contentRight}>
                            asd
                        </div>
                    </div>
                    {/*CardList*/}
                    <div className={styles.cardList}>
                        <ol className={styles.boardOl}>
                            {data.map((card, i) =>
                                <div key={i}>
                                    <CardBase card_data={card} index={i} />
                                </div>
                            )}
                        </ol>
                        <button className={styles.addNewCardButton}>
                            + Добавьте ещё одну колонку
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Board;