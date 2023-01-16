import fs from "fs";
import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";


const jsonPath = './public/uploaded_productos/productos.json'

export const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file.name);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const json = JSON.parse(fs.readFileSync(jsonPath))
    // Eliminar cualquier archivo existente en el directorio /public/uploaded_files
    await axios.delete("/api/uploadRouter1");
    // Enviar el archivo al servidor mediante una petición HTTP POST
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("/api/uploadRouter1", formData);
    //leer el archivo json subido y validarlo
    let rawdata = fs.readFileSync(jsonPath);
    let productos = JSON.parse(rawdata);
    //validacion del formato
    //.. aqui va tu codigo de validacion
    //Importar a la base de datos
    //.. aqui va tu codigo para importar a mongodb
  };

  return (
    <div className="contenedor-sucursales">
      <Head>
        <title>ACCESS - CARGA MASIVA PRODUCTOS</title>
        <link rel="shortcut icon" href="/images/favicon.ico"></link>
      </Head>
      <div>
      <h2 style={{textAlign: "center"}}>CARGA MASIVA DE PRODUCTOS</h2>
      
      <br />
      <br />
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Subir archivo</button>
      </form>
      </div>
    </div>
  );
};

export default UploadPage;


