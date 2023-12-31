"use client";
import {setInitBreadcrumb} from "@/app/state";
import Quiz from "@/components/quiz/Quiz";

setInitBreadcrumb([
    {
        path: "/",
        name: "Home"
    },
    {
        path: "/eti",
        name: "ETI - MCQs"
    },
    {
        path: "/eti/ese",
        name: "End Semester Exam"
    }
])

const Page = () => {
    return (
        <Quiz
            URL={process.env.NEXT_PUBLIC_HOST + "/api/get/all-questions?table=eti_questions"}
            count={70}
            sec={5400}
            max={408}
            sub="eti"
            type="End Semester Exam"
            hour="1.5"
            marks="70"
            image="/ese.jpg"
        />
    )
}
export default Page
