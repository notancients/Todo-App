
import express, { Router } from "express";
import { addUser, deleteUser, editUser, getUserDetails } from "../controllers/user_controller";
import multerUpload from "../utility/multer";

const userRouter: Router = express.Router();

userRouter.post("/add-user/:userId", multerUpload.array('files'), addUser);
userRouter.get("/get-user/:userId", getUserDetails)
userRouter.patch('/edit-user/:userId', editUser);
userRouter.delete("/delete-user/:userId", deleteUser);

export default userRouter;