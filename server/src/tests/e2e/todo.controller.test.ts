import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import app from "@/app";
import { db } from "@/database/connect";
import { env } from "@/env";
import request from "supertest";

describe("User Testes", () => {
    beforeAll(() => {
        app.listen(env.PORT, () => console.log("Start testes Todo"))
    })
    
    beforeEach(() => {
        execSync('npm run knex -- migrate:rollback --all') 
        execSync('npm run knex -- migrate:latest')
    })

    it("should be possible create a todo", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)

        const { body } = await request(app).post("/api/login/").send({
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(200)

        const token = body.token
        const user_id = body.user.id

        await request(app).post("/api/todos/create/").send({
            task: "complete project", 
            complete: false,
            user_id
        }).set("authorization", token).expect(201)
    })

    it("should be possible get all todos", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)

        const { body } = await request(app).post("/api/login/").send({
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(200)

        const token = body.token
        const user_id = body.user.id

        await request(app).post("/api/todos/create/").send({
            task: "complete project", 
            complete: false,
            user_id
        }).set("authorization", token).expect(201)

        await request(app).post("/api/todos/create/").send({
            task: "complete project 2", 
            complete: false,
            user_id
        }).set("authorization", token).expect(201)

        await request(app).post("/api/todos/create/").send({
            task: "complete project 3", 
            complete: false,
            user_id
        }).set("authorization", token).expect(201)

        const posts = await request(app).get(`/api/todos/${user_id}`).set("authorization", token).expect(200)
        
        expect(posts.body.length).toBe(3)
    })
})