"use client"
import {
    Image,
    Card,
    CardBody,
    CardFooter, Spacer
} from "@nextui-org/react";
import {useRouter} from "next/navigation";

export default function App() {
    const router = useRouter();

    function handleCardPress(path) {
        router.push("/" + path);
    }
    
    return (
        <main className="flex flex-col lg:flex-row justify-center w-full mt-20 p-20 text-center">
            <Card shadow="sm" isPressable onPress={() => handleCardPress("eti")}>
                <CardBody className="overflow-visible p-0">
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt=""
                        className="w-full object-cover h-[270px]"
                        src="/eti.webp"
                    />
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b></b>
                    <p className="text-default-500">ETI - MCQs</p>
                </CardFooter>
            </Card>
            <Spacer x="20" y="20"/>
            <Card shadow="sm" isPressable onPress={() => handleCardPress("man")}>
                <CardBody className="overflow-visible p-0">
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt=""
                        className="w-full object-cover h-[270px]"
                        src="/man.jpg"
                    />
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b></b>
                    <p className="text-default-500">MAN - MCQs</p>
                </CardFooter>
            </Card>
        </main>
    );
}
