"use client";
import Quiz from "@/components/quiz/Quiz";

const Page = ({params}) => {
    return (
        <Quiz
            
            URL={`/api/get/all-questions?table=ETI&ut=${params.ut}&limit=20`}
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

