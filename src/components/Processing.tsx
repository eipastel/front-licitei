import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Processing: React.FC<{ message?: string }> = ({ message = 'Processando...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black bg-opacity-70">
      <h2 className="text-3xl text-white">{message}</h2>
      <FaSpinner className="animate-spin text-white text-6xl" />
    </div>
  );
};

export default Processing;