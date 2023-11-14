import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";


const Slice_ToDoList = createSlice({
    name: "todolist",
    initialState: {
        data: [
            {
                id: uuidv4(),
                title: 'Недоразумение',
                content: [
                    {
                        id: uuidv4(),
                        info: 'Я не искал ничьей вины\n' +
                            'Но в твоих словах мне виделась грань\n' +
                            'Лишних не было\n' +
                            'Ты казалось такою преданной\n' +
                            'Не надо (Не надо)\n' +
                            'Но всё разрушится, мы погибнем\n' +
                            'Если захочешь — моргни мне\n' +
                            'Ты думаешь: спасём мир… Нет\n',
                        marks: [
                            {
                                font_color: 'black',
                                color: 'red',
                                mark_text: 'Poof'
                            },
                            {
                                font_color: 'black',
                                color: 'green',
                                mark_text: 'Woof'
                            },
                        ],
                        task_cover: {
                            // none | header | full
                            type: 'header',
                            color: 'red'
                        },
                        deadline: {
                            type: '',
                            remaining: '',
                            end: '',
                        },
                        task_description: {
                            text: '',
                        },
                        sub_tasks: [
                            {
                                isChecked: false,
                                label: 'sub_task 1',
                                deadline: {
                                    type: '',
                                    remaining: '',
                                    end: '',
                                }
                            },
                            {
                                isChecked: true,
                                label: 'sub_task 2',
                                deadline: {
                                    type: '',
                                    remaining: '',
                                    end: '',
                                }
                            },
                        ],
                        comments: [
                            {
                                author: 'Dog',
                                text: 'Cool!',
                            },
                            {
                                author: 'Cat',
                                text: 'Cool',
                            },
                        ]
                    },
                    {
                        id: uuidv4(),
                        info: 'И я не верил ни в чьи слова\n' +
                            'Кроме твоих — они казались мне истиной\n' +
                            'Но ты не была со мной искренней\n' +
                            'Отвратно-о-о\n' +
                            'Но всё разрушится, мы погибнем\n' +
                            'Если захочешь — моргни мне\n' +
                            'Ты думаешь: спасём мир… Нет',
                        marks: [
                            {
                                font_color: 'white',
                                color: '#3b328d',
                                mark_text: 'Poof'
                            },
                            {
                                font_color: 'black',
                                color: '#32858d',
                                mark_text: 'Some dogs go to Heaven'
                            },
                            {
                                font_color: 'black',
                                color: '#498d32',
                                mark_text: 'But what about cats?'
                            },
                            {
                                font_color: 'black',
                                color: '#8a8d32',
                                mark_text: 'Nobody knows...'
                            },
                        ],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Ты надо мною глумишься\n' +
                            'И в свете этих событий\n' +
                            'Не хочу быть тем лишним\n' +
                            'Но тебе хочется в Питер\n' +
                            'Да, хочется, но колется\n' +
                            'Оставьте нас на улице\n' +
                            'Не вернёмся и простудимся',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Самому сгинуть, о тебе забыть\n' +
                            'Пока ты сыпешь мне в глаза пыль\n' +
                            'Ты моё недоразумение\n' +
                            'Ведь в это мгновение не было «мы»\n' +
                            'И на небе не было луны\n' +
                            'Валились камни и валуны\n' +
                            'Недоразумение — это я и ты',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Я не искал любви\n' +
                            'Неси меня туда\n' +
                            'Куда несут цветы\n' +
                            'Ведь меня нету в живых\n' +
                            'Я не искал любви\n' +
                            'Неси меня туда\n' +
                            'Куда несут цветы\n',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'И я не верил ни в чьи слова\n' +
                            'Кроме твоих — они казались мне истиной\n' +
                            'Но ты не была со мной искренней\n' +
                            'Отвратно-о-о\n' +
                            'Но всё разрушится, мы погибнем\n' +
                            'Если захочешь — моргни мне\n' +
                            'Ты думаешь: спасём мир…',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Самому сгинуть, о тебе забыть\n' +
                            'Пока ты сыпешь мне в глаза пыль\n' +
                            'Ты моё недоразумение\n' +
                            'Ведь в это мгновение не было «мы»\n' +
                            'И на небе не было луны\n' +
                            'Валились камни и валуны\n' +
                            'Недоразумение — это я и ты',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Самому сгинуть, о тебе забыть\n' +
                            'Пока ты сыпешь мне в глаза пыль\n' +
                            'Ты моё недоразумение\n' +
                            'Ведь в это мгновение не было «мы»\n' +
                            'И на небе не было луны\n' +
                            'Валились камни и валуны\n' +
                            'Недоразумение — это я и ты',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Тудудуду',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                ],
            },
            {
                id: uuidv4(),
                title: 'Каменный остров',
                content: [
                    {
                        id: uuidv4(),
                        info: 'А ты улетишь туда, где будет теплей\n' +
                            'Оставишь белые ночи, меня и апрель\n' +
                            'А ты улетишь туда, где будет теплей\n' +
                            'Оставишь белые ночи\n',
                        marks: [
                            {
                                font_color: 'white',
                                color: '#3b328d',
                                mark_text: 'Tooooooooooooo much very long marks you is not good)'
                            },
                            {
                                font_color: 'black',
                                color: '#32858d',
                                mark_text: 'I am really serious, stop doing put it here'
                            },
                            {
                                font_color: 'black',
                                color: '#498d32',
                                mark_text: 'Why are you not listening me?!?!?!!!!!!!!'
                            },
                            {
                                font_color: 'black',
                                color: '#8a8d32',
                                mark_text: 'Whatever...'
                            },
                        ],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Поменяю города и не забуду твою улыбку',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Может, я ушёл навсегда',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Но буду помнить свою ошибку',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Я помню каменный остров, там сияю как фосфор',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Бегу от друзей, играю в прятки',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Со сломанным носом взлетаю в космос',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Ты меня вспомнишь вряд ли',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Мы сейчас забиты делом с головой\n' +
                            'Ты помнишь меня — я был не такой',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Что послужит нам чертой между небом и землёй?\n' +
                            'И я когда-нибудь вернусь домой',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Там будешь ты, и ты пойдёшь со мной\n' +
                            'Свет в конце тоннеля станет путевой звездой',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Между небом и землёй',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Влюблённым подростком бежал от проблем\n' +
                            'Ты бежала рядом\n' +
                            'Перед глазами картина: я улетаю\n' +
                            'Провожаю взглядом\n' +
                            'Твоя пустая квартира, когда-нибудь я\n' +
                            'Появлюсь в ней, не с ней\n' +
                            'Не с ней',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'А ты улетишь туда, где будет теплей\n' +
                            'Оставишь белые ночи, меня и апрель\n' +
                            'Я знаю: ты улетишь, и я оставлю себе\n' +
                            'Эти белые ночи на чёрный день',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Я помню каменный остров, там сияю как фосфор\n' +
                            'Бегу от друзей, играю в прятки\n' +
                            'Со сломанным носом взлетаем в космос\n' +
                            'Ты меня вспомнишь вряд ли\n' +
                            'Был влюблённым подростком, таким и остался\n' +
                            'Бежал от проблем, заливаясь ядом\n' +
                            'Со сломанным носом взлетаем в космос\n' +
                            'Но тебя нету',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Ведь ты улетишь туда, где будет теплей\n' +
                            'Оставишь белые ночи, меня и апрель\n' +
                            'Я знаю: ты улетишь, и я оставлю себе\n' +
                            'Эти белые ночи на чёрный день\n' +
                            'А ты улетишь туда, где будет теплей\n' +
                            'Оставишь белые ночи, меня и апрель\n' +
                            'Я знаю: ты улетишь, и я оставлю себе\n' +
                            'Эти белые ночи на чёрный день',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                ],
            },
            {
                id: uuidv4(),
                title: 'Sounds like',
                content: [
                    {
                        id: uuidv4(),
                        info: 'Boom-boom',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Crack-Crack',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Wock-wock',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Zzzzzzz',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Pffffffff',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                ],
            },
            {
                id: uuidv4(),
                title: 'Армагеддон',
                content: [
                    {
                        id: uuidv4(),
                        info: 'Из берегов вытекает река\n' +
                            'Мы наблюдаем издалека\n' +
                            'Это Армагеддон наверняка\n' +
                            'Как объяснить багровые облака?\n' +
                            'Крепко сжимает твоя рука\n' +
                            'Слёзы текут, но это пока\n' +
                            'На лице улыбка останется на века\n' +
                            'За какие ошибки попадаем в ад?\n' +
                            'Откуда-то с неба течёт океан\n' +
                            'Нептун не имел на нас другой план\n' +
                            'Это Армагеддон наверняка\n' +
                            'Как объяснить багровые облака?\n' +
                            'Крепко сжимает твоя рука\n' +
                            'Слёзы текут, но это пока\n' +
                            'На лице улыбка останется на века\n' +
                            'За какие ошибки, от какого греха? (А?)',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Будем чёрным пятном на стене дома\n' +
                            'Родная моя, обещаю, нам будет не больно\n' +
                            'Когда город сложится в хаотичные коридоры\n' +
                            'Ты не выдохнешь, но мы наконец-то станем спокойны\n' +
                            'Нас не похоронят, не кремируют\n' +
                            'Утопят, изолируют, придавят и зомбируют\n' +
                            'Нас не не принял остров, нас не переносит космос\n' +
                            'Лопнет земной шар, хоть конспирологам всё плоско\n' +
                            'Представь: не будет гравитации\n' +
                            'Вот и путешествие на волнах радиации\n' +
                            'И ты увидишь, почему я рад\n' +
                            'Мы узнаем, что за летними воротами Асгард\n' +
                            'Я не верю в реинкарнацию\n' +
                            'Но надеюсь, встретимся в новой цивилизации\n' +
                            'А может быть, даже и не река выходит из берегов\n' +
                            'Кто выдумал берега?',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Нелепая казённая улыбочка\n' +
                            'С унылым взглядом спросит:\n' +
                            '«Что с тобой не так?» (Или «Что с нами не так?»)\n' +
                            'Хм-м-м, как бы вам сказать (Боюсь, что никак)\n' +
                            'Вечно неймётся, я запитанный от взрыва\n' +
                            'Я запихан в это тело в наказание за проступки\n' +
                            'О которых я понятия не имею и не буду (Е)\n' +
                            'Не ебу, иначе чем мне объяснить настолько сильный зуд, а (У)',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Нас не спасут (Не)\n' +
                            'Ни советы, ни книги, ни суть (Нет)\n' +
                            'Нас не спасут (Чё?), нас не спасут (Ага, едем)\n' +
                            'Я давно в себе это несу, нет\n' +
                            'Нас не спасут, а, нас не спасут (М-м)\n' +
                            'Ни молитвы, ни казнь и ни суд (Е)\n' +
                            'Нас не спасут (Чё?). Мало интересуем\n' +
                            'Красотку, что держит косу, а\n',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Из берегов вытекает река\n' +
                            'Мы наблюдаем издалека\n' +
                            'Это Армагеддон наверняка (Армагеддон)\n' +
                            'Как объяснить багровые облака?\n' +
                            'Крепко сжимает твоя рука\n' +
                            'Слёзы текут, но это пока\n' +
                            'На лице улыбка останется на века\n' +
                            'За какие ошибки попадаем в ад?\n' +
                            'Откуда-то с неба течёт океан\n' +
                            'Нептун не имел на нас другой план\n' +
                            'Это Армагеддон наверняка\n' +
                            'Как объяснить багровые облака?\n' +
                            'Крепко сжимает твоя рука\n' +
                            'Слёзы текут, но это пока\n' +
                            'На лице улыбка останется на века\n' +
                            'За какие ошибки, от какого греха?',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                ],
            },
            {
                id: uuidv4(),
                title: 'A little bit column',
                content: [
                    {
                        id: uuidv4(),
                        info: 'Row 1',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Row 2',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Row 3',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                ],
            },
            {
                id: uuidv4(),
                title: 'Последня, но не по значимости',
                content: [
                    {
                        id: uuidv4(),
                        info: 'Заключительная информация',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        info: 'Находится тут',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        comments: [],
                    },
                ],
            },
        ],
    },
    reducers: {
        set_todolist(state, action) {
            state.data = action.payload
        },
    }
})

export default Slice_ToDoList.reducer

export const {
    set_todolist,
} = Slice_ToDoList.actions