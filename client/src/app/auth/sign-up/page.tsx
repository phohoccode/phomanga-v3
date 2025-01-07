"use client";

import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Divider, Flex, Form, Input, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import Link from "next/link";

type FieldType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  code?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Page = () => {
  return (
    <Form
      initialValues={{
        username: "",
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
          <Button size="large" color="cyan" variant="outlined">
            Gửi mã
          </Button>
        </Flex>
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
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

export default Page;
