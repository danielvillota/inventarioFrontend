import toast from "react-hot-toast";

export const handleErrors = (error) => {
    const dataError = error.response.data;
    Object.keys(dataError).forEach((key) => {
      toast.error(`${key}: ${dataError[key]}`);
    });
  };