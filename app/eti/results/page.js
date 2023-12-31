"use client";
import {getBreadcrumbs, setBreadcrumb, setInitBreadcrumb} from "@/app/state";
import Test from "@/components/quiz/Test";
import {useRef} from "react";

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
    let opt = ["A", "B", "C", "D", "E"]
    const containerRef = useRef(null);

    return (
        <main ref={containerRef} className="flex justify-around w-[100%] mt-20 p-20">
            {
                opt.map((o, i) => (
                    <Test key={i}/>
                ))
            }
        </main>
    )
}
export default Page
