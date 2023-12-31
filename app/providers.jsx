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
import {useState} from "react";
import BreadCrumbsLayout from "@/components/home/BreadCrumbsLayout";
import {useRouter} from "next/navigation";

export function Providers({children}) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    return (
        <NextUIProvider>
            <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <AcmeLogo />
                        <p className="font-bold text-xl text-inherit">QUIZMania</p>
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
                                //https://i.pravatar.cc/150?u=a04258a2462d826712d
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
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                className="w-full"
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
            <BreadCrumbsLayout/>
            {children}
        </NextUIProvider>
    )
}