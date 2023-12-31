"use client";
import {getBreadcrumbs, setBreadcrumb, setInitBreadcrumb} from "@/app/state";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";


setInitBreadcrumb([
    {
        path: "/",
        name: "Home"
    },
    {
        path: "/man",
        name: "MAN - MCQs"
    }
])

const Page = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    function handleCardClick(type) {
        let slug = ""
        let path = "man/" + type
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

            <Card className="py-4" isPressable onClick={onOpen}>
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

            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex">Choose Unit:</ModalHeader>
                            <ModalBody className="pt-0 mx-3 mb-3">
                                <Button color="warning" variant="bordered" onPress={() => {
                                    localStorage.setItem("ut", "1");
                                    handleCardClick("unit_test");
                                }}>
                                    Unit I
                                </Button>
                                <Button color="warning" onPress={() => () => {
                                    localStorage.setItem("ut", "2");
                                    handleCardClick("unit_test");
                                }}>
                                    Unit II
                                </Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main>
    )
}
export default Page
