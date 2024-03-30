"use client";
import {Button, Card, CardBody, CardHeader, Input, Link} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "@/app/auth/login/eyeSlashFilledIcon";
import {EyeFilledIcon} from "@/app/auth/login/eyeFilledIcon";
import {useEffect, useMemo, useState} from "react";
import OtpInput from "@/app/auth/signup/OtpInput";

export default function Page() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    const isEmailInvalid = useMemo(() => {
        if (email === "") return false;
        return !validateEmail(email);
    }, [email]);


    const [password, setPassword] = useState("");
    const isPasswordInvalid = useMemo(() => {
        if (password === "") return false;
        return password.length < 4;
    }, [password]);

    const [username, setUsername] = useState("");
    const isUsernameInvalid = useMemo(() => {
        if (username === "") return false;
        return username.length < 4;
    }, [username]);

    const [otp, setOtp] = useState("");

    const handleSignup = async () => {
        if (username === "" || password === "" || email === "") {
            alert("All Fields are required");
            return
        }

        if (isEmailInvalid || isPasswordInvalid || isUsernameInvalid) {
            return
        }

        const res = await fetch("/api/auth/signup/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })
        const data = await res.json();
        console.log(data);
        if (!data.error) {
            let num = Math.floor(100000 + Math.random() * 900000)
            setOtp(num.toString());
            setIsSubmitted(true);
            await fetch('/api/auth/signup/otp', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    otp: num
                })
            })
        } else {
            setEmailErr(data.error);
        }
    }

    const [isSubmitted, setIsSubmitted] = useState(false);
    return (
        <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <Card className="py-4 sm:w-[100%]">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large lg:text-medium">{!isSubmitted ? "Signup" : "OTP Verification"}</h4>
                </CardHeader>
                <CardBody className="overflow-visible p-4 flex flex-col gap-4">
                    {
                        !isSubmitted ?
                            <>
                                <Input
                                    isClearable
                                    value={username}
                                    type="text"
                                    label="Username"
                                    variant="bordered"
                                    isInvalid={isUsernameInvalid}
                                    color={isUsernameInvalid ? "danger" : ""}
                                    errorMessage={isUsernameInvalid ? "Username should contain more than 4 characters" : null}
                                    placeholder="Enter your username"
                                    onValueChange={setUsername}
                                    className="max-w-xs"
                                    style={{minWidth: "250px"}}
                                />

                                <Input
                                    isClearable
                                    value={email}
                                    type="email"
                                    label="Email"
                                    variant="bordered"
                                    isInvalid={isEmailInvalid}
                                    color={isEmailInvalid ? "danger" : ""}
                                    errorMessage={emailErr !== "" ? emailErr : (isEmailInvalid ? "Please enter a valid email" : null)}
                                    placeholder="Enter your email"
                                    onValueChange={setEmail}
                                    className="max-w-xs"
                                    style={{minWidth: "250px"}}
                                />

                                <Input
                                    value={password}
                                    onValueChange={setPassword}
                                    label="Password"
                                    variant="bordered"
                                    placeholder="Enter your password"
                                    isInvalid={isPasswordInvalid}
                                    color={isPasswordInvalid ? "danger" : ""}
                                    errorMessage={isPasswordInvalid ? "Password length should be greater than 4" : null}
                                    endContent={
                                        <div className="focus:outline-none cursor-pointer" onClick={toggleVisibility}>
                                            {isVisible ? (
                                                <EyeSlashFilledIcon
                                                    className="text-2xl text-default-400 pointer-events-none"/>
                                            ) : (
                                                <EyeFilledIcon
                                                    className="text-2xl text-default-400 pointer-events-none"/>
                                            )}
                                        </div>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="max-w-xs"
                                />

                                <Button
                                    className="w-full bg-warning"
                                    style={{color: "#18181b", fontWeight: "bold"}}
                                    onClick={handleSignup}
                                >
                                    Signup
                                </Button>

                                <div className="text-center" style={{color: "#CCC"}}>Already have an account? <Link
                                    style={{color: "goldenrod"}} href="/auth/login">Login</Link></div>
                            </>
                            : <>
                                <OtpInput otp={otp} username={username} email={email} password={password} />
                            </>
                    }
                </CardBody>
            </Card>
        </div>
    )
}