import { useState, useEffect } from "react";
import { GlobalInputs, Slot } from "../package/Form/Form.type";
import { Form } from "../package/Form/Form";
import { formData } from "./formData";
import { Button } from "../package/Button";

const FormContract = () => {
  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>(formData);

  const fetchData = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwidXNlciI6IjY0OWIxODBlMmYzOGQ5YjljMzc1YjliOSIsImlhdCI6MTY4Nzg4NTg2NjI0OSwiZXhwIjoxNjg3OTA3NDY2MjQ4fQ.vOLF6bWUIDKoyk8zw9vXTVH06Aqehrx2KMm6XCxxVRw'; // Reemplaza con tu propio token
  
      const response = await fetch("http://localhost:3000/api/v1/surveyors", {
        headers: {
          Authorization: `Bearer ${token}` // Agrega el encabezado Authorization con el valor del token
        }
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log(json.items);
      } else {
        console.log("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.log("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Form inputs={inputs}>
        <span className="text-required">
          <span>*</span> Los campos son obligatorios
        </span>
        <Button type="submit" customClass={"btn-primary"}>
          Crear contrato
        </Button>
      </Form>
    </div>
  );
};

export default FormContract;
