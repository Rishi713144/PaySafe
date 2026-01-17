
"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthForm() {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.status === "authenticated") {
            router.replace("/dashboard");
        }
    }, [session.status, router]);

    if (session.status === "authenticated") {
        return null;
    }

    const [phone, setPhone] = useState("");

    const [password, setPassword] = useState("");

    return <div className="flex flex-col justify-center items-center h-screen bg-[#ebe6e6]">
        <div className="w-[400px]">
            <Card title="Login">
                <div className="w-full pt-4">
                    <TextInput label="Phone Number" placeholder="1231231231" onChange={(val) => {
                        setPhone(val);
                    }} />
                    <div className="pt-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            placeholder="Password" 
                        />
                    </div>
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            const res = await signIn("credentials", {
                                phone: phone,
                                password: password,
                                redirect: false,
                            });
                            if (res?.ok) {
                                router.push("/dashboard");
                            } else {
                                alert("Login failed");
                            }
                        }}>
                            Login
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
}
