import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
axios.interceptors.response.use((response) => response.data);

// export const getEmployees = () => axios.get("/employees");
// export const getAssets = () => axios.get("/assets");
export const getAssets = () =>
  Promise.resolve([
    { name: "Asset 1", location: { lat: 43.6339676, lng: -79.394823 } },
    { name: "Asset 2", location: { lat: 43.6369865, lng: -79.410435 } },
  ]);

export const getEmployees = () => axios.get(`/employees`);
export const getEmployee = (id) => axios.get(`/employees/${id}`);

export const updatEmployee = (id, employee) =>
  axios.put(`/employees/${id}`, employee);
export const addEmployee = (employee) => axios.post(`/employees`, employee);
