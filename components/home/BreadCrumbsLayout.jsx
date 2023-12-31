"use client"

import {BreadcrumbItem, Breadcrumbs, Link} from "@nextui-org/react";
import {getBreadcrumbs} from "@/app/state";

const BreadCrumbsLayout = () => {
    const crumbs = getBreadcrumbs()
    return (
        <div className=" absolute top-20 mx-3">
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

