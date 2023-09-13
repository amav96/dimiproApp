import $http from "@services/AxiosInstance";
import baseApiUrl from "@services/BaseApiUrl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../package/Button";
import { Form } from "../package/Form";
import { GlobalInputs, Slot } from "../package/Form/Form.type";
import { Layout } from "../package/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './styles/_restore-password.scss'

const RestorePassword = () => {
  const [isTokenValid, setisTokenValid] = useState(false);
  const [email, setEmail] = useState("");
  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>([
    {
      key: "password",
      placeholder: "Password",
      name: "password",
      title: "New Password:",
      value: "",
      type: "password",
      cols: "c-col-span-4",
      validations: {
        rules: {
          required: true,
        },
      },
    },
    {
      key: "confirmPassword",
      placeholder: "Confirm Password",
      name: "confirmPassword",
      value: "",
      type: "password",
      title: "Confirm Password:",
      cols: "c-col-span-4",
      validations: {
        rules: {
          required: true,
        },
      },
    },
  ]);

  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await $http.post(`${baseApiUrl}/api/v1/verify-token`, {
          token,
        });
        console.log(response.data);
        setEmail(response.data.email);

        setisTokenValid(true);
      } catch (error) {
        console.error("error verifying token:", error);
        setisTokenValid(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setisTokenValid(false);
    }
  }, [token]);

  const onSubmit = async (data: any) => {
    if (data.isFormValid === false) {
      return;
    }

    try {
      if (data.items.password !== data.items.confirmPassword) {
        toast.error("Passwords do not match", {
          autoClose: 4000,
          theme: "dark",
        });
        return;
      }

      await $http.put(`${baseApiUrl}/api/v1/users/update-password`, {
        email,
        newPassword: data.items.password,
      });

      toast.success("Password updated correctly.", {
        autoClose: 4000,
        theme: "dark",
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Restore password" customClass="restore-password-view">
      {isTokenValid ? (
        <Form inputs={inputs} onSubmit={onSubmit}>
          <Button customClass="btn-primary c-my-4">
            Restore password
          </Button>
        </Form>
      ) : (
        <>
          <h1
            style={{
              color: "white",
              fontSize: "16px",
            }}
          >
            Invalid or expired token. Please try again
          </h1>
          <Button customClass="btn-primary c-my-4">
            <Link to="/forgot-password" className="link-login">
              Back
            </Link>
          </Button>
        </>
      )}
    </Layout>
  );
};

export default RestorePassword;
