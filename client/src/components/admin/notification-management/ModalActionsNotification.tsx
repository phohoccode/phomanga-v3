"use client";

import RootModal from "@/components/modals/RootModal";
import { Button, Form, Input, message, Space } from "antd";

const ModalActionsNotification = ({
  loading,
  action,
  title,
  isModalOpen,
  onCancel,
  onOk,
}: {
  loading: boolean;
  action: "create" | "update";
  title: string | React.ReactNode;
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onOk: (values: any) => void;
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.getFieldsValue();

    if (!values.title || !values.content) {
      message.error("Vui lòng nhập đủ thông tin.");
      return;
    }

    onOk(values);
  };

  return (
    <RootModal
      title={title}
      isModalOpen={isModalOpen}
      footer={
        <Space size="middle">
          <Button onClick={onCancel}>Huỷ bỏ</Button>
          <Button type="primary" loading={loading} onClick={handleOk}>
            {action === "create" ? "Tạo" : "Cập nhật"}
          </Button>
        </Space>
      }
      onCancel={onCancel}
    >
      <Form
        style={{ marginTop: "32px" }}
        form={form}
        initialValues={{ title: "", content: "" }}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề." }]}
        >
          <Input size="large" placeholder="Tiêu đề..." />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{ required: true, message: "Vui lòng nhập nội dung." }]}
        >
          <Input.TextArea size="large" placeholder="Nội dung..." />
        </Form.Item>
      </Form>
    </RootModal>
  );
};

export default ModalActionsNotification;
