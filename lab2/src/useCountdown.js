import { useState, useEffect, useRef } from "react";

export default function useCountdown(targetTime, type = 'timer') {
    const [timeLeft, setTimeLeft] = useState(0);
    const intervalId = useRef(null);
    const countdownTypes = ['timer', 'event'];

    const initializeTimeLeft = () => {
        if (!countdownTypes.includes(type)) {
            console.error("Недопустимий тип. Використовуйте 'timer' або 'event'.");
            return null;
        }

        let time;
        if (type === "timer") {
            if (typeof targetTime === "number") {
                setTimeLeft(targetTime);
            } else {
                console.error("Переданий параметр не є числом");
                return null;
            }
        } else {
            const targetDate = new Date(targetTime);
            if (!isNaN(targetDate.getTime())) {
                time = targetDate.getTime();
                setTimeLeft(calculateTimeLeft(time));
            } else {
                console.error("Переданий параметр не є датою");
                return null;
            }
        }

        return time;
    };

    useEffect(() => {
        const time = initializeTimeLeft();
        if (time === null) return;

        intervalId.current = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                const updatedTimeLeft = type === 'timer' ? prevTimeLeft - 1 : calculateTimeLeft(time);
                if (updatedTimeLeft <= 0) {
                    clearInterval(intervalId.current);
                    return 0;
                }
                return updatedTimeLeft;
            });
        }, 1000);
        return () => clearInterval(intervalId.current);
    }, [type, targetTime]);

    return formatTime(timeLeft);
}

const calculateTimeLeft = (targetDate) => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference > 0) {
        return difference;
    } else {
        return 0;
    }
};

const formatTime = (seconds) => {
    const timeLeft = {
        hours: Math.floor(seconds / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: seconds % 60,
    };

    return `${timeLeft.hours}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;
};
