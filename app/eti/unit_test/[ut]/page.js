"use client";
import Quiz from "@/components/quiz/Quiz";

const Page = ({params}) => {
    return (
        <Quiz
            HOST={process.env.NEXT_PUBLIC_HOST}
            URL={`/api/get/all-questions?table=eti_questions&ut=${params.ut}`}
            count={20}
            sec={3600}
            sub="eti"
            type="Unit Wise Test"
            hour="1"
            marks="20"
            image="/unit_test.jpg"
        />
    )
}
export default Page

