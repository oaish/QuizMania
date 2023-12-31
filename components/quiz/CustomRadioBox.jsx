import React from "react";
import {Checkbox, Link, User, Chip, cn} from "@nextui-org/react";

export const CustomCheckbox = ({ option, value, onChange, isSelected }) => {
    return (
        <Checkbox
            onChange={onChange}
            color="warning"
            classNames={{
                base: cn(
                    "inline-flex max-w-full w-full bg-content1 m-0",
                    "hover:bg-content2 items-center justify-start",
                    "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-warning"
                ),
                label: "w-full",
            }}
            isSelected={isSelected}
            value={value}
        >
            <div className="w-full flex text-left gap-2">
                <p>{option}</p>
            </div>
        </Checkbox>
    );
};
