import React from 'react'
import {Card, CardBody, RadioGroup, Spacer} from "@nextui-org/react";
import {CustomRadioBox} from "@/components/quiz/CustomRadioBox";

const QuestionCard = (props) => {
    const {question, options, result} = props
    const {selectedIndex, isCorrect, correctAnswer} = result

    let correctIndex = -1

    switch (correctAnswer) {
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

    if (options[correctIndex] === "") {
        console.log("correct index not found")
    }

    return (
        <div className="pointer-events-none w-[90%] bg-neutral-800 rounded-lg p-4 items-center gap-4">
            <Card radius="sm">
                <CardBody className="border-warning">
                    <p>{question}</p>
                </CardBody>
            </Card>
            <Spacer y="5"/>
            <div className="overflow-scroll h-100 flex flex-col items-center gap-4 justify-around">
                <RadioGroup
                    defaultValue={options[selectedIndex]}
                    isInvalid={!isCorrect}
                >
                    {options.map((option, idx) => (
                        <CustomRadioBox
                            isInvalid={!isCorrect}
                            key={idx}
                            value={option}
                        >
                            {option}
                        </CustomRadioBox>
                    ))}
                </RadioGroup>
            </div>
            <Card className="mt-5" radius="sm">
                <CardBody className="border-warning">
                    <div>You selected: <span style={{color: isCorrect ? "#f5a524" : "red"}}>{options[selectedIndex] || "None"}</span></div>
                </CardBody>
                <CardBody className="border-warning">
                    <div>Correct Answer: <span style={{color: "#f5a524"}}>{options[correctIndex]}</span></div>
                </CardBody>
            </Card>
        </div>
    )
}
export default QuestionCard
