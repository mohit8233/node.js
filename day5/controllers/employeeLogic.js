

// import express from "express";
import { Employee } from "../models/employeeModel.js";

import { employeeRouter } from "../routes/employeeRoutes.js";


// // create 
// export const createEmployee = async (req, res) => {
//     try {

//         const { name, email, age, department, salary } = req.body;
//         if (!name || !email || !age || !department || !salary) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Payload missing"
//             });
//         }
//         const employee = await Employee.create({
//             name,
//             email,
//             age,
//             department,
//             salary,

//         });

//         return res.status(201).json({
//             status: true,
//             message: "Data got Created",
//             data: employee
//         })

//     } catch (error) {
//         console.log(error);
//         console.log(error.message);
//         return res.status(500).json({
//             status: false,
//             message: `Error in creating Employee ${error.message}`,

//         })



//     }
// }

// export const bulkUploadEmployees = async (req, res) => {
//     try {
//         const employee = req.body;
//         // const employee =[{},{}]
//         if (!Array.isArray(employee)) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Invalid data OR not an array"
//             });
//         }
//         const result = await Employee.insertMany(employee);
//         return res.status(201).json({
//             status: true,
//             message: "Data got Inserted",
//             data: result
//         })


//     } catch (error) {
//         return res.status(400).json({
//             status: false,
//             message: `Error in insertData ${error.message}`
//         });

//     }
// }

// //Read, serach, sort, orderBy

// export const getAllEmployee = async (req, res) => {
//     try {
//         const { search, sortBy, order } = req.query;

//         let query = {};

//         if (search) {
//             query = {
//                 $or: [
//                     { name: { $regex: search, $options: "i" } },
//                     { department: { $regex: search, $options: "i" } },
//                 ],
//             };

//         }

//         // sort
//         let sortOption = {};

//         if (sortBy) {
//             sortOption[sortBy] = order === "desc" ? -1 : 1;
//         }

//         const employees = await Employee.find(query).sort(sortOption);
//         return res.json({
//             status: true,
//             message: "employee get",
//             data: employees,
//         })
//     } catch (error) {
//         return res.json({
//             status: false,
//             message: `Error in getAll Employees ${error.message}`,

//         });
//     }
// }

// // update 

// export const updateEmployee = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, email, age, department, salary } = req.body;
//         if (!name || !email || !age || !department || !salary) {
//             return res.json({
//                 status: false,
//                 message: "All fields are required"
//             })
//         }

//         // Checked employee if exist
//         const employee = await Employee.findById(id)
//         if (!employee) {
//             return res.status(404).json({
//                 status: false,
//                 message: "Employee not exist"
//             })
//         }

//         const updateEmployee = await Employee.findByIdAndUpdate(id, req.body,{
//             new: true,
//         });

//         res.status(201).json({
//             status: true,
//             message: "Employee got updated",
//             data: updateEmployee
//         })

//     } catch (error) {
//         res.status(500).json({
//             status: false,
//             message: `Error in updateEmployee ${error.message}`
//         })
//     }
// }

// export const updateEmployeePartially = async(req,res)=>{
//     try {
//         const {id} = req.params;

//         // Checked employee if exist
//            const employee = await Employee.findById(id);
//            if (!employee) {
//              return res.status(404).json({
//                     status: false,
//                     message: "Employee not exist"
//              })
//            }

//            const updateEmployee = await Employee.findByIdAndUpdate(id,req.body,{
//             new: true,
//            });

//            res.status(201).json({
//             status: true,
//             message: "Employee got updated",
//             data: updateEmployee,
//            })

//     } catch (error) {
//          res.status(500).json({
//             status: false,
//             message: `Error in updateEmployee ${error.message}`
//         })
//     }
// }

// // deleteEmployee 
// export const deleteEmployee = async (req,res)=>{
//     try {
//         const {id} = req.params;
//         const employee = await Employee.findById(id);
//         if (!employee) {
//             return res.status(404).json({
//                 status: false,
//                 message : "Employee not found"
//             })
//         }
//         const deleteEmployee = await Employee.findByIdAndDelete(id);
//         return res.json({
//             status: true,
//             message: "Employee  deleted",
//             data: deleteEmployee
//         })
//     } catch (error) {
//         console.log(error.message);

//          res.status(500).json({
//             status: false,
//             message: `Error in deleteEmployee ${error.message}`
//         })
//     }
// }







// create

export const createEmployee = async (req, res) => {
    try {
        const { name, email, age, department, salary } = req.body;

        if (!name || !email || !age || !department || !salary) {
            return res.status(400).json({
                status: false,
                message: "Payload missing"
            })


        }
        const employee = await Employee.create({
            name,
            email,

            age,
            department,
            salary
        })

        return res.status(201).json({
            status: true,
            message: "Employee got Created",
            data: employee
        })
    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: `Error in creating Employee ${error.message}`
        })
    }
}


export const bulkUploadEmployees = async (req, res) => {

    try {
        const employee = req.body;
        if (!Array.isArray(employee)) {
            return res.status(400).json({
                status: false,
                message: "Invalid data and not an Array"
            })
        }

        const result = await Employee.insertMany(employee);
        return res.status(201).json({
            status: true,
            message: "Data got Inserted",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: `Error in insertData ${error.message}`
        })
    }
}

export const getAllEmployee = async (req, res) => {
    try {
        const { search, sortBy, order } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { department: { $regex: search, $options: "i" } }

                ]
            }
        }
        let sortOption = {};
        if (sortBy) {
            sortOption[sortBy] = order === "desc" ? -1 : 1;

        }
        const employees = await Employee.find(query).sort(sortOption);
        return res.json({
            status: true,
            message: "Employee get",
            data: employees
        })
    } catch (error) {
                 return res.json({
                    status: false,
                    message: `Error in getAll employees ${error.message}`
                 })  

    }
}


export const updateEmployee = async(req,res)=>{
    try {
         const {id}= req.params;
         const {name,email,age,department,salary} = req.body;
         if(!name||!email||!age||!department||!salary){
            return res.json({
                status: false,
                message:"All fields are required"
            })
         }
         const employee = await Employee.findById(id);
         if (!employee) {
             return res.status(404).json({
                status: false,
                message: " Employee not found"
             })
         }
          const updateEmployee = await Employee.findByIdAndUpdate(id,req.body,{
            new: true
          })

          res.status(201).json({
            status: true,
            message: "Employee got updated",
            data: updateEmployee
          })
    } catch (error) {
         return res.status(500).json({
                    status: false,
                    message: `Error in updateEmployee ${error.message}`
                 })  

    }
}

export const deleteEmployee = async(req,res)=>{
    try {
         const {id} = req.params;

         const employee = await Employee.findById(id);
         if(!employee){
            return res.status(404).json({
                status: false,
                message : "Employee nnot Found"

            })
         }
         const deleteEmployee = await Employee.findByIdAndDelete(id)
    } catch (error) {
        
    }
}