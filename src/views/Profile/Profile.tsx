import { Button, Form, Layout } from "@package";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectUser } from "@store/auth/authSlice";
import ProfileImg from "./profile.svg";
import "./_profile.scss";
import { Link } from "react-router-dom";
import { User } from "../../types/user.type";
import $http from "@services/AxiosInstance";
import baseApiUrl from "@services/BaseApiUrl";
import { toast } from "react-toastify";

const Profile = () => {
  const userRedux = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(userRedux);
  const [inputs, setInputs] = useState<Array<any>>([
    {
      key: "firstName",
      placeholder: "First Name",
      name: "firstName",
      title: "First Name:",
      value: user?.firstName,
      type: "text",
      cols: "c-col-span-4",
    },
    {
      key: "lastName",
      placeholder: "Last Name",
      name: "lastName",
      title: "Last Name:",
      value: user?.lastName,
      type: "text",
      cols: "c-col-span-6",
    },
    {
      key: "email",
      placeholder: "E-mail",
      name: "email",
      title: "E-mail:",
      value: user?.email,
      type: "text",
      cols: "c-col-span-6",
    },
  ]);

  useEffect(() => {
    setUser(userRedux);
  }, [userRedux]);

  const memorizedInputs = useMemo(() => inputs, [inputs]);

  const onSubmit = async (data: any) => {
    const updatedUserData: any = {
      ...user,
      firstName: data.items.firstName,
      lastName: data.items.lastName,
      email: data.items.email,
    };

    try {
      const response = await $http.patch(
        `${baseApiUrl}/api/v1/users/${user?.id}`,
        updatedUserData
      );

      if (response.status === 200) {
        setUser(updatedUserData);
        dispatch({ type: "auth/setUser", payload: updatedUserData });
        toast.success("User updated successfully", {
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error("Failed to update user.", {
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user.", {
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <Layout title="My Profile">
      <div className="container_profile">
        <Form inputs={memorizedInputs} onSubmit={onSubmit}>
          <Link to="/forgot-password" className="link_change_password">
            Change Password
          </Link>
          <Button type="submit" customClass="btn-primary">
            Save
          </Button>
        </Form>
        <img src={ProfileImg} alt="profile" className="profile_img" />
      </div>
    </Layout>
  );
};

export default Profile;