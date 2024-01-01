import React from 'react'
import {Card, Skeleton, Spacer} from "@nextui-org/react";

const CustomSkeleton = () => {
    return (
        <div
            className="absolute bg-neutral-950 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-[50rem] h-[25rem] w-[80%] flex-col flex justify-center gap-6 p-6">
            <Skeleton className="rounded-lg">
                <div className="h-[50px] rounded-lg bg-default-300"></div>
            </Skeleton>
            <Spacer y="2"/>
            <div className="space-y-3">
                <Skeleton className="w-[100%] rounded-lg bg-amber-50">
                    <div className="h-[50px] rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-[100%] rounded-lg">
                    <div className="h-[50px] rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-[100%] rounded-lg">
                    <div className="h-[50px] rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-[100%] rounded-lg">
                    <div className="h-[50px] rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </div>
    )
}
export default CustomSkeleton
