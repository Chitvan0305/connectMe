import React from "react";
import type { FormProps } from "antd";
import { Form, Input, notification } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_USER } from "../Mutations";
import AppLayout from "../Layout/AppLayout";
import PrimaryButton from "../components/Shared/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
};

const SignUpForm: React.FC = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [createUser, { data, loading, error }] = useMutation(CREATE_NEW_USER);

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    notification.error({
      message:"Something went wrong",
      placement:"topRight"
    })
  };

  const setCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const data = await createUser({ variables: values });

    if (data?.data?.createUser) {
      const { token } = data?.data?.createUser;
      setCookie("user_token", token, 1);
      dispatch(setUser(data?.data?.createUser?.user));
      navigate("/");
    }
  };

  const headButton = () => {
    return (
      <PrimaryButton
        onClick={() => navigate("/login")}
        className="border-2 border-white rounded-md text-white p-3 bg-transparent"
        title="Login"
      />
    );
  };

  return (
    <AppLayout isHome={false} button={headButton()} isLoading={loading}>
      <div className="w-3/4 m-auto bg-white shadow-md rounded-lg p-3 mt-[150px] flex justify-center items-center">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-full"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            className="!mb-3"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            className="!mb-3"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="!mb-3"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <PrimaryButton
              type="submit"
              title="Sign up"
              className="bg-red-600 text-white p-3 rounded-lg text-center font-bold mt-4"
            />
          </Form.Item>
        </Form>
      </div>
    </AppLayout>
  );
};

export default SignUpForm;
