import { Category } from "../models/categoryModel.js";

// create category 
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const ExistCategory = await Category.findOne({ name });
        if (ExistCategory) {
            return res.status(400).json({
                status: false,
                message: "Category already Created"
            })

        }

        const category = await Category.create({
            name,
        });

        return res.status(201).json({
            status: true,
            message: "Category create successfully",
            data: category
        })

    } catch (error) {
        return res.json({
            status: false,
            message: `Error in creating category ${error.message}`
        })
    }
}

// getAllCategory
export const getAllCategory = async (req,res)=>{
    try {
        const categories = await Category.find()
    
    return res.status(200).json({
      status: true,
      message: "All categories fetched successfully",
      data: categories
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error in fetching categories ${error.message}`
    });
  }
};