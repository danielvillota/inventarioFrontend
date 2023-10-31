import axios from "axios";

export const GetAlmacenes = async () => {
    try {
        let url = "https://devinventarioazure.azurewebsites.net/api/v1/almacenes";
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const GetAlmacen = async (id) => {
    try {
        let url = `https://devinventarioazure.azurewebsites.net/api/v1/almacenes/${id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const SendAlmacen = async (data) => {
    try {
        let url = "https://devinventarioazure.azurewebsites.net/api/v1/almacenes";
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const UpdateAlmacen = async (data, id) => {
    try {
        const response = await axios.put(`https://devinventarioazure.azurewebsites.net/api/v1/almacenes/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export const DeleteAlmacen = async (id) => {
    try {
        let url = `https://devinventarioazure.azurewebsites.net/api/v1/almacenes/${id}`;
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}