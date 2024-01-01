"use client";
import Quiz from "@/components/quiz/Quiz";

const Page = () => {
    return (
        <Quiz
            HOST={process.env.NEXT_PUBLIC_HOST}
            URL="/api/get/all-questions?table=man_questions"
            count={70}
            sec={5400}
            max={31}
            sub="man"
            type="End Semester Exam"
            hour="1.5"
            marks="70"
            image="/ese.jpg"
        />
    )
}
export default Page
