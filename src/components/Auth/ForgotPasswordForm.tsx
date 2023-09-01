import React, { useEffect, useRef, useState } from "react";
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

  const loading = useRef<boolean>(false)
  const onSubmit = async (data: any) => {
    if(loading.current) return
    try {
      if (data.isFormValid === false) {
        toast.error("Please complete the required fields.", {
          autoClose: 4000,
          theme: "dark",
        });
        return;
      }
      loading.current = true;
      const response = await $http.post(
        `${baseApiUrl}/api/v1/restore-password`,
        {
          email: data.items.email,
        }
      );
      loading.current = false;
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
      loading.current = false;
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
