import React, {useEffect, useRef, useState} from 'react'
import {formatTime, generateUniqueNumbers} from "@/app/lib/helper";
import CustomSkeleton from "@/components/quiz/CustomSkeleton";
import QuestionCard from "@/components/quiz/QuestionCard";
import {Button, Link, Pagination} from "@nextui-org/react";
import DigiClock from "@/components/quiz/DigiClock";

const Quiz = ({sec, URL, count, max, type, hour, marks, image, sub}) => {
    const containerRef = useRef(null);

    const [index, setIndex] = useState(0);
    const [seconds, setSeconds] = useState(sec);
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [mcqs, setMcqs] = useState([
        {
            id: 1,
            question: "What is the capital of France?",
            options: ["London", "Paris", "Berlin", "Madrid"],
            answer: "Paris",
            ans: "B",
            unit: "I"
        }
    ]);

    let opt = ["A", "B", "C", "D", "E"]

    async function getQuestions() {
        const res = await fetch(URL);
        const bigData = await res.json();
        const data = []
        const ind = generateUniqueNumbers(1, max, count)
        for (let i = 0; i < count; i++) {
            data.push(bigData[ind[i]])
        }
        let arr = []
        data.forEach(mcq => {
            arr.push({
                selectedIndex: -1,
                selectedAnswer: "", correctAnswer: mcq.ans, isCorrect: false
            })
        })
        setResults(arr)
        setMcqs(data)
    }

    useEffect(() => {
        getQuestions().then(() => {
            setLoading(false)
        });
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            for (let i = 1; i < containerRef.current.childNodes.length; i++) {
                const currentDiv = containerRef.current.childNodes[i];
                currentDiv.style.display = "none"
            }
        }
    }, [loading])

    const handlePageChange = (i) => {
        const newIndex = i - 1;
        setIndex(newIndex);
        if (newIndex > index) {
            containerRef.current.childNodes[index].style.display = "none";
            containerRef.current.childNodes[newIndex].style.display = "block";
        } else {
            containerRef.current.childNodes[index].style.display = "none";
            containerRef.current.childNodes[newIndex].style.display = "block";
        }
    }

    function handleRBChange(opt, idx) {
        let res = [...results]

        res[index].selectedIndex = idx
        res[index].selectedAnswer = opt
        res[index].isCorrect = opt === res[index].correctAnswer
        setResults(res)
    }

    function endExam() {
        let correct = 0
        let attempted = 0
        results.forEach(res => {
            if (res.selectedAnswer !== "") {
                attempted++
            }
            if (res.isCorrect) {
                correct++
            }
        })

        let history = mcqs.map((item, index) => ({
            ...item,
            result: results[index]
        }));

        let res = {
            type: type,
            hour: hour,
            marks: marks,
            image: image,
            history: history,
            correct: correct,
            attempted: attempted,
            total: results.length,
            percentage: (correct / results.length) * 100,
            timeTaken: formatTime(sec - seconds)
        }

        console.log(res.percentage, res.correct, results.length)

        let json = JSON.stringify(res)
        localStorage.setItem("results", json)
        window.location.href = `/${sub}/results`
    }

    return (<>
        {loading ? <CustomSkeleton/> :
            <>
                <main ref={containerRef}
                      className="flex items-center gap-4 justify-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {
                        mcqs.map((mcq, index) => (
                            <QuestionCard
                                key={index}
                                question={mcq.question}
                                options={mcq.options}
                                opt={opt}
                                onChange={handleRBChange}
                            />
                        ))
                    }
                </main>
                <div className="overflow-hidden flex justify-center absolute bottom-10 w-full m-0 p-0">
                    <Pagination showShadow showControls onChange={(i) => handlePageChange(i)} size="lg"
                                color="warning" total={count} initialPage={1}
                    />
                    <div className="absolute right-20">
                        <Link>
                            <Button onClick={endExam} isLoading={loading} variant="bordered" color="danger">
                                End Exam
                            </Button>
                        </Link>
                    </div>
                </div>
                <DigiClock endExam={endExam} limit={seconds} setSeconds={setSeconds}/>
            </>
        }
    </>)
}
export default Quiz
