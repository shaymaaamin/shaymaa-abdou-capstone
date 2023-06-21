import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
axios.interceptors.response.use((response) => response.data);

const crud = (path) => {
    return {
        get: () => axios.get(path),
        getById: (id) => axios.get(`${path}/${id}`),
        add: (data) => axios.post(path, data),
        update: (id, data) => axios.put(`${path}/${id}`, data),
        delete: (id) => axios.delete(`${path}/${id}`),
    }
}

export const assets = crud('assets');
export const employees = crud('employees');
export const jobs = crud('jobs');
export const skills = crud('skills');
export const lookups = crud('lookups');