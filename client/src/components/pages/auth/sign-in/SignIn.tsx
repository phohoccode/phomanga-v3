"use client";

import React from "react";
import { type FormProps } from "antd";
import Link from "next/link";
import { authenticate } from "@/lib/actions";
import { signIn } from "next-auth/react";
import { Button, Divider, Flex, Form, Input, Typography, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";

type FieldType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    const res = await authenticate(values.email, values.password);
    setLoading(false);

    if (res?.status === "error") {
      message.error(res?.message);
    } else {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      initialValues={{ username: "", password: "" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      style={{ width: "320px" }}
      autoComplete="off"
    >
      <Form.Item>
        <Typography.Title
          style={{ color: "#13c2c2", textAlign: "center" }}
          level={2}
        >
          ĐĂNG NHẬP
        </Typography.Title>
        <Typography.Text style={{ color: "rgb(139,139,139)" }}>
          Đăng nhập để tận hưởng giây phút đọc truyện tuyệt vời cùng
          PHOMANGA-V3.
        </Typography.Text>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { type: "email", message: "Email không đúng định dạng." },
          { required: true, message: "Vui lòng nhập địa chỉ email." },
        ]}
      >
        <Input
          size="large"
          placeholder="Địa chỉ email"
          prefix={<MailOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu." }]}
      >
        <Input.Password
          color="cyan"
          variant="outlined"
          size="large"
          placeholder="Mật khẩu"
          prefix={<LockOutlined />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          size="large"
          color="cyan"
          variant="solid"
          style={{ width: "100%" }}
          htmlType="submit"
        >
          Đăng nhập
        </Button>
        <Flex justify="space-between" align="center" className="mt-3">
          <Link className="text-[#13c2c2]" href="/auth/forgot-password">
            Quên mật khẩu?
          </Link>
          <Link className="text-[#13c2c2]" href="/auth/sign-up">
            Đăng ký
          </Link>
        </Flex>
      </Form.Item>

      <Divider orientation="center" style={{ color: "rgba(139,139,139)" }}>
        Hoặc
      </Divider>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          icon={<GoogleOutlined />}
          size="large"
          style={{ width: "100%" }}
          onClick={() =>
            signIn("google", { callbackUrl: "http://localhost:3000/" })
          }
        >
          Đăng nhập với Google
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignIn;
