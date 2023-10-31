import axios from "axios";

export const GetInventarios = async () => {
    try {
        let url = "https://devinventarioazure.azurewebsites.net/api/v1/inventarios";
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const GetInventario = async (id) => {
    try {
        let url = `https://devinventarioazure.azurewebsites.net/api/v1/inventarios/${id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export const SendInventario = async (data) => {
    try {
        let url = "https://devinventarioazure.azurewebsites.net/api/v1/inventarios";
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const UpdateInventario = async (data, id) => {
    try {
       const response = await axios.put(`https://devinventarioazure.azurewebsites.net/api/v1/inventarios/${id}`, data);
         return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const DeleteInventario = async (id) => {
    try {
        let url = `https://devinventarioazure.azurewebsites.net/api/v1/inventarios/${id}`;
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}