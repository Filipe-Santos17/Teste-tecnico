import { MouseEvent } from "react";

import { TypeChangeModalState } from "@/@types/components";
import { iTodo } from "@/@types/dataJson";

import { AiOutlineCloseCircle } from "react-icons/ai";

import InputBox from "@/components/generics/InputBox";
import Button from "../generics/Button";

export default function ModalEditTodo({ changeModal, currentTodo, setCurrentTodo, handleEditTodo }: TypeChangeModalState) {
    function ToogleModal() {
        changeModal(false);
    }

    function handleClickOutside(e: MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) {
            ToogleModal()
        }
    }

    function changeData(value: string | boolean, label: keyof iTodo) {
        setCurrentTodo(oldV => {
            return oldV ? { ...oldV, [label]: value } : null;
        });
    }

    function sendData(){
        ToogleModal()
        handleEditTodo(currentTodo.id, currentTodo)
    }

    return (
        <div className="fixed w-screen h-screen flex flex-col items-center justify-center inset-0 z-20 bg-modalBg" onClick={handleClickOutside}>
            <div className="relative w-[20rem]">
                <AiOutlineCloseCircle 
                    className="absolute top-3 right-3 text-xl cursor-pointer"
                    onClick={ToogleModal}
                />
            </div>
            <div className="w-[20rem] h-max bg-white p-8 rounded-md flex flex-col gap-4">
                <InputBox
                    idName="title-input-edit"
                    minLength={3}
                    labelName="Title"
                    value={currentTodo.task_title}
                    onChange={e => changeData(e.currentTarget.value, "task_title")}
                />

                <InputBox
                    idName="description-input-edit"
                    minLength={3}
                    labelName="Description"
                    value={currentTodo.task_description}
                    onChange={e => changeData(e.currentTarget.value, "task_description")}
                />

                <InputBox
                    idName="complete-input-edit"
                    minLength={3}
                    type="checkbox"
                    className=""
                    labelName="Complete"
                    checked={currentTodo.complete}
                    onChange={e => changeData(e.currentTarget.checked, "complete")}
                />

                <Button content="Edit" btnStyle="mt-2" onClick={sendData}/>
            </div>
        </div>
    );
}
