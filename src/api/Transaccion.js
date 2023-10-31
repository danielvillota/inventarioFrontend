import axios from "axios";

export const GetTransacciones = async () => {
    try {
        let url = "https://devinventarioazure.azurewebsites.net/api/v1/transacciones";
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const GetTransaccion = async (id) => {
    try {
        let url = `https://devinventarioazure.azurewebsites.net/api/v1/transacciones/${id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}


export const SendTransaccion = async (data) => {
    try {
        let url = "https://devinventarioazure.azurewebsites.net/api/v1/transacciones";
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const UpdateTransaccion = async (data, id) => {
    try {
       const response = await axios.put(`http://127.0.0.1:8000/api/v1/transacciones/${id}`, data);
         return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}