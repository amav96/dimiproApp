
import axios from 'axios';

export const AWS = {
    S3BUCKET: import.meta.env.VITE_REACT_APP_S3BUCKET
}

export const uploadFileToS3 = async (signedURL: string, file: File) => {
  try {
    console.log(signedURL, file)
    const response = await axios.put(signedURL, file, {
      headers: {
        'Content-Type': file.type, // Asegúrate de establecer el encabezado Content-Type correcto
      },
    });
    console.log(response)

    if (response.status === 200) {
      return response; // Retorna la respuesta si la carga es exitosa
    } else {
      throw new Error('Error al cargar el archivo');
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error en la carga del archivo');
  }
};