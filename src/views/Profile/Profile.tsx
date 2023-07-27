import { Button, Form, Layout } from "@package";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectUser } from "@store/auth/authSlice";
import ProfileImg from './profile.svg'
import './_profile.scss'
import { Link } from "react-router-dom";
import { User } from "../../types/user.type";


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

const onSubmit = async (data: any) => {
    console.log(data);
    
};

  return (
    <Layout title="My Profile">
      <div className="container_profile">
        <Form inputs={inputs} onSubmit={onSubmit}>
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
