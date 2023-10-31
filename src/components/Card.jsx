import React from 'react'
import { FaTimes } from "react-icons/fa";

const WarningCard = ({ onClose }) => {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Advertencia! </strong>
        <span className="block sm:inline">La capacidad de tu almacén se está acabando.</span>
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4">
          <FaTimes />
        </button>
      </div>
    );
  };
  
  export default WarningCard;
  
