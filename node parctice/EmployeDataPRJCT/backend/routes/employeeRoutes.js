import { Router } from "express";
import { bulkUploadEmployee, createEmployee, deleteEmployee, getAllEmployee, updateEmployee, updateEmployeePartially } from "../controllers/employeeLogic.js";
import { protect } from "../Middleware/authMiddleware.js";

export const employeeRouter = Router();


employeeRouter.post("/create",protect, createEmployee)
employeeRouter.get("/getEmployee",protect, getAllEmployee)
employeeRouter.post("/bulkDataEmployee",protect, bulkUploadEmployee)
employeeRouter.put("/updateFullUpDate/:id",protect, updateEmployee)
employeeRouter.patch("/updatePartial/:id",protect, updateEmployeePartially)
employeeRouter.delete("/deleteEmployee/:id",protect, deleteEmployee)