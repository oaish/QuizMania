"use client";
import {setInitBreadcrumb} from "@/app/state";
import Quiz from "@/components/quiz/Quiz";

setInitBreadcrumb([{
    path: "/", name: "Home"
}, {
    path: "/man", name: "MAN - MCQs"
}, {
    path: "/man/quick_test", name: "Quick MCQ Test"
}])

const Page = () => {
    return (
        <Quiz
            URL={process.env.NEXT_PUBLIC_HOST + "/api/get/all-questions?table=man_questions"}
            count={20}
            sec={3600}
            max={31}
            sub="man"
            type="Quick MCQ Test"
            hour="1"
            marks="20"
            image="/quick_test.jpg"
        />
    )
}
export default Page

