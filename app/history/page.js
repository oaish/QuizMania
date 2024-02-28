"use client";

import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useSnapshot} from "valtio";
import {store} from "@/app/lib/store";

export default function Page() {
    const snap = useSnapshot(store)
    const [rows, setRows] = useState([]);

    const columns = [
        {
            key: "Name",
            value: "Name"
        },
        {
            key: "Marks",
            value: "Marks"
        },
        {
            key: "Time Taken",
            value: "Time Taken"
        },
        {
            key: "Attempted",
            value: "Attempted"
        },
        {
            key: "Correct",
            value: "Correct"
        },
        {
            key: "Percentage",
            value: "Percentage"
        }
    ];

    async function getResult() {
        console.log(`/api/get/results?username=${snap.username}`)
        const res = await fetch(`/api/get/results?username=${snap.username}`)
        const data = await res.json()
        setRows(data)
    }

    useEffect(() => {
        getResult()
    }, [])

    return (
        <div className="flex w-[100%] mt-10 lg:mt-0 lg:p-20">
            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ATTEMPTED</TableColumn>
                    <TableColumn>CORRECT</TableColumn>
                    <TableColumn>PERCENTAGE</TableColumn>
                    <TableColumn>SUBJECT</TableColumn>
                    <TableColumn>MARKS</TableColumn>
                    <TableColumn>TIME TAKEN</TableColumn>
                </TableHeader>
                <TableBody items={rows}>
                    {(item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item._id.slice(-2).toUpperCase()}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.attempted + " / " + item.marks}</TableCell>
                            <TableCell>{item.correct + " / " + item.marks}</TableCell>
                            <TableCell>{item.percentage + "%"}</TableCell>
                            <TableCell>{item.sub?.toUpperCase()}</TableCell>
                            <TableCell>{item.marks + " M"}</TableCell>
                            <TableCell>{item.timeTaken}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}