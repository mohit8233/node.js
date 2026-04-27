

import { Student } from "../models/userModel.js";
//========create=======//

export const createData = async (req, res) => {
    try {
        const { name, email, age, course, fees } = req.body;
        if (!name || !email || !age || !course || !fees) {
            return res.status(400).json({
                status: false,
                message: "Payload Missing"
            })
        }

        const student = await Student.create({
            name, email, age, course, fees
        })

        return res.status(201).json({
            status: true,
            message: "Student create successfully",
            data: student
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error in creating student ${error.message}`
        })
    }
}


//=======bulkupload======//

export const bulkStudent = async (req, res) => {
    try {
        const student = req.body;
        if (!Array.isArray(student)) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data and Not an Array"
            })
        }

        const result = await Student.insertMany(student);
        return res.status(201).json({
            status: true,
            message: "Student inserted successfully",
            data: result
        })
    } catch (error) {
          return res.status(500).json({
            status: false,
            message: `Error in inserting student ${error.message}`
        })
    }
}
//=======Get======//

export const getStudent = async (req, res) => {
  try {
      let { search, sortBy, order, page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    if (page < 1) page = 1;
    if (limit < 1) limit = 5;
    if (limit > 50) limit = 50;


    // search 
    let query = {};

    if (search) {
        query = {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { course: { $regex: search, $options: "i" } }
            ]
        }
    }

    let sortoption = {};
    if (sortBy) {
        sortoption[sortBy] = order === "desc" ? -1 : 1;
    }

    const skip = (page-1)/limit;

    const students = await Student.find(query)
    .skip(skip)
    .sort(sortoption)
    .limit(limit)

    const total = await Student.countDocuments(query);
    return res.json({
        status: true,
        message: "Students get successfully",
        data:students,
        pagination:{
             total,
             currentPage : page,
             totalPages: Math.ceil(total/limit),
             perPage: limit
        }
    })

  } catch (error) {
     return res.status(500).json({
            status: false,
            message: `Error in getting student ${error.message}`
        })
  }
}


// update 

export const updateData = async(req,res)=>{
    try {
        const {id} = req.params;
        const {name, email,age, course,fees} = req.body;
        
        if (!name || !email || !age || !course || !fees) {
            return res.status(400).json({
                status: false,
                message: "All Fields are required"
            })
        }

        const student = await Student.findById(id);
        if(!student){
             return res.status(404).json({
                status: false,
                message: "Student not Found"
            })
        }
       
         const updateStudent = await Student.findByIdAndUpdate(id,req.body,{
            new: true
         })
         return res.status(200).json({
            status: true,
            message:"Student update successfully",
            data: updateStudent
         })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error in updating student ${error.message}`
        })
    }
}

// updateParPartially

export const updateDataPartially = async (req,res)=>{
    try {
        const {id} = req.params;
        const student = await Student.findById(id);
        if (!student) {
             return res.status(404).json({
                status: false,
                message: "Student not Found"
            })
        }

        const updateStudentData = await Student.findByIdAndUpdate(id,req.body,{
            new:true
        })
         return res.status(200).json({
            status: true,
            message:"Student update successfully",
            data: updateStudentData
         })
    } catch (error) {
        res.status(500).json({
      status: false,
      message: `Error in updateStudent ${error.message}`,
    });
    }
}


export const deleteStudent = async(req,res)=>{
    try {
         const {id} = req.params;
         const student = await Student.findById(id);
         if(!student){
             return res.status(404).json({
                status: false,
                message: "Student not Found"
            })
         }

         const deleteData = await Student.findByIdAndDelete(id);
          return res.status(200).json({
            status: true,
            message:"Student deleted successfully",
            data: deleteData
         })
    } catch (error) {
        res.status(500).json({
      status: false,
      message: `Error in deleted Student ${error.message}`,
    });
    }
}