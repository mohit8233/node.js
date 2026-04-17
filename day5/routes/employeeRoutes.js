import express, { Router } from "express";

export const employeeRouter = Router()
import { bulkUploadEmployees, createEmployee, deleteEmployee, getAllEmployee, updateEmployee, updateEmployeePartially} from '../controllers/employeeLogic.js'


employeeRouter.post("/create", createEmployee)
employeeRouter.get("/getEmployee", getAllEmployee)
employeeRouter.post("/bulkDataEmployee", bulkUploadEmployees)
employeeRouter.put("/updateFullUpDate/:id", updateEmployee)
employeeRouter.patch("/updatePartial/:id", updateEmployeePartially)
employeeRouter.delete("/deleteEmployee/:id", deleteEmployee)