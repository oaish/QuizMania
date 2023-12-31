import React from 'react'
import {Card, CardBody, RadioGroup, Spacer} from "@nextui-org/react";
import {CustomRadioBox} from "@/components/quiz/CustomRadioBox";

const QuestionCard = ({question, options, opt, onChange}) => {
    return (
        <div className="items-center gap-4">
            <Card radius="sm">
                <CardBody className="border-warning">
                    <p>{question}</p>
                </CardBody>
            </Card>
            <Spacer y="5"/>
            <div className="overflow-scroll h-100 flex flex-col items-center gap-4 justify-around">
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
    )
}
export default QuestionCard
