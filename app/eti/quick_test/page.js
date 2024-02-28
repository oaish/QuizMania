"use client";
import Quiz from "@/components/quiz/Quiz";

const Page = () => {
    return (
        <Quiz
            
            URL="/api/get/all-questions?table=ETI"
            count={20}
            sec={3600}
            sub="eti"
            type="Quick MCQ Test"
            hour="1"
            marks="20"
            image="/quick_test.jpg"
        />
    )
}
export default Page

