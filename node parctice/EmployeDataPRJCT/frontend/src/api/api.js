import axios from "axios";
const BASE_URL = "http://localhost:5000/api/employees"


export const getEmployee = async(params = {})=>{
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/getEmployee?${query}`)
    return res.json()
}

// create 

export const createEmployee = (data) => {
  return axios.post(`${BASE_URL}/create`, data);
};

// UPDATE
export const updateEmployee = (id, data) => {
  return axios.patch(`${BASE_URL}/updatePartial/${id}`, data);
};

// DELETE
export const deleteEmployee = (id) => {
  return axios.delete(`${BASE_URL}/deleteEmployee/${id}`);
};