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
        <main className="flex flex-col gap-20 lg:flex-row justify-center w-full mt-12 lg:mt-20 p-4 lg:p-20 text-center">
            <Card shadow="sm" isPressable onPress={() => handleCardPress("eti")}>
                <CardBody className="overflow-visible p-0">
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt=""
                        className="w-full object-cover lg:h-[270px] aspect-video"
                        src="/eti.webp"
                    />
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b></b>
                    <p className="text-default-500">ETI - MCQs</p>
                </CardFooter>
            </Card>
            <Card shadow="sm" isPressable onPress={() => handleCardPress("man")}>
                <CardBody className="overflow-visible p-0">
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt=""
                        className="w-full object-cover h-[270px] aspect-video"
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
