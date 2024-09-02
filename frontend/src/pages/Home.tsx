import { Link } from "react-router-dom";
import Button from "@/components/generics/Button";

export default function HomePage(){
    return(
        <section className="w-screen h-screen bg-primary flex items-center justify-center flex-col">
            <h1 className="text-white text-6xl uppercase font-bold">Todo Project</h1>
            <div className="flex gap-2 w-max mt-8">
                <Link to={"/user"}>
                    <Button content="Entre na sua conta" btnStyle="!bg-white !text-primary text-nowrap hover:!bg-primary hover:border-white hover:!text-white"/>
                </Link>
                <Link to={"login/create"}>
                    <Button content="Crie uma conta" className="btn secondary"/>
                </Link>
            </div>
        </section>
    )
}