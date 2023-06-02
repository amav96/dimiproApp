import React, { useState } from "react";
import { Form, Modal, Button } from "@package";
import { Slot, GlobalInputs } from "@packageTypes";
import { Link } from "react-router-dom";

export function ForgotPasswordForm() {
  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>([
    {
      key: "email",
      placeholder: "Email",
      title: "email",
      name: "email",
      value: "",
      type: "email",
      validations: {
        rules: {
          required: true,
        },
      },
    },
  ]);

  const [err, setErr] = useState<Array<string>>([]);

  const setErrors = (): void => {
    setErr(["hola este es un error"]);
  };
  const remove = (): void => {
    console.log("gege");
    setErr([]);
  };

  const [openModal, setOpenModal] = useState<Boolean>(false);

  const openCloseModal = () => {
    setOpenModal((prev) => !prev);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="c-mt-4 c-mb-2 c-mx-2">
      {
        <Form
          inputs={inputs}
          onSubmit={onSubmit}
          scopedFields={{
            test: () => <div>gege</div>,
          }}
        >
          <Button customClass="btn-primary">Recuperar contraseña</Button>
          <Link to="/login" className="link-login">
            ¿Ya tienes una cuenta? <span>Inicia sesión</span>
          </Link>
        </Form>
      }
    </div>
  );
}
