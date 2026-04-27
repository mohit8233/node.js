import { Router } from "express";
import { bulkStudent, createData, deleteStudent, getStudent, updateData, updateDataPartially } from "../controllers/userController.js";


export const dataRouter = Router();


dataRouter.post("/create", createData);
dataRouter.post("/bulkupload", bulkStudent);
dataRouter.get("/getData", getStudent);
dataRouter.put("/update/:id", updateData);
dataRouter.patch("/updatePartial/:id", updateDataPartially);
dataRouter.delete("/delete/:id",deleteStudent)
