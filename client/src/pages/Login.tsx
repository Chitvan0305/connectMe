import type { FormProps } from "antd";
import { Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../Mutations";
import AppLayout from "../Layout/AppLayout";
import PrimaryButton from "../components/Shared/Button";
import { useNavigate } from "react-router-dom";

type FieldType = {
  password?: string;
  email?: string;
};

const Login = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    fetchPolicy: "network-only",
  });

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
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
    console.log({ values });

    const data = await loginUser({ variables: values });

    if (data?.data?.loginUser) {
      const { token } = data?.data?.loginUser;
      setCookie("user_token", token, 1);
      navigate("/");
    }
  };

  const headButton = () => {
    return (
      <PrimaryButton
        onClick={() => navigate("/signup")}
        className="border-2 border-white rounded-md text-white p-3 bg-transparent"
        title="Sign Up"
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
              title="Login"
              className="bg-red-600 text-white p-3 rounded-lg text-center font-bold mt-4 !border-0 active:bg-red-800"
            />
          </Form.Item>
        </Form>
      </div>
    </AppLayout>
  );
};

export default Login;
