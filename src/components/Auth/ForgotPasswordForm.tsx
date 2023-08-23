import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "@package";
import { Slot, GlobalInputs } from "@packageTypes";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import $http from "@services/AxiosInstance";
import baseApiUrl from "@services/BaseApiUrl";

export function ForgotPasswordForm() {
  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>([
    {
      key: "email",
      placeholder: "Email",
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

  const onSubmit = async (data: any) => {
    try {
      if (data.isFormValid === false) {
        toast.error("Por favor, completa los campos requeridos.", {
          autoClose: 4000,
          theme: "dark",
        });
        return;
      }

      const response = await $http.post(
        `${baseApiUrl}/api/v1/restore-password`,
        {
          email: data.items.email,
        }
      );

      if (response.status === 200) {
        toast.success(
          "An email has been sent to reset your password.",
          {
            autoClose: 4000,
            theme: "dark",
          }
        );
      } else {
        toast.error("There was an error sending the email", {
          autoClose: 4000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("There was an error sending the email", {
        autoClose: 4000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="c-mt-4 c-mb-2 c-mx-2">
      {
        <Form inputs={inputs} onSubmit={onSubmit}>
          <Button customClass="btn-primary">Recover password</Button>
          <Link to="/login" className="link-login">
          Already have an account? <span>Sign in</span>
          </Link>
        </Form>
      }
    </div>
  );
}
