import "@/components/quiz/Results.css";
import {useEffect, useState} from "react";

export default function Result({percentage}) {
    let percentageInt = parseInt(percentage);
    const [value, setValue] = useState(0);
    const [color, setColor] = useState("");

    useEffect(() => {
        if (percentageInt === 100) {
            setColor("rebeccapurple");
        } else if (percentageInt >= 80) {
            setColor("#4caf50");
        } else if (percentageInt >= 60) {
            setColor("#ffc107");
        } else if (percentageInt >= 40) {
            setColor("#ff5722");
        } else if (percentageInt >= 20) {
            setColor("#e91e63");
        } else {
            setColor("#f44336");
        }

        for (let i = 0; i <= percentageInt; i++) {
            setTimeout(() => {
                setValue(i);
            }, i * 10);
        }
    }, [percentageInt])

    const radius = 85;
    const dashArray = Math.PI * 2 * radius;
    const dashOffset = dashArray - (dashArray * value) / 100;
    return (<div className="flex h-full items-center justify-center">
            <div className="text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{color: color}}>{percentage + "%"}</div>
            <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" strokeWidth="15px" r={radius} className="circle-background"/>
                <circle
                    cx="100" cy="100"
                    strokeWidth="15px"
                    r={radius}
                    className="circle-progress"
                    style={{
                        stroke: color,
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }}
                    transform={`rotate(-90 100 100)`}
                />
            </svg>
        </div>);
}