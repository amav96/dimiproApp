import { useState } from "react";
import { GlobalInputs, Slot } from "../package/Form/Form.type";
import { Form } from "../package/Form/Form";
import { formData } from "./formData";
import { Button } from "../package/Button";

const FormContract = () => {
  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>(formData);

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
