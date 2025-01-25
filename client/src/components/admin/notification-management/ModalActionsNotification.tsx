"use client";

import RootModal from "@/components/modals/RootModal";
import { createNotification, updateNotification } from "@/lib/actions";
import { socket } from "@/lib/socket";
import { setShowModalActionsNotification } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Button, Form, Input, message, Space } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalActionsNotification = () => {
  const { showModalActionsNotification } = useSelector(
    (state: RootState) => state.system
  );
  const { dataUpdate, action, title } = useSelector(
    (state: RootState) => state.notification
  );
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { data: sesstion } = useSession();
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (showModalActionsNotification) {
      if (action === "update") {
        form.setFieldsValue({
          title: dataUpdate?.title,
          content: dataUpdate?.content,
        });
      } else {
        form.resetFields();
      }
    }
  }, [action, dataUpdate]);

  const handleCancel = () => {
    dispatch(setShowModalActionsNotification(false));
  };

  const handleOk = async () => {
    const values = await form.getFieldsValue();

    if (!sesstion) {
      message.error("Vui lòng đăng nhập để thực hiện chức năng này.");
      return;
    }

    if (!values.title || !values.content) {
      message.error("Vui lòng nhập đủ thông tin.");
      return;
    }

    let response: any;

    setLoading(true);

    if (action === "create") {
      response = await createNotification(
        values.title,
        values.content,
        sesstion?.user?.id as string,
        "system"
      );

      form.resetFields();

      socket.emit("newNotification");
      
    } else if (action === "update") {
      response = await updateNotification(
        dataUpdate.id,
        values.title,
        values.content,
        sesstion?.user?.id as string
      );
    }

    setLoading(false);

    if (response?.status === "success") {
      message.success(response?.message);
      handleCancel();
      router.refresh();

      socket.emit("updateNotification");
    } else {
      message.error(response?.message);
    }
  };

  return (
    <RootModal
      title={title}
      isModalOpen={showModalActionsNotification}
      footer={
        <Space size="middle">
          <Button onClick={handleCancel}>Huỷ bỏ</Button>
          <Button type="primary" loading={loading} onClick={handleOk}>
            {action === "create" ? "Tạo" : "Cập nhật"}
          </Button>
        </Space>
      }
      onCancel={handleCancel}
    >
      <Form
        style={{ marginTop: "32px" }}
        form={form}
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
