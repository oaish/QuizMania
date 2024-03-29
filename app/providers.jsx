'use client'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    Link,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Avatar,
    DropdownMenu,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
} from "@nextui-org/react";
import {AcmeLogo} from "@/components/home/AcmeLogo";
import {NextUIProvider} from '@nextui-org/react'
import {useEffect, useState} from "react";
import BreadCrumbsLayout from "@/components/home/BreadCrumbsLayout";
import {usePathname, useRouter} from "next/navigation";

export function Providers({children}) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname()
    const isAllQuestionsPage = pathname.includes('/all');
    const [isMobile, setIsMobile] = useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
            console.clear();
            console.log("Is Mobile");
        }
    }, [])

    return (
        <NextUIProvider>
            <Navbar isBordered>
                <NavbarContent>
                    <NavbarBrand>

                        {
                            !isAllQuestionsPage ?
                                <>
                                    <AcmeLogo/>
                                    <p className="font-bold text-xl text-inherit">QUIZMania</p>
                                </>
                                : isMobile ? <div className="flex justify-center unit-btn-group">
                                    <a title={"Jump to Unit I"} style={{backgroundColor: "goldenrod"}} href="#I">I</a>
                                    <a title={"Jump to Unit II"} style={{backgroundColor: "limegreen"}} href="#II">II</a>
                                    <a title={"Jump to Unit III"} style={{backgroundColor: "#AB149E"}} href="#III">III</a>
                                    <a title={"Jump to Unit IV"} style={{backgroundColor: "crimson"}} href="#IV">IV</a>
                                    <a title={"Jump to Unit V"} style={{backgroundColor: "teal"}} href="#V">V</a>
                                    <a title={"Jump to Unit VI"} style={{backgroundColor: "rebeccapurple"}}
                                       href="#VI">VI</a>
                                </div> : <>
                                    <AcmeLogo/>
                                    <p className="font-bold text-xl text-inherit">QUIZMania</p>
                                </>
                        }
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="warning"
                                name="Oaish Qazi"
                                size="sm"
                                radius="sm"
                                src="/AK.jpg"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">oaishazher@gmail.com</p>
                            </DropdownItem>
                            <DropdownItem key="history" onPress={() => router.push(`/history`)}>
                                Results History
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
            <BreadCrumbsLayout/>
            {children}
        </NextUIProvider>
    )
}