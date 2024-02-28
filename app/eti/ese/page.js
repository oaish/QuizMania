import Quiz from "@/components/quiz/Quiz";

const Page = () => {
    return (
        <Quiz
            URL="/api/get/all-questions?table=ETI"
            count={70}
            sec={5400}
            sub="eti"
            type="End Semester Exam"
            hour="1.5"
            marks="70"
            image="/ese.jpg"
        />
    )
}
export default Page
