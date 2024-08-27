import { Router } from "express";

import controllerUser from "@/controllers/user.controller";
import controllerLogin from "@/controllers/login.controller";
import controllerTodo from "@/controllers/todo.controller";

import { validUserData, validUserId } from "@/middlewares/pipes/userPipe";
import { validUserLogin } from "@/middlewares/pipes/loginPipe";

const rotas = Router();

rotas.get("/users/", controllerUser.gets)
rotas.get("/user/:id", validUserId, controllerUser.getUser)
rotas.post("/user/create", validUserData, controllerUser.createUser)
rotas.put("/user/modify/:id", validUserId, controllerUser.modifyUser)
rotas.delete("/user/delete/:id", validUserId, controllerUser.deleteUser)

rotas.post("/login", validUserLogin, controllerLogin.loginUser)
rotas.post("/login/second-step", controllerLogin.loginUser)


export default rotas