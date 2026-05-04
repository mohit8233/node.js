import { Product } from "../models/productModel.js";


// create product 
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, CategoryID } = req.body;
        if (!name || !price || !description || !image || !CategoryID) {
            return res.status(400).json({
                status: false,
                message: "All feilds are required"
            })
        }

        const product1 = await Product.create({
            name, price, description, image, CategoryID
        })
        return res.status(201).json({
            status: true,
            message: "Product added successfully",
            data: product1
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: `Error in adding product ${error.message}`
        })
    }
}



//Bulkupload product 


export const BulkuploadProduct = async (req,res)=>{
    try {
         const product = req.body;
         if(!Array.isArray(product)){
            return res.status(400).json({
                status: false,
                message: "Product details not an Array"
            })
         }

         const products = await Product.insertMany(product)

         return res.status(200).json({
            status: true,
            message: "Multiple product inserted successfully",
            data:products
         })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: `Error in inserting product ${error.message}`
        })
    }
}

// get product by CategoryID
export const getProductByCategoryId = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Category Id is not found"
            })
        }

        const products = await Product.find({ CategoryID:id }).sort({ createdAt: -1 });

        return res.status(200).json({
            status: true,
            message: "product getProductBycategoriesId successfully",
            data: products
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: `Error in fetching product ${error.message}`
        })
    }
}


export const getSingleProduct = async(req,res)=>{
    try {
        const {id} = req.params;

         if (!id) {
            return res.status(400).json({
                status: false,
                message: "Category Id is not found"
            })
        }

        const result = await Product.findById(id);
        res.status(200).json({
            status:true,
            message:"Single product fetched",
            data:result
        })
    } catch (error) {
        return res.status(500).json({
            status:false,
          message: `Error in fetching single Product${error.message}`
        })
    }
}