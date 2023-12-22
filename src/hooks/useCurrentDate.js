import {useState} from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
export const useCurrentDate = (deadlineDate) => {
    const [currentDate, setCurrentDate] = useState(dayjs().locale('ru'))
    dayjs.extend(relativeTime)

    try {
        const daysLeft = -currentDate.diff(deadlineDate, 'day', true)
        // console.log(daysLeft)
        const smallDeadlineDate = dayjs(deadlineDate).format('DD MMM')
        return [
            currentDate,
            setCurrentDate,
            daysLeft,
            smallDeadlineDate,
        ]

    }
    catch (e) {
        console.log(deadlineDate)
    }


}