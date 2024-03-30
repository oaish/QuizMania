"use client";
import {Button, Card, CardBody, CardHeader, Input, Link} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "@/app/auth/login/eyeSlashFilledIcon";
import {EyeFilledIcon} from "@/app/auth/login/eyeFilledIcon";
import {useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import {useSnapshot} from "valtio";
import {store} from "@/app/lib/store";

export default function Page() {
    const snap = useSnapshot(store)
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        })

        const data = await res.json()

        if (data.success) {
            localStorage.setItem("token", data.token);
            store.email = data.email
            store.username = data.username
            location.href = "/";
        }
        else {
            alert('Invalid Credentials');
        }
    }

    return (
        <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <Card className="py-4 sm:w-[100%]">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large lg:text-medium">Login</h4>
                </CardHeader>
                <CardBody className="overflow-visible p-4 flex flex-col gap-4">
                    <Input
                        value={email}
                        type="email"
                        label="Email"
                        variant="bordered"
                        placeholder="Enter your email"
                        onValueChange={setEmail}
                        className="max-w-xs"
                        style={{minWidth: "250px"}}
                    />

                    <Input
                        value={password}
                        label="Password"
                        variant="bordered"
                        onValueChange={setPassword}
                        placeholder="Enter your password"
                        endContent={
                            <div className="focus:outline-none cursor-pointer" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                )}
                            </div>
                        }
                        type={isVisible ? "text" : "password"}
                        className="max-w-xs"
                    />

                    <Button
                        className="w-full bg-warning"
                        onClick={handleLogin}
                        style={{color: "#18181b", fontWeight: "bold"}}
                    >Login</Button>

                    <div className="text-center" style={{color: "#CCC"}}>New here? <Link style={{color: "goldenrod"}} href="/auth/signup">Sign up</Link></div>
                </CardBody>
            </Card>
        </div>
    )
}