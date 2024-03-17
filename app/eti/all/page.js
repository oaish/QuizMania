"use client"
import {useEffect, useState} from 'react'
import AllQuestionCard from "@/components/quiz/AllQuestionCard";
import CustomSkeleton from "@/components/quiz/CustomSkeleton";

const Page = () => {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState([])
    const [unit, setUnit] = useState({})

    async function getQuestions() {
        const res = await fetch('/api/get/all-questions?table=ETI')
        const data = await res.json()
        setQuestions(data)
        const unit = {
            I: 0,
            II: 0,
            III: 0,
            IV: 0,
            V: 0,
            VI: 0,
            length: data.length
        }
        data.forEach((datum, idx) => {
            switch (datum.unit) {
                case "I":
                    unit.I++
                    break
                case "II":
                    unit.II++
                    break
                case "III":
                    unit.III++
                    break
                case "IV":
                    unit.IV++
                    break
                case "V":
                    unit.V++
                    break
                case "VI":
                    unit.VI++
                    break
            }
        })
        setUnit(unit)
    }

    useEffect(() => {
        getQuestions().then(() => setLoading(false))
    }, [])

    function getUnitIndex(ut) {
        switch (ut) {
            case "I":
                return 0
            case "II":
                return unit.length - unit.II - unit.III - unit.IV - unit.V - unit.VI
            case "III":
                return unit.length - unit.III - unit.IV - unit.V - unit.VI
            case "IV":
                return unit.length - unit.IV - unit.V - unit.VI
            case "V":
                return unit.length - unit.V - unit.VI
            case "VI":
                return unit.length - unit.VI
        }
        return 0;
    }

    return (
        <div className="mt-10 mx-auto flex flex-col justify-center w-[80%] rounded-lg p-2 items-center gap-4">
            {loading ? <CustomSkeleton/> :
                questions.map((question, idx) => {
                     if (idx === getUnitIndex("I") && question.unit === "I") {
                        return (
                            <>
                                <div className="unit-card" style={{backgroundColor: "goldenrod"}} id="I">UNIT I</div>
                                <AllQuestionCard mcq={question} idx={idx} key={idx}/>
                            </>
                        )
                    } if (idx === getUnitIndex("II") && question.unit === "II") {
                        return (
                            <>
                                <div className="unit-card" style={{backgroundColor: "limegreen"}} id="II">UNIT II</div>
                                <AllQuestionCard mcq={question} idx={idx} key={idx}/>
                            </>
                        )
                    }  if (idx === getUnitIndex("III") && question.unit === "II") {
                        return (
                            <>
                                <div className="unit-card" style={{backgroundColor: "#AB149E"}} id="III">UNIT III</div>
                                <AllQuestionCard mcq={question} idx={idx} key={idx}/>
                            </>
                        )
                    } else if (idx === getUnitIndex("IV")) {
                        return (
                            <>
                                <div className="unit-card" style={{backgroundColor: "crimson"}} id="IV">UNIT IV</div>
                                <AllQuestionCard mcq={question} idx={idx} key={idx}/>
                            </>
                        )
                    } else if (idx === getUnitIndex("V")) {
                        return (
                            <>
                                <div className="unit-card" style={{backgroundColor: "teal"}} id="V">UNIT V</div>
                                <AllQuestionCard mcq={question} idx={idx} key={idx}/>
                            </>
                        )
                    } else if (idx === getUnitIndex("VI")) {
                        return (
                            <>
                                <div className="unit-card" style={{backgroundColor: "rebeccapurple"}} id="VI">UNIT VI</div>
                                <AllQuestionCard mcq={question} idx={idx} key={idx}/>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <AllQuestionCard mcq={question} idx={idx} key={idx}/>
                            </>
                        )
                    }
                })
            }
        </div>
    )
}
export default Page
