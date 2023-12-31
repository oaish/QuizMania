import React, {useEffect, useState} from 'react';
import './Clock.css';
import {formatTime} from "@/app/lib/helper"; // Import the corresponding CSS file

const DigiClock = ({limit, setSeconds, endExam}) => {
    const [time, setTime] = useState(formatTime(limit));
    const [timeUp, setTimeUp] = useState(false);
    let seconds = limit - 1;

    useEffect(() => {
        const timerDisplay = setInterval(() => {
            const formattedTime = formatTime(seconds)
            if (formattedTime === "00:00:00") {
                setTimeUp(true);
                clearInterval(timerDisplay);
                setTimeout(() => {
                    endExam();
                }, 5000)
            }
            seconds -= 1;
            setSeconds(seconds);
            setTime(formattedTime);
        }, 1000);

        return () => clearInterval(timerDisplay);
    }, []);

    return (
        <>
            <div className="clock">
                <div className="time">{time}</div>
            </div>
            {
                timeUp &&
                <div className="time-msg">
                    Time is Up!
                </div>
            }
        </>
    );
};

export default DigiClock;
