import React from "react";
import { Form, Input, Select } from "antd";
import PrimaryButton from "./Button";
import { useQuery } from "@apollo/client";
import "./form.css";
import { GET_USER_FOLLOWERS } from "../../Queries";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

interface PostFormProps {
  setFormValue: (values: any) => void;
  handleSubmit: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ setFormValue, handleSubmit }) => {
  const handleValueChange = (changedValues: Record<string, any>) => {
    setFormValue((formValues: any) => ({ ...formValues, ...changedValues }));
  };

  const { data: tagsData, loading, error } = useQuery(GET_USER_FOLLOWERS, {
    fetchPolicy:"network-only"
  });

  console.log({tagsData})

  return (
    <Form
      {...formItemLayout}
      onValuesChange={handleValueChange}
      className="!w-full"
    >
      <Form.Item label="Content" name="content" className="!mb-0">
        <Input.TextArea placeholder="Post content" />
      </Form.Item>

      <Form.Item label="Tag" name="tag" className="!mb-0">
        <Select placeholder="Select a user" style={{ width: 200 }} mode="multiple" optionFilterProp="children" className="!w-full">
          {tagsData.getUserFollowers.map((user:any) => (
            <Select.Option key={user._id} value={user._id}>
              {user.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <PrimaryButton
          type="button"
          onClick={handleSubmit}
          title="Add Post"
          className="bg-red-600 text-white p-3 rounded-lg text-center font-bold mt-4 !border-0 active:bg-red-800"
        />
      </Form.Item>
    </Form>
  );
};

export default PostForm;
