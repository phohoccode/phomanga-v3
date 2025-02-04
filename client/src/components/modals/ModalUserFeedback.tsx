"use client";

import { Button, Form, Input, message, Space } from "antd";
import RootModal from "./RootModal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createUserFeedback } from "@/store/asyncThunk/userAsyncThunk";
import { setShowModalUserFeedback } from "@/store/slices/systemSlice";

const ModalUserFeedback = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: sesstion } = useSession();
  const { items } = useSelector((state: RootState) => state.comic.comicInfo);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        title: items?.name,
      });
    }
  }, [isModalOpen]);

  const handleOk = async () => {
    const values = await form.getFieldsValue();

    if (!sesstion) {
      message.info("Chà, bạn đâu rồi? Đăng nhập để làm điều kỳ diệu này nào!");
      return;
    }

    if (!values.title || !values.description) {
      message.info(
        "Trời ơi, thiếu mất một chút xíu rồi! Cần đủ tiêu đề và mô tả để tiếp tục."
      );
      return;
    }

    setLoading(true);
    const response: any = await dispatch(
      createUserFeedback({
        userId: sesstion.user?.id as string,
        title: values.title,
        description: values.description,
      })
    );
    setLoading(false);

    if (response.payload?.status === "success") {
      message.success(
        "Phản hồi của bạn đã bay vào hệ thống! Cảm ơn bạn nhiều nha!"
      );
      form.resetFields();
      dispatch(setShowModalUserFeedback(false));
    } else {
      message.error("Có lỗi xảy ra! Vui lòng thử lại sau.");
    }
  };

  return (
    <RootModal
      title="Phản hồi về truyện"
      isModalOpen={isModalOpen}
      footer={
        <Space size="middle">
          <Button onClick={onCancel}>Huỷ bỏ</Button>
          <Button type="primary" loading={loading} onClick={handleOk}>
            Gửi phản hồi
          </Button>
        </Space>
      }
      onCancel={onCancel}
    >
      <Form
        style={{ marginTop: "32px" }}
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề." }]}
        >
          <Input autoFocus size="large" />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Mô tả phản hồi..." }]}
        >
          <Input.TextArea size="large" />
        </Form.Item>
      </Form>
    </RootModal>
  );
};

export default ModalUserFeedback;
