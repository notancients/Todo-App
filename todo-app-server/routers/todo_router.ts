import express, { Router } from "express";
import { addTodo, getTodoByUser, editTodo, deleteTodo, getTodoDetails, markAsDone } from "../controllers/todo_controller";
import multerUpload from "../utility/multer";

const todoRouter: Router = express.Router();

todoRouter.post("/add-todo", multerUpload.array('files') ,addTodo);
todoRouter.get("/get-todo/:userId", getTodoByUser)
todoRouter.patch('/edit-todo/:todoId', multerUpload.array('files'), editTodo);
todoRouter.delete("/delete-todo/:todoId", deleteTodo);
todoRouter.get("/todo-details/:todoId", getTodoDetails);
todoRouter.patch('/mark-done/:todoId/:isCompleted', markAsDone);

export default todoRouter;