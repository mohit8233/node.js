import { User } from "../models/studentModel";


// create 
export const createStudent = async (req, res) => {
    try {
        const { name, email, age, department, salary } = req.body;
        if (!name || !email || !age || !department || !salary) {
            return res.status().json({
                status: false,
                message: "Payload Missing"
            })
        }

        const user = await User.create({
            name,
            email,
            age,
            department,
            salary
        })

        return res.status(201).json({
            status: true,
            message: "User got created",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error in creating user ${error.message}`
        })
    }
}

// bulkupload 

export const bulkUploadUser = async (req, res) => {
    try {
        const user = req.body;
        if (!Array.isArray(user)) {
            return res.status(400).json({
                status: false,
                message: "Invalid data and not an Array"
            })
        }

        const result = await User.insertMany(user)

        return res.status(201).json({
            status: true,
            message: "User got Inserted",
            data: result,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error in inserting User ${error.message}`
        })
    }
}


// getAlluser

export const getAllUser = async (req, res) => {
    try {
        let { search, sortBy, order, page, limit } = req.query;
        parseInt(page) || 1;
        parseInt(limit) || 1;

        if (page < 1) page = 1;
        if (limit < 1) limit = 5;
        if (limit > 50) limit = 50;


        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { department: { $regex: search, $options: "i"} }
                ]
            }
        }

        let sortOptions = {}
        if(sortBy){
            sortOptions[sortBy] = order === "desc" ? -1:1;

        }
        const skip = (page -1)* limit;

        const user = await User.find(query)
        .skip(skip)
        .sort(sortOptions)
        .limit(limit)

        const total = await User.countDocuments(query);

        return res.json({
            status: true,
            message:"User get",
            data:user,
            pagination:{
                total,
                currentPage: page,
                totalPages: Math.ceil(total/limit),
                perPage: limit
            }
            
        })
    } catch (error) {
          return res.json({
            status: false,
            message: `Error in Getting User ${error.message}`
          })
    }
} 


// update

export const updateUser = async(req,res)=>{
    try {
         const {id}= req.params;
         const {name, email, age, department, salary} = req.body;
         if(!name||!email||!age||!department||!salary){
            return res.json({
                status:false,
                message: "All fields are required"
            })
         }

         const user = await User.findById(id);
         if(!user){
            return res.status(404).json({
                status: false,
                message: "user not exist"
            })
         }

         const updateUser = await User.findByIdAndUpdate(id, req.body,{
            new: true
         });

         return res.status(201).json({
             status: true,
             message: "User got updated",
             data: updateUser
         })
    } catch (error) {
        
    }
}