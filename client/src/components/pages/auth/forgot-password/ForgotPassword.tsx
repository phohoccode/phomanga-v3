"use client";

import React, { useState } from "react";
import type { FormProps } from "antd";
import Link from "next/link";
import { resetPassword, sendOTP } from "@/lib/actions/auth";
import { Button, Flex, Form, Input, message, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
} from "@ant-design/icons";

type FieldType = {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
};
const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loadingSendOTP, setLoadingSendOTP] = useState<boolean>(false);
  const [loadingResetPassword, setLoadingResetPassword] =
    useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu không khớp!");
      return;
    }

    setLoadingResetPassword(true);
    const response = await resetPassword({
      email: values.email,
      password: values.password,
      otp: values.otp,
    });
    setLoadingResetPassword(false);

    if (response?.status === "error") {
      message.error(response?.message);
    } else {
      message.success(response?.message);
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
    const response = await sendOTP(email, "forgot_password");
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
        username: "",
        password: "",
        confirmPassword: "",
        otp: "",
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
          ĐẶT LẠI MẬT KHẨU
        </Typography.Title>
        <Typography.Text style={{ color: "rgb(139,139,139)" }}>
          Nhập địa chỉ email của bạn để nhận mã xác thực và nhập mật khẩu mới
          bên dưới để đặt lại mật khẩu.
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
        name="otp"
        rules={[{ required: true, message: "Vui lòng nhập mã xác thực." }]}
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
            htmlType="button"
            onClick={() => handleSendOTP()}
            size="large"
            color="cyan"
            variant="outlined"
          >
            Gửi mã
          </Button>
        </Flex>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới." }]}
      >
        <Input.Password
          color="cyan"
          variant="outlined"
          size="large"
          placeholder="Mật khẩu mới"
          prefix={<LockOutlined />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu mới." }]}
      >
        <Input.Password
          color="cyan"
          variant="outlined"
          size="large"
          placeholder="Nhập lại mật khẩu mới"
          prefix={<LockOutlined />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          size="large"
          color="cyan"
          variant="solid"
          style={{ width: "100%" }}
          htmlType="submit"
          loading={loadingResetPassword}
        >
          Đặt lại mật khẩu
        </Button>
        <Flex justify="end" className="mt-3">
          <Link className="text-[#13c2c2]" href="/auth/sign-in">
            Quay lại đăng nhập
          </Link>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;
