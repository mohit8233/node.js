import axios from "axios";

const BASE_URL = "https://employeedata-lvqe.onrender.com/api/employees";


const AUTH_URL = "https://employeedata-lvqe.onrender.com/api/authRoutes";


// ================= EMPLOYEE =================

// GET
export const getEmployee = async (params = {}) => {
  const token = localStorage.getItem("token");

  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${BASE_URL}/getEmployee?${query}`, {
    headers: {
      token: token,
    },
  });

  return res.json();
};

// CREATE
export const createEmployee = (data) => {
  const token = localStorage.getItem("token");

  return axios.post(`${BASE_URL}/create`, data, {
    headers: {
      token: token,
    },

  });
};

// UPDATE
export const updateEmployee = (id, data) => {
  const token = localStorage.getItem("token");

  return axios.patch(`${BASE_URL}/updatePartial/${id}`, data, {
    headers: {
      token: token,
    },

  });
};

// DELETE
export const deleteEmployee = (id) => {
  const token = localStorage.getItem("token");

  return axios.delete(`${BASE_URL}/deleteEmployee/${id}`, {
    headers: {
      token: token,
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