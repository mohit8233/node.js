

const  BASE_URL = "http://localhost:8080/api/v1";

// Category
export const getCategories = async()=>{
    const res = await fetch(`${BASE_URL}/getAllCategories`);
    return res.json()
}


// product
export const getAllByCategoryId = async(id)=>{
    const res = await fetch(`${BASE_URL}/getAllByCategory/${id}`);
    return res.json()
}


export const getSingleProduct = async (id)=>{
    const res = await fetch(`${BASE_URL}/getSingleProduct/${id}`)
    return res.json()
}

