import { useEffect, useState } from "react";
import { TypeChangeModalState } from "@/@types/components";
import InputBox from "../generics/InputBox";

export default function ModalEditTodo({ changeModal, currentTodo }: TypeChangeModalState) {
    const [title, setTitle] = useState(currentTodo.task_title);
    const [description, setDescription] = useState(currentTodo.task_description);

    useEffect(() => {
        console.log(currentTodo, "a1ui")
        setTitle(currentTodo.task_title);
        setDescription(currentTodo.task_description);
    }, [currentTodo]);

    function handleClickOutside(e: any): void {
        if (e.target === e.currentTarget) {
            changeModal(false);
        }
    }

    function ToogleModal() {
        changeModal(false);
    }

    return (
        <div className="fixed w-screen h-screen flex items-center justify-center inset-0 z-20 bg-modalBg" onClick={handleClickOutside}>
            <div className="w-[20rem] h-max bg-white p-8 rounded-md">
                <input
                    minLength={3}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    minLength={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>
    );
}
