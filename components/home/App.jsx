"use client"
import {
    Image,
    Card,
    CardBody,
    CardFooter, Spacer
} from "@nextui-org/react";
import {getBreadcrumbs, setBreadcrumb, setInitBreadcrumb} from "@/app/state";

setInitBreadcrumb([
    {
        path: "/",
        name: "Home"
    }
])

export default function App() {
    const crumbs = getBreadcrumbs()
    function handleCardPress(name) {
        if (name === "ETI") {
            setBreadcrumb(crumbs,"/eti","ETI - MCQs")
            window.location.href = "/eti";
        } else if (name === "MAN") {
            setBreadcrumb(crumbs,"/man","MAN - MCQs")
            window.location.href = "/man";
        }
    }
    
    return (
        <main className="flex  justify-center w-full mt-20 p-20 text-center">
            <Card shadow="sm" isPressable onPress={() => handleCardPress("ETI")}>
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
            <Spacer x="20"/>
            <Card shadow="sm" isPressable onPress={() => handleCardPress("MAN")}>
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
