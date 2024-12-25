import axios from "axios";

const API_BASE_URL = `/product`;

const GetProducts = async () => {

    try{
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data.data;
    }catch(error){
        console.error("Error while fetching products:", error);
    }
}

const GetSingleProduct = async (uid) => {

    try{
        const response = await axios.get(`${API_BASE_URL}/${uid}`);
        return response.data.data;
    }catch(error){
        console.error("Error while fetching product:", error);
    }
}

const createProduct = async (product) => {

    try{
        const response = await axios.post(`${API_BASE_URL}`,product);
        return response.data.data;
    }catch(error){
        console.error("Error while creating product:", error);
        return null;
    }
}

const updateProduct = async (uid, product) => {

    try{
        const response = await axios.put(`${API_BASE_URL}/${uid}`,product);
        return response.data.data;
    }catch(error){
        console.error("Error while updating product:", error);
        return null;
    }
}

const deleteProduct = async (uid) => {

    try{
        const response = await axios.delete(`${API_BASE_URL}/${uid}`);
        return response.data.success;
    }catch(error){
        console.error("Error while deleting product:", error);
        return false;
    }
}

export const ProductService = {
    GetProducts, createProduct, deleteProduct, GetSingleProduct, updateProduct
}