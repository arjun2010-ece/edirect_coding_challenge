import axios from "axios";


export const signup = async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/signup", data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const signin = async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getProjects = async (userId, jwt) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/fetch/projects/${userId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const addProjectData = async (data, userId, jwt) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/create/project/${userId}`, data ,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteProjectData = async (projectId, userId, jwt) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/delete/project/${projectId}/${userId}` ,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getProjectData = async (projectId, jwt) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/fetch/project/${projectId}` ,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const editProjectData = async (projectId, userId, name, jwt) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/update/project/${projectId}/${userId}`, {name} ,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const fetchAllTasksProject = async (projectId, jwt) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/fetch/tasks/${projectId}`,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const fetchTasksByIdProject = async (taskId, jwt) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/fetch/task/${taskId}`,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteTasksProject = async (taskId, jwt) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/delete/task/${taskId}`,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const editTaskData = async (taskId, task, jwt) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/update/task/${taskId}`, task ,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const addTaskData = async ( task, jwt) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/create/task/`, task ,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateTaskStatusData = async ( taskId, status, jwt) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/update/task/status/${taskId}`, status ,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}