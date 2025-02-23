"use client";

import React, { useState } from "react";
import { type FormProps } from "antd";
import Link from "next/link";
import { register, sendOTP } from "@/lib/actions/auth";
import { Button, Flex, Form, Input, message, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
  UserOutlined,
} from "@ant-design/icons";

type FieldType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
};

const SignUp = () => {
  const [form] = Form.useForm();
  const [loadingSendOTP, setLoadingSendOTP] = useState<boolean>(false);
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Sai pass rồi bạn ơi, chắc tay trượt phím đấy!");
      return;
    }

    setLoadingRegister(true);
    const response = await register({
      email: values.email,
      password: values.password,
      name: values.name,
      otp: values.code,
      typeAccount: "credentials",
      avatar: "/images/avatar.jpg",
    });
    setLoadingRegister(false);

    if (response?.status === "error") {
      message.error(response?.message);
    } else {
      message.success("Đăng ký xong rồi! Giờ thì bung lụa thôi!");
      setTimeout(() => {
        window.location.href = "/auth/sign-in";
      }, 1000);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleSendOTP = async () => {
    const email = form.getFieldValue("email");

    if (!email) {
      message.error("Vui lòng nhập email!");
      return;
    }

    setLoadingSendOTP(true);
    const response = await sendOTP(email, "register_account");
    setLoadingSendOTP(false);

    if (response.status === "error") {
      message.error(response.message);
    } else {
      message.success("Mã xác thực đã được gửi!");
    }
  };

  return (
    <Form
      form={form}
      initialValues={{
        name: "",
        password: "",
        confirmPassword: "",
        code: "",
      }}
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
          ĐĂNG KÝ TÀI KHOẢN
        </Typography.Title>
        <Typography.Text style={{ color: "rgb(139,139,139)" }}>
          Một tài khoản PHOMANGA-V3 là tất cả những gì bạn cần để truy cập vào
          tất cả các dịch vụ của chúng tôi.
        </Typography.Text>
      </Form.Item>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập." }]}
      >
        <Input
          size="large"
          placeholder="Tên người dùng"
          prefix={<UserOutlined />}
        />
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
      <Form.Item
        dependencies={["password"]}
        name="confirmPassword"
        rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu." }]}
      >
        <Input.Password
          color="cyan"
          variant="outlined"
          size="large"
          placeholder="Nhập lại mật khẩu"
          prefix={<LockOutlined />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>

      <Form.Item
        name="code"
        rules={[{ required: true, message: "Vui lòng nhập mã xác thực!" }]}
      >
        <Flex gap={12}>
          <Input
            prefix={<NumberOutlined />}
            style={{ flex: 2 }}
            color="cyan"
            variant="outlined"
            size="large"
            placeholder="Nhập mã xác thực"
            maxLength={6}
          />
          <Button
            loading={loadingSendOTP}
            onClick={() => handleSendOTP()}
            size="large"
            color="cyan"
            variant="outlined"
            htmlType="button"
          >
            Gửi mã
          </Button>
        </Flex>
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          loading={loadingRegister}
          size="large"
          color="cyan"
          variant="solid"
          style={{ width: "100%" }}
          htmlType="submit"
        >
          Đăng ký
        </Button>
        <Flex justify="space-between" align="center" className="mt-3">
          <Link className="text-[#13c2c2]" href="/auth/forgot-password">
            Quên mật khẩu?
          </Link>
          <Link className="text-[#13c2c2]" href="/auth/sign-in">
            Đăng nhập
          </Link>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
