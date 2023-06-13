import { useState } from "react";
import { GlobalInputs, Slot } from "../Form/FormType";
import { Form } from "../Form/Form";
import { formData } from "./formData";
import { Button } from "../Button";

const FormContract = () => {
  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>(formData);

  return (
    <div>
      <Form inputs={inputs}>
        <Button type="submit" customClass={"btn-primary"}>
          Crear contrato
        </Button>
      </Form>
    </div>
  );
};

export default FormContract;
