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
import { Image } from "@nextui-org/react";
import {NextUIProvider} from '@nextui-org/react'
import React, {useEffect, useState} from "react";
import BreadCrumbsLayout from "@/components/home/BreadCrumbsLayout";
import {usePathname, useRouter} from "next/navigation";
import {store} from "@/app/lib/store";
import {useSnapshot} from "valtio";

export function Providers({children}) {
    const router = useRouter();
    const snap = useSnapshot(store);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname()
    const isAllQuestionsPage = pathname.includes('/all');
    const isAuthPage = pathname.includes('/auth');
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
        }

        if (snap.email === "" && !isAuthPage) {
            let token = localStorage.getItem("token")
            if (token === "null" || token === null) {
                router.replace('/auth/login')
            }
            const getUser = async () => {
                const res = await fetch("/api/auth/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({token: token}),
                })

                const data = await res.json()
                store.email = data.email
                store.username = data.username
            }
            getUser().then()
        }
    }, [])

    function handleLogout() {
        localStorage.removeItem("token")
        router.replace('/auth/login')
        return undefined;
    }

    return (
        <NextUIProvider>
            <Navbar isBordered>
                <NavbarContent>
                    <NavbarBrand>
                        {
                            !isAllQuestionsPage ?
                                <>
                                    <Image src="/logo.png" alt="QUIZMania Logo" width={48} height={48}/>
                                    <p className="font-bold text-xl text-inherit ml-2">QUIZMania</p>
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
                                    <Image src="/logo.png" alt="QUIZMania Logo" width={48} height={48}/>
                                    <p className="font-bold text-xl text-inherit">QUIZMania</p>
                                </>
                        }
                    </NavbarBrand>
                </NavbarContent>

                {
                    !isAuthPage &&
                    <NavbarContent justify="end">
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    style={{outline: "3px solid goldenrod", outlineOffset: "2px"}}
                                    as="button"
                                    className="transition-transform"
                                    color="warning"
                                    name={snap.username}
                                    size="sm"
                                    radius="sm"
                                    src="/AK.jpg"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{snap.email}</p>
                                </DropdownItem>
                                <DropdownItem key="history" onPress={() => router.push(`/history`)}>
                                    Results History
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger" className="text-danger"
                                              onPress={() => handleLogout()}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarContent>}
            </Navbar>
            {!isAuthPage && <BreadCrumbsLayout/>}
            {children}
        </NextUIProvider>
    )
}