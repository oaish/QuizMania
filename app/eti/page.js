"use client";
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
import {useRouter} from "next/navigation";

const Page = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const router = useRouter();

    function handleCardClick(type) {
        let path = "eti/" + type
        router.push(path);
    }

    return (
        <main className="flex flex-col lg:flex-row sm:gap-10 lg:justify-around w-full mt-5 lg:mt-20 p-20 text-center">
            <div className="mb-10">
                <Card className="py-4" isPressable onClick={() => handleCardClick("all")}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">All Questions</p>
                        <small className="text-default-500">Limitless</small>
                        <h4 className="font-bold text-large">Practise MCQs</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="/practise.jpg"
                            width={270}
                        />
                    </CardBody>
                </Card>
            </div>

            <div className="mb-10">
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
            </div>

            <div className="mb-10">
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
            </div>

            <div className="mb-10">
                <Card className="py-4" isPressable onClick={() => handleCardClick("ese")}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">70 Marks</p>
                        <small className="text-default-500">1.5 Hour</small>
                        <h4 className="font-bold text-large lg:text-medium">End Semester Exam</h4>
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
            </div>

            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex">Choose Unit:</ModalHeader>
                            <ModalBody className="pt-0 mx-3 mb-3">
                                <Button color="warning" variant="bordered" onPress={() => {
                                    if (typeof window !== "undefined") {
                                        localStorage.setItem("ut", "1");
                                    }
                                    handleCardClick("unit_test/1");
                                }}>
                                    Unit I
                                </Button>
                                <Button color="warning" onPress={() => () => {
                                    handleCardClick("unit_test/2");
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
