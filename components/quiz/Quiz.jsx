"use client"
import React, {useEffect, useRef, useState} from 'react'
import {formatTime, generateUniqueNumbers} from "@/app/lib/helper";
import CustomSkeleton from "@/components/quiz/CustomSkeleton";
import QuestionCard from "@/components/quiz/QuestionCard";
import {Button, Link, Pagination} from "@nextui-org/react";
import DigiClock from "@/components/quiz/DigiClock";
import {useRouter} from 'next/navigation'
import {useSnapshot} from "valtio";
import {store} from "@/app/lib/store";

const Quiz = ({HOST, URL, sec, count, type, hour, marks, image, sub}) => {
    const containerRef = useRef(null);
    const router = useRouter();

    const [index, setIndex] = useState(0);
    const [seconds, setSeconds] = useState(sec);
    const [loading, setLoading] = useState(true);
    const [resultStats, setResultStats] = useState([]);
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

    const snap = useSnapshot(store);
    let opt = ["A", "B", "C", "D", "E"]

    async function getQuestions() {
        let res = await fetch(HOST + URL);
        const bigData = await res.json();
        const data = []
        res = await fetch(HOST + `/api/get/table-length?table=${sub}_questions`)
        const tableLength = await res.json();
        let max = tableLength[0].count
        const ind = generateUniqueNumbers(0, max - 1, count)
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
        setResultStats(arr)
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
        let res = [...resultStats]

        res[index].selectedIndex = idx
        res[index].selectedAnswer = opt
        res[index].isCorrect = opt === res[index].correctAnswer
        setResultStats(res)
    }

    function endExam() {
        let correct = 0
        let attempted = 0
        resultStats.forEach(res => {
            if (res.selectedAnswer !== "") {
                attempted++
            }
            if (res.isCorrect) {
                correct++
            }
        })

        let history = mcqs.map((item, index) => ({
            ...item,
            result: resultStats[index]
        }));

        store.results = {
            type: type,
            sub: sub,
            hour: hour,
            marks: marks,
            image: image,
            history: history,
            correct: correct,
            attempted: attempted,
            total: resultStats.length,
            percentage: (correct / resultStats.length) * 100,
            timeTaken: formatTime(sec - seconds)
        }

        router.push(`/${sub}/results`)
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
