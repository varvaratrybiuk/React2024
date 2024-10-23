import { useState, useEffect, useRef } from "react";

export default function useCountdown(targetTime, type = 'timer') {
    const [timeLeft, setTimeLeft] = useState(0);
    const intervalId = useRef(null);
    const isStopped = useRef(true);
    const countdownTypes = ['timer', 'event'];

    const start = () => { isStopped.current = false };
    const stop = () => { isStopped.current = true };

    if (!countdownTypes.includes(type)) {
        console.error("Недопустимий тип. Використовуйте 'timer' або 'event'.");
        return;
    }

    useEffect(() => {
        const time = initializeTime(targetTime, type);
        if (time === null) return;
        setTimeLeft(time);
        intervalId.current = setInterval(() => {
            if (isStopped.current) return;
            setTimeLeft(prevTimeLeft => {
                const updatedTimeLeft = type === 'timer' ? prevTimeLeft - 1000 : calculateTimeLeft(time);
                if (updatedTimeLeft <= 0) {
                    clearInterval(intervalId.current);
                    return 0;
                }
                return updatedTimeLeft;
            });
        }, 1000);
        return () => clearInterval(intervalId.current);
    }, [type, targetTime]);

    return [formatTime(timeLeft), { start, stop }];
}

const calculateTimeLeft = (targetDate) => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference > 0) {
        return difference;
    } else {
        return 0;
    }
}

const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const timeLeft = {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60
    }
    return `${timeLeft.hours}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;
}

const initializeTime = (targetTime, type) => {
    let time = null;

    if (type === "timer") {
        if (typeof targetTime === "number" && Number.isInteger(targetTime)) {
            time = targetTime * 1000;
        } else {
            console.error("Переданий параметр не є числом");
            return time;
        }
    } else {
        const targetDate = new Date(targetTime);
        if (!isNaN(targetDate.getTime())) {
            time = targetDate.getTime();
        } else {
            console.error("Переданий параметр не є датою");
            return time;
        }
    }
    return time;
}