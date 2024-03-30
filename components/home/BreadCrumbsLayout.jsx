"use client"

import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";
import {usePathname} from 'next/navigation';
import {useEffect, useState} from "react";
import {splitPath} from "@/app/lib/helper";

const BreadCrumbsLayout = () => {
    const pathname = usePathname();
    let crumbs = [];
    if (pathname === "/") {
        crumbs = [
            {
                path: "/",
                name: "Home",
            }
        ]
    } else if (pathname === "/admin") {
        crumbs = [
            {
                path: "/",
                name: "Home",
            },
            {
                path: "/admin",
                name: "Admin",
            }
        ]
    } else {
        crumbs = splitPath(pathname)
    }

    return (
        <div className="top-20 mx-3 mt-3">
            <Breadcrumbs
                color="warning"
                size="lg" variant="bordered"
            >
                {
                    crumbs.map((crumb) => {
                        return (
                            <BreadcrumbItem href={crumb.path} key={crumb.name}>
                                {crumb.name}
                            </BreadcrumbItem>
                        )
                    })
                }
            </Breadcrumbs>
        </div>
    )
}
export default BreadCrumbsLayout

