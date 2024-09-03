import { useContext } from "react";
import { FaUser } from "react-icons/fa6";

import { iContext } from "@/@types/dataJson";

import { UserContext } from "@/components/Context";
import Button from "@/components/generics/Button";

export default function Header() {
    const { userLogout } = useContext(UserContext) as iContext;

    function handleUserLogout() {
        userLogout()
        window.location.reload()
    }

    return (
        <header className="w-full bg-purpleLigth h-14 flex items-center justify-end">
            <Button content="Logout/Sair" onClick={handleUserLogout} btnStyle="!w-32 !h-8"/>   
            <FaUser className="mx-8"/>
        </header>
    )
}