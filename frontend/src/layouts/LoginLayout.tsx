import LoginBackground from "@/components/login/LoginBackground";
import { Outlet } from "react-router-dom";

export default function LoginLayout(){
    return (
        <section className="grid w-screen h-screen overflow-y-hidden grid-cols-2">
            <LoginBackground />
            <section className="bg-gray60 flex items-center justify-center">
                <Outlet/>
            </section>
        </section>
    )
}