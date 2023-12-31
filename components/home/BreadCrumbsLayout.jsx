"use client"

import {state} from "@/lib/state";
import {useSnapshot} from "valtio";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";

const BreadCrumbsLayout = () => {
    const snap = useSnapshot(state);

    console.log("length",snap.crumbs.length);

    return (
        <div className=" absolute top-20 mx-3">
            {
                snap.crumbs.length > 0 &&
                <Breadcrumbs
                    separator="/"
                    itemClasses={{separator: "px-2"}}
                    size="lg" variant="bordered"
                >
                    {
                        snap.crumbs.map((crumb, index) => {
                            console.log(crumb.path, crumb.name)
                            return (
                                <BreadcrumbItem key={crumb.name}>
                                    <a href={crumb.path}>{crumb.name}</a>
                                </BreadcrumbItem>
                            )
                        })
                    }
                </Breadcrumbs>
            }
        </div>
    )
}
export default BreadCrumbsLayout

