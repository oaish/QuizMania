"use client";
require("dotenv").config();
import {useEffect, useRef} from "react";
import {Button, Card, CardBody, CardHeader, Image, Link} from "@nextui-org/react";
import ChevronDownIcon from "@/components/quiz/ChevronDownIcon";
import Result from "@/components/quiz/Result";
import "@/components/quiz/Results.css";
import ResultQuestionCard from "@/components/quiz/ResultQuestionCard";
import {useSnapshot} from "valtio";
import {store} from "@/app/lib/store";
import {useRouter} from "next/navigation";

function CustomText({label, value}) {
    return (
        <h5 className="font-bold text-medium">
            <span>{label}</span> <span style={{color: "#f5a51a"}}>{value}</span>
        </h5>
    );
}

const Page = () => {
    const router = useRouter();
    const containerRef = useRef(null);
    const snap = useSnapshot(store);
    const {results} = snap

    const body = JSON.stringify({...snap.results, username: snap.username})

    async function setResult() {
        const res = await fetch(process.env.NEXT_PUBLIC_HOST + `/api/post/result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        const data = await res.json()
        console.log(data)
    }

    useEffect(() => {
        setResult()
    },[])

    return (
        <>
            <main ref={containerRef} className="flex justify-center w-[100%] mt-20 p-20">
                <div className="w-[600px] relative bg-stone-800 grid-cols-2 grid rounded-lg">
                    <Card className="bg-transparent py-4 rounded-none">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">{results.marks + " Marks"}</p>
                            <small
                                className="text-default-500">{results.hour + " Hour" + (results.hour > 1 ? "s" : "")}</small>
                            <h4 className="font-bold text-large">{results.type}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src={results.image}
                                width={270}
                            />
                        </CardBody>
                    </Card>
                    <Card className="bg-transparent py-4 rounded-none">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <CustomText label="Time Taken:" value={results.timeTaken}/>
                            <CustomText label="Total:" value={results.total + " Questions"}/>
                            <CustomText label="Attempted:" value={results.attempted + " / " + results.total}/>
                            <CustomText label="Correct:" value={results.correct + " / " + results.total}/>
                        </CardHeader>
                        <CardBody>
                            <Result percentage={results.percentage.toFixed(1)}/>
                        </CardBody>
                    </Card>
                    <div className="btn-x">
                        <Button color="warning" variant="bordered" onPress={() => router.push(`/eti`)}>
                            Back To Homepage
                        </Button>
                        <Button color="warning" variant="bordered" onPress={() => router.push(`/history`)}>
                            Results History
                        </Button>
                        <Button color="warning" variant="bordered" onPress={() => router.push(`#history`)} endContent={<ChevronDownIcon/>}>
                            Check Answers
                        </Button>
                    </div>
                </div>
            </main>
            <div id="history" className="flex flex-col items-center justify-center w-full mt-10 m-auto p-10 gap-4">
                {
                    results.history.map((item, index) => (
                        <ResultQuestionCard key={index} {...item}/>
                    ))
                }
            </div>
        </>
    )
}
export default Page
