import { iItemTodo } from '@/@types/components';

import { AiOutlineDelete } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import { RiPencilFill } from "react-icons/ri";

export default function ItemTodo({ todo, handleDeleteTodo, handleCompleteTodo, openModalEdit }: iItemTodo) {
    return (
        <div className="flex justify-between items-center p-6 pb-2 pt-4 mb-2 w-[99%] border border-gray-200 rounded">
            <div className="flex justify-between items-center w-full md:flex-col md:gap-4">
                <hgroup>
                    <h4 className="text-xl text-primary font-bold m-0">{todo.task_title}</h4>
                    <p className="text-sm mt-2">{todo.task_description}</p>
                </hgroup>
                <section className="flex gap-2">
                    <RiPencilFill
                        className="cursor-pointer text-3xl hover:text-primary"
                        onClick={() => openModalEdit(todo)}
                        title="Edit?"
                    />
                    <BsCheckLg
                        className={`cursor-pointer text-3xl ${todo.complete ? "text-green-500": ""}  hover:text-green-500`}
                        onClick={() => handleCompleteTodo(todo.id, todo)}
                        title="Complete?"
                    />
                    <AiOutlineDelete
                        className="cursor-pointer text-3xl hover:text-red"
                        onClick={() => handleDeleteTodo(todo.id)}
                        title="Delete?"
                    />
                </section>
            </div>
        </div>
    )
}
