import React from 'react'
import {Card, CardBody, RadioGroup, Spacer} from "@nextui-org/react";
import {CustomRadioBox} from "@/components/quiz/CustomRadioBox";

const QuestionCard = ({question, options, opt, onChange, idx}) => {
    return (
        <>
            <div className="relative bg-neutral-800 rounded-lg p-4 items-center gap-4 h-auto lg:w-1/2 w-full">
                <Card radius="sm">
                    <CardBody className="border-warning">
                        <p>{`${idx + 1}. ${question}`}</p>
                    </CardBody>
                </Card>
                <Spacer y="5"/>
                <div className="max-w-full flex flex-col items-left gap-4 justify-around radio-btn">
                    <RadioGroup>
                        {options.map((option, idx) => (
                            <CustomRadioBox
                                className="max-w-full"
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