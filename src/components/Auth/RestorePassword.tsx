import $http from "@services/AxiosInstance";
import baseApiUrl from "@services/BaseApiUrl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../package/Button";
import { Form } from "../package/Form";
import { GlobalInputs, Slot } from "../package/Form/Form.type";
import { Layout } from "../package/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";

const RestorePassword = () => {
  const [isTokenValid, setisTokenValid] = useState(false);
  const [email, setEmail] = useState("");
  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>([
    {
      key: "password",
      placeholder: "Contraseña",
      name: "password",
      title: "Nueva contraseña:",
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
      placeholder: "Confirmar contraseña",
      name: "confirmPassword",
      value: "",
      type: "password",
      title: "Confirmar contraseña:",
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
        console.error("Error al verificar el token:", error);
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
        toast.error("Las contraseñas no coinciden.", {
          autoClose: 4000,
          theme: "dark",
        });
        return;
      }

      await $http.put(`${baseApiUrl}/api/v1/users/update-password`, {
        email,
        newPassword: data.items.password,
      });

      toast.success("Contraseña actualizada correctamente.", {
        autoClose: 4000,
        theme: "dark",
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Restablecer contraseña">
      {isTokenValid ? (
        <Form inputs={inputs} onSubmit={onSubmit}>
          <Button customClass="btn-primary c-my-4">
            Restablecer contraseña
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
            Token inválido o expirado. Intenta nuevamente
          </h1>
          <Button customClass="btn-primary c-my-4">
            <Link to="/forgot-password" className="link-login">
              Volver
            </Link>
          </Button>
        </>
      )}
    </Layout>
  );
};

export default RestorePassword;
