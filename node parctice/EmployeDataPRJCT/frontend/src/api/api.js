import axios from "axios";

const BASE_URL = "https://employeedata-2.onrender.com/api/employees";


const AUTH_URL = "https://employeedata-2.onrender.com/api/authRoutes";


// ================= EMPLOYEE =================

// GET
export const getEmployee = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/getEmployee?${query}`);
  return res.json();
};

// CREATE
export const createEmployee = (data) => {
  const token = localStorage.getItem("token");

  return axios.post(`${BASE_URL}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// UPDATE
export const updateEmployee = (id, data) => {
  const token = localStorage.getItem("token");

  return axios.patch(`${BASE_URL}/updatePartial/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// DELETE
export const deleteEmployee = (id) => {
  const token = localStorage.getItem("token");

  return axios.delete(`${BASE_URL}/deleteEmployee/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// ================= AUTH =================

// Register
export const registerUser = (data) => {
  return axios.post(`${AUTH_URL}/register`, data);
};

// Login
export const loginUser = (data) => {
  return axios.post(`${AUTH_URL}/login`, data);
};