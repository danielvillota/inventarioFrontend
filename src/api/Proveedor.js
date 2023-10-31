import axios from "axios";

export const GetProveedores = async () => {
    try {
        let url = "https://devinventarioazure.azurewebsites.net/api/v1/provedores";
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const ApiDepartamento = async () => {
    return await axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json')
  }

export const SendProveedor = async (data) => {
    try {
        let url = "https://devinventarioazure.azurewebsites.net/api/v1/provedores";
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const GetProveedor = async (id) =>  {
    try {
        let url = `https://devinventarioazure.azurewebsites.net/api/v1/provedores/${id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const UpdateProveedor = async (data, id) => {
    try {

       const response = await axios.put(`https://devinventarioazure.azurewebsites.net/api/v1/provedores/${id}`, data);
         return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function DeleteProveedor(id){
    try {
      const response = await axios.delete(`https://devinventarioazure.azurewebsites.net/api/v1/provedores/${id}`);
      return response.data;
    }catch (error){
      console.log(error);
    }
  
  }
