import React, { useState } from 'react';
import { FiFilePlus, FiX } from 'react-icons/fi';
import { IoDocumentOutline } from "react-icons/io5";
import { FaPen } from "react-icons/fa";

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleProcessFile = () => {
    if (selectedFile) {
      console.log("Arquivo salvo:", selectedFile.name);
    }
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="w-[600px] h-[600px] flex flex-col items-center justify-between bg-[#202427] p-8 rounded-3xl shadow-2xl gap-6">
        <header className="w-full flex justify-between">
          <h1 className="text-2xl font-light">Analisar Arquivo</h1>
          <FiX 
            size={28}
            className="pointer-events-none cursor-pointer text-gray-400 hover:text-white hover:scale-110 transition duration-300 ease-in-out"
          />
        </header>

        <section className="w-full h-full border-2 border-gray-600 border-dashed bg-[#363636] rounded-2xl shadow-2xl flex flex-col justify-center items-center">
          <label 
            className={`w-full h-full flex flex-col justify-center items-center cursor-pointer rounded-2xl 
              ${isDragging ? 'bg-gray-700' : 'bg-[#363636]'} z-10`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FiFilePlus
              size={isDragging ? 100 : 60} 
              className={`text-gray-400 mb-3 transition duration-200 ${isDragging ? 'text-[#2fdcc4]' : 'text-gray-400'}`}
            />
            <input 
              type="file"
              onChange={handleFileChange}
              className="hidden pointer-events-none"
            />
            <div className={`${isDragging ? "hidden" : ""} flex flex-col items-center gap-2`}>
              <p className="text-gray-300 text-xl">Arraste ou <span className="text-[#2fdcc4] hover:text-[#3cb8a7] hover:underline">procure</span> seu arquivo.</p>
              <p className="text-gray-400 text-sm">Tamanho máximo de 25 MB</p>
            </div>
          </label>
        </section>

        {selectedFile ? (<section className="w-full h-[100px] border p-5 border-gray-600 bg-[#363636] rounded-2xl shadow-2xl flex flex-row items-center justify-between">
          <div className="w-full h-full flex flex-row gap-4">
              <div className="w-16 h-16 flex flex-col items-center justify-center bg-[#202427] rounded-lg">
                <IoDocumentOutline
                  size={26}
                  className="text-gray-400"
                  title={selectedFile.name}
                />
              </div>

              <div className="flex flex-col items-left justify-between font-normal my-1">
                <p title={selectedFile.name} className="text-gray-300 max-w-56 truncate">{selectedFile.name}</p>
                <p className="text-gray-400 text-sm">{getFileSizeString({size: selectedFile.size})}</p>
              </div>
          </div>

          <div className="flex items-center gap-3">
            <FaPen
              size={20}
              className="cursor-pointer text-gray-400 hover:text-gray-300 hover:scale-110 transition duration-300 ease-in-out"
            />
            <FiX 
              size={28}
              className="cursor-pointer opacity-95 text-red-500 hover:text-red-600 hover:scale-110 transition duration-300 ease-in-out"
              onClick={handleRemoveFile}
            />
          </div>
        </section>) : (
          <section className="w-full h-[100px] border p-5 border-gray-600 bg-[#363636] rounded-2xl shadow-2xl flex ">
            <p className="text-gray-300 text-xl w-full h-16 flex items-center justify-center pb-2">Nenhum arquivo selecionado.</p>
          </section>
        )}

        <section className="w-full h-[100px] flex justify-between">
          <button
            onClick={() => {console.log("Unavailable")}}
            className="w-64 h-12 bg-[#363636] hover:bg-gray-600 rounded-full flex justify-center items-center text-gray-200 text-xl font-normal transition duration-300 ease-in-out"
          >
            Cancelar
          </button>
          <button
            onClick={handleProcessFile}
            className="w-64 h-12 bg-[#2c8478] hover:bg-[#2fdcc4] rounded-full flex justify-center items-center text-gray-200 text-xl font-normal transition duration-300 ease-in-out"
          >
            Analisar
          </button>
        </section>
      </div>
    </main>
  );
};

interface FileSizeProps {
  size: number;
}

const getFileSizeString = ({ size }: FileSizeProps): string => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  }
};

export default Home;