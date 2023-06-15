import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
axios.interceptors.response.use((response) => response.data);

const crudOperation = (path) => {
    return {
        get: () => axios.get(path),
        add: (data) => axios.post(path, data),
        update: (id, data) => axios.put(`${path}/${id}`, data),
        delete: (id) => axios.delete(`${path}/${id}`),
    }
}

const assets = crudOperation('assets');
const employees = crudOperation('employees');
const faults = crudOperation('faults');
const priorities = crudOperation('priorities');
const jobs = crudOperation('jobs');
const types = crudOperation('types');
const statuses = crudOperation('statuses');

export default {
    assets,
    employees,
    jobs,

    faults,
    priorities,
    types,
    statuses,
}