import React from "react";
import {Checkbox, cn, Radio} from "@nextui-org/react";

export const CustomRadioBox = (props) => {
    const {children, option, isInvalid, ...otherProps} = props;
    return (
        <Radio
            {...otherProps}
            color="warning"
            classNames={{
                base: cn(
                    "inline-flex max-w-full w-full bg-content1 m-0",
                    "hover:bg-content2 items-center justify-start",
                    "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                    (isInvalid ? "data-[selected=true]:border-danger" : "data-[selected=true]:border-warning"),
                ),
                label: "w-full",
            }}
        >
            {children}
        </Radio>
    );
};
