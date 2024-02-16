"use client"
import {useEffect, useState} from 'react'
import AllQuestionCard from "@/components/quiz/AllQuestionCard";
import CustomSkeleton from "@/components/quiz/CustomSkeleton";

const Page = () => {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState([])

    async function getQuestions() {
        const res = await fetch(process.env.NEXT_PUBLIC_HOST + '/api/get/all-questions?table=ETI')
        const data = await res.json()
        setQuestions(data)
    }

    useEffect(() => {
        getQuestions().then(() => setLoading(false))
    }, [])

    return (
        <div className="mt-20 mx-auto flex flex-col justify-center w-[80%] rounded-lg p-2 items-center gap-4">
            { loading ? <CustomSkeleton /> :
                questions.map((question, idx) => (
                    <AllQuestionCard mcq={question} idx={idx} key={idx}/>
                ))
            }
        </div>
    )
}
export default Page
