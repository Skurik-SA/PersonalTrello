import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";


const Slice_ToDoList = createSlice({
    name: "todolist",
    initialState: {
        selected_task: {
            card_id: '',
            id: '',
            info: '',
            marks: [],
            task_cover: {},
            deadline: {},
            task_description: {},
            sub_tasks: [],
            comments: [],
        },
        mark_store: [
            {
                id: 1,
                font_color: 'black',
                color: 'red',
                mark_text: 'Poof'
            },

            {
                id: 2,
                font_color: 'black',
                color: 'green',
                mark_text: 'Woof'
            },
            {
                id: 3,
                font_color: 'white',
                color: '#3b328d',
                mark_text: 'Poof'
            },
            {
                id: 4,
                font_color: 'black',
                color: '#32858d',
                mark_text: 'Some dogs go to Heaven'
            },
            {
                id: 5,
                font_color: 'black',
                color: '#498d32',
                mark_text: 'But what about cats?'
            },
            {
                id: 6,
                font_color: 'black',
                color: '#8a8d32',
                mark_text: 'Nobody knows...'
            },
            {
                id: 7,
                font_color: 'white',
                color: '#3b328d',
                mark_text: 'Tooooooooooooo much very long marks you is not good)'
            },
            {
                id: 8,
                font_color: 'black',
                color: '#32858d',
                mark_text: 'I am really serious, stop doing put it here'
            },
            {
                id: 9,
                font_color: 'black',
                color: '#498d32',
                mark_text: 'Why are you not listening me?!?!?!!!!!!!!'
            },
            {
                id: 10,
                font_color: 'black',
                color: '#8a8d32',
                mark_text: 'Whatever...'
            },
            {
                id: 11,
                font_color: 'black',
                color: 'white',
                mark_text: ''
            },
        ],
        data: [
            {
                id: uuidv4(),
                title: 'Недоразумение',
                content: [
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                                id: 1,
                                font_color: 'black',
                                color: 'red',
                                mark_text: 'Poof'
                            },
                            {
                                id: 2,
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
                            // type: 'NotSoon', // (?) Скоро истекает [SoonExpires] / Выполнено [Done] / Нескоро [NotSoon] / Просрочено [Failed]
                            // remaining: '', //
                            // end: '', // set date
                            // dateJsFormatDate: {},
                            // dateJsFormatTime: {},
                        },
                        task_description: {
                            text: 'Что-то тут не чисто',
                        },
                        // Сабтаски будут грузиться отдельно от общего пула информации,
                        // нужно иметь в виду при проектировании БД и последующим рефакторингом кода
                        sub_tasks: [
                            {
                                id: uuidv4(),
                                title: 'check-list-1',
                                success_amount: 0,
                                total_amount: 2,
                                check_list: [
                                    {
                                        id: uuidv4(),
                                        isChecked: false,
                                        label: 'sub_task 1.1',
                                        deadline: {
                                            type: '',
                                            remaining: '',
                                            end: '',
                                            dateJsFormatDate: {},
                                            dateJsFormatTime: {},
                                        }
                                    },
                                    {
                                        id: uuidv4(),
                                        isChecked: false,
                                        label: 'sub_task 1.2',
                                        deadline: {
                                            type: '',
                                            remaining: '',
                                            end: '',
                                            dateJsFormatDate: {},
                                            dateJsFormatTime: {},
                                        }
                                    },
                                ]
                            },
                            {
                                id: uuidv4(),
                                title: 'check-list-2',
                                success_amount: 2,
                                total_amount: 2,
                                check_list: [
                                    {
                                        id: uuidv4(),
                                        isChecked: true,
                                        label: 'sub_task 2.1',
                                        deadline: {
                                            type: '',
                                            remaining: '',
                                            end: '',
                                        }
                                    },
                                    {
                                        id: uuidv4(),
                                        isChecked: true,
                                        label: 'sub_task 2.2',
                                        deadline: {
                                            type: '',
                                            remaining: '',
                                            end: '',
                                        }
                                    },
                                ]
                            },
                            {
                                id: uuidv4(),
                                title: 'Очень большое название для чек-листа, чтобы проверить как реагирует интерфейс на это',
                                success_amount: 0,
                                total_amount: 0,
                                check_list: []
                            },
                        ],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
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
                        is_visible: true,
                        info: 'И я не верил ни в чьи слова\n' +
                            'Кроме твоих — они казались мне истиной\n' +
                            'Но ты не была со мной искренней\n' +
                            'Отвратно-о-о\n' +
                            'Но всё разрушится, мы погибнем\n' +
                            'Если захочешь — моргни мне\n' +
                            'Ты думаешь: спасём мир… Нет',
                        marks: [
                            {
                                id: 3,
                                font_color: 'white',
                                color: '#3b328d',
                                mark_text: 'Poof'
                            },
                            {
                                id: 4,
                                font_color: 'black',
                                color: '#32858d',
                                mark_text: 'Some dogs go to Heaven'
                            },
                            {
                                id: 5,
                                font_color: 'black',
                                color: '#498d32',
                                mark_text: 'But what about cats?'
                            },
                            {
                                id: 6,
                                font_color: 'black',
                                color: '#8a8d32',
                                mark_text: 'Nobody knows...'
                            },
                        ],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Тудудуду',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                ],
            },
            {
                id: uuidv4(),
                title: 'То, что необходимо сейчас реализовать',
                content: [
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Чек-лист',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Приоритет',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Фильтрация',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Уведомления',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Комментарии',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Архивация',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
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
                        is_visible: true,
                        info: 'А ты улетишь туда, где будет теплей\n' +
                            'Оставишь белые ночи, меня и апрель\n' +
                            'А ты улетишь туда, где будет теплей\n' +
                            'Оставишь белые ночи\n',
                        marks: [
                            {
                                id: 7,
                                font_color: 'white',
                                color: '#3b328d',
                                mark_text: 'Tooooooooooooo much very long marks you is not good)'
                            },
                            {
                                id: 8,
                                font_color: 'black',
                                color: '#32858d',
                                mark_text: 'I am really serious, stop doing put it here'
                            },
                            {
                                id: 9,
                                font_color: 'black',
                                color: '#498d32',
                                mark_text: 'Why are you not listening me?!?!?!!!!!!!!'
                            },
                            {
                                id: 10,
                                font_color: 'black',
                                color: '#8a8d32',
                                mark_text: 'Whatever...'
                            },
                        ],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Поменяю города и не забуду твою улыбку',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Может, я ушёл навсегда',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Но буду помнить свою ошибку',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Я помню каменный остров, там сияю как фосфор',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Бегу от друзей, играю в прятки',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Со сломанным носом взлетаю в космос',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Ты меня вспомнишь вряд ли',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Мы сейчас забиты делом с головой\n' +
                            'Ты помнишь меня — я был не такой',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Что послужит нам чертой между небом и землёй?\n' +
                            'И я когда-нибудь вернусь домой',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Там будешь ты, и ты пойдёшь со мной\n' +
                            'Свет в конце тоннеля станет путевой звездой',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Между небом и землёй',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'А ты улетишь туда, где будет теплей\n' +
                            'Оставишь белые ночи, меня и апрель\n' +
                            'Я знаю: ты улетишь, и я оставлю себе\n' +
                            'Эти белые ночи на чёрный день',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
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
                        is_visible: true,
                        info: 'Boom-boom',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Crack-Crack',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Wock-wock',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Zzzzzzz',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Pffffffff',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
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
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
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
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
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
                        is_visible: true,
                        info: 'Row 1',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Row 2',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Row 3',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
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
                        is_visible: true,
                        info: 'Заключительная информация',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
                        comments: [],
                    },
                    {
                        id: uuidv4(),
                        is_visible: true,
                        info: 'Находится тут',
                        marks: [],
                        task_cover: {},
                        deadline: {},
                        task_description: {},
                        sub_tasks: [],
                        priority : {
                            id: 0,
                            type: 'default',
                            label: 'Нет установлен'
                        },
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
        set_mark_store(state, action) {
            state.mark_store = action.payload
        },
        create_new_mark(state, action) {
            state.mark_store.push(action.payload)
        },
        edit_mark(state, action) {
            state.mark_store = state.mark_store.map((mark) => {
                if (mark.id === action.payload.id) {
                    return action.payload
                }
                else {
                    return mark
                }
            })
        },
        delete_mark(state, action) {
            state.mark_store = state.mark_store.filter((mark) => mark.id !== action.payload.id)
        },

    }
})

export default Slice_ToDoList.reducer

export const {
    set_todolist,
    create_new_mark,
    edit_mark,
    delete_mark,
} = Slice_ToDoList.actions