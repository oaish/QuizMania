"use client"
import {useState} from 'react'
import {Card, CardBody, RadioGroup, Spacer} from "@nextui-org/react";
import {CustomRadioBox} from "@/components/quiz/CustomRadioBox";
import Spoiler from "@/components/quiz/Spoiler";

const AllQuestionCard = ({mcq, idx}) => {
    const {question, options, answer} = mcq
    const [isValid, setIsValid] = useState(true)
    const [isRevealed, setIsRevealed] = useState(false)
    let correctIndex = -1
    let opt = ["A", "B", "C", "D", "E"]
    const ans = opt[mcq.options.indexOf(mcq.answer)]

    switch (ans) {
        case "A":
            correctIndex = 0
            break;
        case "B":
            correctIndex = 1
            break;
        case "C":
            correctIndex = 2
            break;
        case "D":
            correctIndex = 3
            break;
        case "E":
            correctIndex = 4
            break;
        default:
            break;
    }

    function handleClick(idx) {
        if (idx !== correctIndex) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
        setIsRevealed(true)
    }

    return (
        <div className="relative mb-10 w-[100%] bg-neutral-800 rounded-lg p-4 items-center gap-4">
            <div className="absolute top-8 left-0 p-3"
                 style={{borderRadius: "10px 0 0 10px", translate: "-100%", backgroundColor: "#18181b"}}>{idx + 1}</div>
            <Card radius="sm">
                <CardBody className="border-warning">
                    <p>{question}</p>
                </CardBody>
            </Card>
            <Spacer y="5"/>
            <div className="w-full h-100 flex flex-col items-left gap-4 justify-around">
                <RadioGroup
                    isInvalid={!isValid}
                >
                    {options.map((option, idx) => (
                        <CustomRadioBox
                            className="max-w-full rounded-lg"
                            key={idx}
                            value={option}
                            onChange={() => handleClick(idx)}
                        >
                            {option}
                        </CustomRadioBox>
                    ))}
                </RadioGroup>
            </div>
            <Card isPressable className="mt-5" radius="sm">
                <CardBody className="border-warning">
                    <div className="flex items-center">
                        <div>Correct Answer:&nbsp;</div>
                        <Spoiler isRevealed={isRevealed}
                                 setIsRevealed={setIsRevealed}>{"[" + ans + "] " + options[correctIndex]}</Spoiler>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
export default AllQuestionCard
