import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";

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
    // Eliminar cualquier archivo existente en el directorio /public/uploaded_files
    await axios.delete("/api/uploadRouter");
    // Enviar el archivo al servidor mediante una petición HTTP POST
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("/api/uploadRouter", formData);
  };

  return (
    <div className="contenedor-sucursales">
      <Head>
        <title>ACCESS - CARGA DE SERVICIOS</title>
        <link rel="shortcut icon" href="/images/favicon.ico"></link>
      </Head>
      <div>
      <h2 style={{textAlign: "center"}}>CARGA SERVICIOS</h2>
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




