
import { Cart } from "../models/cartModel.js";

export const addcart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;


    //    if not cart , add new 
    let  cart = await Cart.findOne({ userId })
    if (!cart) {
        cart = await Cart.create({
            userId,
            items: [{ productId, quantity }]
        })
        return res.json(cart)
    }


    // check items already add 
    const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId,

    );

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ productId, quantity })
    }
    await cart.save()
    res.json(cart)
   
}

export const getCart = async (req,res)=>{
    const userId = req.user.id;
    const cart = await Cart.findOne({userId}).populate("items.productId")
    res.json(cart)
}

export const removeToCart  = async(req,res)=>{
    const userId = req.user.id;
    const {productId} = req.body;

    const cart = await Cart.findOne({userId});

    cart.items = cart.items.filter(
        (item)=> item.productId.toString()!== productId
    )

    await cart.save();
    res.json(cart)
}