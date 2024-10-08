import { FormEvent, useContext, useEffect, useState } from "react"

import { iContext, iTodo } from "@/@types/dataJson";

import { UserContext } from "@/components/Context";
import ItemTodo from "@/components/todo/ItemTodo";
import InputBox from "@/components/generics/InputBox";
import Button from "@/components/generics/Button";
import SpinLoader from "@/components/generics/SpinLoader";
import ModalEditTodo from "@/components/todo/ModalEditTodo";
import Header from "@/components/generics/Header";

import { getAllDataTodo, createDataTodo, deleteTodo, modifyDataTodo } from "@/helpers/ApiRoutes"

import useFetch from "@/hooks/useFetch"
import useForm from "@/hooks/useForm";

import CookiesWork from '../utils/cookies';

export default function UserHome() {
    const dataContext = useContext(UserContext) as iContext;
    
    const Cookies = CookiesWork()
    
    const [dataTodo, setDataTodo] = useState<iTodo[]>([])
    const [showModal, setShowModal] = useState(false)
    const [todoToEdit, setTodoToEdit] = useState<iTodo | null>(null)
    
    const { erro, load, request } = useFetch()

    const TitleTask = useForm("")
    const DescriptionTask = useForm("")

    const tokenLogin = Cookies.getCookie('token-todo-api');

    useEffect(() => {
        window.document.title = 'My Todos'
    }, [])

    async function getDataUser() {
        const { url, options } = getAllDataTodo({
            token: tokenLogin!,
            userId: dataContext.dados.id,
        })

        const { json, response } = await request<iTodo[]>(url, options)

        if ((await response).status === 200) {
            setDataTodo(json)
        }
    }

    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault();

        const isValidTodoData = TitleTask.validate() && DescriptionTask.validate()

        if (isValidTodoData) {
            const todo = {
                task_title: TitleTask.value,
                task_description: DescriptionTask.value,
                complete: false,
                user_id: dataContext.dados.id,
            }

            const { url, options } = createDataTodo({
                token: tokenLogin!,
                todo,
            })

            const sendData = await fetch(url, options)

            if (sendData.status == 201) {
                getDataUser()
            }
        }
    }

    async function handleDeleteTodo(id: string) {
        if (typeof id !== "string") return

        const { url, options } = deleteTodo({
            userId: dataContext.dados.id,
            id,
            token: tokenLogin!,
        })

        const sendData = await fetch(url, options)

        if (sendData.status == 200) {
            getDataUser()
        }
    }

    async function handleEditTodo(id: string, todo: iTodo) {
        if (typeof id !== "string") return

        const { url, options } = modifyDataTodo({
            userId: dataContext.dados.id,
            id,
            token: tokenLogin!,
            todo: {
                ...todo,
                user_id: dataContext.dados.id,
            }
        })

        const sendData = await fetch(url, options)

        if (sendData.status == 200) {
            getDataUser()
        }
    }

    async function handleCompleteTodo(id: string, todo: iTodo) {
        await handleEditTodo(id, {
            ...todo,
            complete: !todo.complete,
        })
    }

    async function openModalEdit(todo: iTodo) {
        setTodoToEdit(todo)
        setShowModal(true);  
    }

    useEffect(() => {
        getDataUser()
    }, [])

    if (load) {
        return <SpinLoader />
    }

    if (erro) {
        return <>Error</>
    }

    return (
        <>
            <div className="w-screen h-screen flex items-center flex-col gap-4 bg-primary">
                <Header/>
                <h1 className="text-center font-bold text-4xl mt-12 text-white">My ToDos</h1>
                <div className="w-2/3 min-h-fit max-h-[66%] p-2 mx-auto border rounded bg-white sm:w-[85%]">
                    <form className="flex gap-2 w-full mb-4 sm:grid md:grid-cols-2" onSubmit={handleFormSubmit}>
                        <InputBox idName="title-input" minLength={3} labelName="Title" {...TitleTask} />
                        <InputBox idName="description-input" minLength={3} labelName="Description" {...DescriptionTask} />
                        <Button content="Criar Task" btnStyle="!w-48 !text-xs !h-10 self-center md:!w-full" typeBtn="submit" />
                    </form>
                    <section className="overflow-y-scroll max-h-[74%] sm:max-h-[60%]">
                        {dataTodo.map(todo => (
                            <ItemTodo todo={todo} key={todo.id} handleDeleteTodo={handleDeleteTodo} handleCompleteTodo={handleCompleteTodo} openModalEdit={openModalEdit} />
                        ))}
                    </section>
                </div>
            </div>
            {
                showModal && todoToEdit && 
                <ModalEditTodo 
                    changeModal={setShowModal} 
                    currentTodo={todoToEdit} 
                    setCurrentTodo={setTodoToEdit} 
                    handleEditTodo={handleEditTodo}
                />
            } 
        </>
    )
}
