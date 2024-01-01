"use client"
import {useState} from 'react'
import {Skeleton} from "@nextui-org/react";

const Spoiler = ({children, isRevealed, setIsRevealed}) => {
    return (
        <>
            {
                isRevealed ? <span style={{color: "#f5a524"}}>{children}</span> :
                    <div
                        className="w-10 h-6 ml-2 rounded-md"
                        onClick={() => setIsRevealed(!isRevealed)}
                        onMouseOver={() => setIsRevealed(true)}
                        onMouseOut={() => setIsRevealed(false)}
                        style={{backgroundColor: "#f5a524"}}
                    >
                    </div>
            }
        </>
    )
}
export default Spoiler
