import { Employee } from "../models/employeeModel.js";

export const createEmployee = async (req, res) => {
    try {
        const { name, email, age, department, salary } = req.body;
        if (!name || !email || !age || !department || !salary) {
            return res.status(400).json({
                status: false,
                message: "Missing Payload"
            })
        }

        const employee = await Employee.create({
            name,
            email,
            age,
            department,
            salary,
        })


        return res.status(201).json({
            status: true,
            message: "Employee got created",
            data: employee
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error in creating employee ${error.message}`
        })
    }
}

//bulkUploadEmployee

export const bulkUploadEmployee = async (req, res) => {
    try {
        const employee = req.body;
        if (!Array.isArray(employee)) {
            return res.status(400).json({
                status: false,
                message: "Invalid data and not a Array"
            })
        }

        const result = await Employee.insertMany(employee);

        return res.status(201).json({
            status: true,
            message: "Employee got inserted",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error in inserting employee ${error.message}`
        })
    }
}

// get 
export const getAllEmployee = async (req, res) => {
    try {
        let { search, sortBy, order, page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;


        if (page < 1) page = 1;
        if (limit < 1) limit = 5;
        if (limit > 50) limit = 50;

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

        const skip = (page - 1) * limit;

        const employees = await Employee.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)


        const total = await Employee.countDocuments(query);
        return res.json({
            status: true,
            message: "employees get",
            data: employees,
            pagination: {
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                perPage: limit
            }
        })
    } catch (error) {
        return res.json({
            status: false,
            message: `Error in getAll Employees ${error.message}`,
        });
    }
}
 // update 
export const updateEmployee = async (req,res)=>{
    try {
        const { id} = req.params;
        const{name,email,age,department,salary} = res.body;


           if (!name || !email || !age || !department || !salary) {
            return res.json({
                status: false,
                message: "All Fields are Required"
            })
        }
     const employee = await Employee.findById(id);

     if(!employee){
        return res.status(404).json({
            status: false,
            message: "Employee not Exist",
        })
     }

     const updateEmployee = await Employee.findByIdAndUpdate(id, req.body,{
        new : true
     })

      res.status(201).json({
      status: true,
      message: "Employee Got Updated",
      data: updateEmployee,
    });

    } catch (error) {
        res.status(500).json({
      status: false,
      message: `Error in UpdateEmployee ${error.message}`,
    });
    }
}

//updateEmployeePartially
export const updateEmployeePartially = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if employee Exist
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        status: false,
        message: "Employee not Exist",
      });
    }
    const updateEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: true,
      message: "Employee Got Updated",
      data: updateEmployee,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in UpdateEmployee ${error.message}`,
    });
  }
};


// delete 
export const deleteEmployee = async (req,res)=>{
    try {
        const {id} = req.params;

        const employee = await Employee.findById(id);

         if (!employee) {
      return res.status(404).json({
        status: false,
        message: "Employee not Exist",
      });
    }

    const deleteEmployee = await Employee.findByIdAndDelete(id)

    return res.json({
        status:true,
        message:"Employee Deleted",
        data: deleteEmployee
    })
    } catch (error) {
         res.json({
    status:false,
    message:`Error found in DeleteAPI ${error.message}`
   })
    }
}