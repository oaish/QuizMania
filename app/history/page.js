"use client";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {useEffect, useMemo, useState} from "react";
import {useSnapshot} from "valtio";
import {store} from "@/app/lib/store";
import './history.css'

export default function Page() {
    const snap = useSnapshot(store)
    const [rows, setRows] = useState([]);

    const columns = [{
        key: "Name", value: "Name"
    }, {
        key: "Marks", value: "Marks"
    }, {
        key: "Time Taken", value: "Time Taken"
    }, {
        key: "Attempted", value: "Attempted"
    }, {
        key: "Correct", value: "Correct"
    }, {
        key: "Percentage", value: "Percentage"
    }];

    async function getResult() {
        const res = await fetch(`/api/get/results?email=${snap.email}`)
        const data = await res.json()
        console.log(`URL: /api/get/results?email=${snap.email}`)
        console.log(data)
        setRows(data)
    }

    useEffect(() => {
        getResult()
        console.log("SET:", selectedKeys)
        console.log("HAS:", selectedKeys.has("ETI"))
    }, [])

    const [selectedKeys, setSelectedKeys] = useState(new Set(["ETI", "MAN"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (<div className="flex flex-col w-[90%] mx-auto mt-5 lg:mt-0 lg:p-20">
        <div className="toolbar mb-5 p-2 flex justify-between"
             style={{backgroundColor: "#18181b", borderRadius: "10px"}}>
            <div className="flex gap-2 items-center ml-2">
                Sub:
                <Dropdown>
                    <DropdownTrigger backdrop="blur">
                        <Button
                            variant="bordered"
                            className="capitalize"
                        >
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Multiple selection example"
                        variant="flat"
                        closeOnSelect={false}
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                        <DropdownItem key="ETI">ETI</DropdownItem>
                        <DropdownItem key="MAN">MAN</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                    >
                        ?
                    </Button>
                </DropdownTrigger>
                <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
                    <DropdownItem key="new" shortcut="A">Attempted</DropdownItem>
                    <DropdownItem key="copy" shortcut="C">Correct</DropdownItem>
                    <DropdownItem key="edit" shortcut="T">Total Marks</DropdownItem>
                    <DropdownItem key="delete" shortcut="%">Percentage</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                <TableColumn>NAME</TableColumn>
                <TableColumn>A</TableColumn>
                <TableColumn>C</TableColumn>
                <TableColumn>T</TableColumn>
                <TableColumn>%</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No results to display."}>
                {rows.map((item) => (
                    selectedKeys.has(item.sub.toUpperCase()) &&
                    (<TableRow key={item._id}>
                        <TableCell>{item.sub.toUpperCase() + " - " + item.type}</TableCell>
                        <TableCell>{item.attempted}</TableCell>
                        <TableCell>{item.correct}</TableCell>
                        <TableCell>{item.marks}</TableCell>
                        <TableCell>{item.percentage}</TableCell>
                    </TableRow>)
                ))}
            </TableBody>
        </Table>
    </div>);
}