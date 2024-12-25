import Product from '../model/Product.js';
import mongoose from 'mongoose';

export const createProduct = async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false , message:"Provide all fields"});
    }

    const newProduct = new Product(product);
    try{
        newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    }catch(error){
        console.log("Error while creating product: " , error.message);
        res.status(500).json({success:false , message:"Server error"});
    }
};


export const getProducts = async (req, res) => {
    
    try{
        const products = await Product.find({});
        res.status(200).json({success:true, data: products});
    }catch(error){
        console.log(error.message);
        res.status(404).json({success:false, message: "Products not found"});
    }
}

export const getProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false, message: "Invalid Product ID"});
    }

    try{
        const product = await Product.findById(id);
        if(product == null) res.status(404).json({success:false, message: "Product not found"});

        res.status(200).json({success:true, data: product});
    }catch(error){
        console.log(error.message);
        res.status(404).json({success:false, message: "Product not found"});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false, message: "Invalid Product ID"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product , {new: true});
        res.status(200).json({success:true, data: updatedProduct});
    }catch(error){
        console.log("Error while updating product: " , error.message);
        res.status(500).json({success:false , message:"Server error"});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Product deleted"});
    }catch(error){
        console.log(error.message);
        res.status(404).json({success:false, message: "Product not found"});
    }
}