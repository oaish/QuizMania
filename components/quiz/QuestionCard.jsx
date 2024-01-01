import React from 'react'
import {Card, CardBody, RadioGroup, Spacer} from "@nextui-org/react";
import {CustomRadioBox} from "@/components/quiz/CustomRadioBox";
import Spoiler from "@/components/quiz/Spoiler";

const QuestionCard = ({question, options, opt, onChange, idx}) => {
    return (
        <>
            <div className="relative mb-10 w-[70%] bg-neutral-800 rounded-lg p-4 items-center gap-4">
                <div className="absolute top-8 left-0 p-5" style={{ borderRadius: "10px 0 0 10px", translate: "-100%", backgroundColor: "#18181b"}}>{idx + 1}</div>
                <Card radius="sm">
                    <CardBody className="border-warning">
                        <p>{question}</p>
                    </CardBody>
                </Card>
                <Spacer y="5"/>
                <div className="max-w-fit h-100 flex flex-col items-center gap-4 justify-around">
                    <RadioGroup>
                        {options.map((option, idx) => (
                            <CustomRadioBox
                                key={idx}
                                value={opt[idx]}
                                onChange={() => onChange(opt[idx], idx)}
                            >
                                {option}
                            </CustomRadioBox>
                        ))}
                    </RadioGroup>
                </div>
            </div>
        </>
    )
}
export default QuestionCard
