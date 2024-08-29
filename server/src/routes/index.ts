import { Router } from "express";

import controllerUser from "@/controllers/user.controller";
import controllerLogin from "@/controllers/login.controller";
import controllerTodo from "@/controllers/todo.controller";

import { validUserData, validUserId } from "@/middlewares/pipes/userPipe";
import { validUserLogin, validUserLoginSecondStep } from "@/middlewares/pipes/loginPipe";

const rotas = Router();

rotas.get("/users/", controllerUser.gets)
rotas.get("/user/:id", validUserId, controllerUser.getUser)
rotas.post("/user/create", validUserData, controllerUser.createUser)
rotas.put("/user/modify/:id", validUserId, controllerUser.modifyUser)
rotas.delete("/user/delete/:id", validUserId, controllerUser.deleteUser)

rotas.post("/login", validUserLogin, controllerLogin.loginUser)
rotas.post("/login/second-step", validUserLoginSecondStep, controllerLogin.secondValidationStep)

rotas.get("/todos/", controllerTodo.getAllTodos)
rotas.get("/user/:id", validUserId, controllerTodo.getOneTodo)
rotas.post("/user/create", validUserData, controllerTodo.createTodo)
rotas.put("/user/modify/:id", validUserId, controllerTodo.modifyTodo)
rotas.delete("/user/delete/:id", validUserId, controllerTodo.deleteTodo)

export default rotas