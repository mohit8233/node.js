import { Router } from "express";
import { createCategory, getAllCategory } from "../controllers/categoryController.js";
import { BulkuploadProduct, createProduct, getProductByCategoryId, getSingleProduct } from "../controllers/productController.js";
import { login, register } from "../controllers/authController.js";
import { addcart, getCart, removeToCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

export const Routes = Router();

// categories routes 
Routes.post("/createcategory", createCategory);
Routes.get("/getAllCategories", getAllCategory)


// product routes
Routes.post("/createProduct", createProduct);
Routes.post("/bulkProduct", BulkuploadProduct)
Routes.get("/getAllByCategory/:id", getProductByCategoryId);
Routes.get("/getSingleProduct/:id", getSingleProduct)

//Auth Routes

Routes.post("/register", register)
Routes.post("/login", login)

// Cart Routes

Routes.post("/add",protect,addcart);
Routes.get("/get",protect , getCart);
Routes.delete("/remove", protect, removeToCart)