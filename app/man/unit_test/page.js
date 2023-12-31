"use client";
import {setInitBreadcrumb} from "@/app/state";
import Quiz from "@/components/quiz/Quiz";

setInitBreadcrumb([{
    path: "/", name: "Home"
}, {
    path: "/man", name: "MAN - MCQs"
}, {
    path: "/man/unit_test", name: "Unit Wise Test"
}])

const Page = () => {
    const ut = localStorage.getItem("ut");
    return (
        <Quiz
            URL={`${process.env.NEXT_PUBLIC_HOST}/api/get/all-questions?table=man_questions&ut=${ut}`}
            count={20}
            sec={3600}
            max={31}
            sub="man"
            type="Unit Wise Test"
            hour="1"
            marks="20"
            image="/unit_test.jpg"
        />
    )
}
export default Page

