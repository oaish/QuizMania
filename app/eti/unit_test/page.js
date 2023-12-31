"use client";
import {Image, Card, CardBody, CardHeader} from "@nextui-org/react";
import {getBreadcrumbs, setBreadcrumb, setInitBreadcrumb} from "@/lib/state";

setInitBreadcrumb([
    {
        path: "/",
        name: "Home"
    },
    {
        path: "/eti",
        name: "ETI - MCQs"
    }
])

const Page = () => {
    function handleCardClick(type) {
        let slug = ""
        let path = "eti/" + type
        switch (type) {
            case "quick_test":
                slug = "Quick MCQ Test"
                break;
            case "unit_test":
                slug = "Unit Wise Test"
                break;
            case "ese":
                slug = "End Semester Exam"
                break;
        }
        setBreadcrumb(getBreadcrumbs(), path, slug)
        window.location.href = path;
    }

    return (
        <main className="flex justify-around w-full mt-20 p-20 text-center">
            <Card className="py-4" isPressable onPress={() => handleCardClick("quick_test")}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">20 Marks</p>
                    <small className="text-default-500">1 Hour</small>
                    <h4 className="font-bold text-large">Quick MCQ Test</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/quick_test.jpg"
                        width={270}
                    />
                </CardBody>
            </Card>

            <Card className="py-4" isPressable onClick={() => handleCardClick("unit_test")}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">20 Marks</p>
                    <small className="text-default-500">1 Hour</small>
                    <h4 className="font-bold text-large">Unit Wise Test</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/unit_test.jpg"
                        width={270}
                    />
                </CardBody>
            </Card>

            <Card className="py-4" isPressable onClick={() => handleCardClick("ese")}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">70 Marks</p>
                    <small className="text-default-500">1.5 Hour</small>
                    <h4 className="font-bold text-large">End Semester Exam</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/ese.jpg"
                        width={270}
                    />
                </CardBody>
            </Card>
        </main>
    )
}
export default Page
