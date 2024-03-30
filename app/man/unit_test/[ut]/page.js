"use client";
import Quiz from "@/components/quiz/Quiz";

const Page = ({params}) => {
    return (
        <Quiz
            URL={`/api/get/all-questions?table=MAN&ut=${params.ut}`}
            count={20}
            sec={3600}
            sub="man"
            type="Unit Wise Test"
            hour="1"
            marks="20"
            image="/unit_test.jpg"
        />
    )
}
export default Page

