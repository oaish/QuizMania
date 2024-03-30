import React, {useState, useRef} from 'react';
import './style.css';
import {Button} from "@nextui-org/react";
import {store} from "@/app/lib/store";
import {useRouter} from "next/navigation";

const OtpInput = ({otp, username, password, email}) => {
    const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const router = useRouter();

    const handleInputChange = (index, e) => {
        const {value} = e.target;
        if (!isNaN(value)) {
            const newInputValues = [...inputValues];
            newInputValues[index] = value;
            setInputValues(newInputValues);
            if (value !== '') {
                const nextIndex = index + 1;
                if (nextIndex < inputRefs.current.length) {
                    inputRefs.current[nextIndex].focus();
                }
            }
        } else {
            e.target.value = '';
        }
    };

    const handleBackspaceDelete = (index, e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            const newInputValues = [...inputValues];
            newInputValues[index] = '';
            setInputValues(newInputValues);
            const prevIndex = index - 1;
            if (prevIndex >= 0) {
                inputRefs.current[prevIndex].focus();
            }
        } else if (e.key === 'ArrowLeft') {
            const prevIndex = index - 1;
            if (prevIndex >= 0) {
                inputRefs.current[prevIndex].focus();
            }
        } else if (e.key === 'ArrowRight') {
            const nextIndex = index + 1;
            if (nextIndex < inputRefs.current.length) {
                inputRefs.current[nextIndex].focus();
            }
        }
    };

    const handleClick = async () => {
        const inp = inputValues.join('');
        console.log(otp, inp);

        if (otp !== inp) {
            alert("OTP is incorrect");
            return
        }
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        });

        const data = await res.json();
        if (data.error) {
            alert(data.error);
            return
        }
        localStorage.setItem("token", data.token);
        store.email = data.email
        store.username = data.username
        alert("OTP is verified");
        location.href = "/";
    };


    const renderInputs = () => {
        return inputValues.map((value, index) => (
            <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="input"
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={value}
                onChange={(e) => handleInputChange(index, e)}
                onKeyUp={(e) => handleBackspaceDelete(index, e)}
            />
        ));
    };

    return (
        <>
            <div className="container">
                <div id="inputs" className="inputs">
                    {renderInputs()}
                </div>
            </div>
            <Button className="w-full bg-warning"
                    onClick={handleClick}
                    style={{color: "#18181b", fontWeight: "bold"}}>
                Submit
            </Button>
        </>
    );
};

export default OtpInput;
