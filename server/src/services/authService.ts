import connection from "../database/mysql";
import type {
  rawDataLogin,
  rawDataRegister,
  rawDataResetPassword,
  rawDataSendOTP,
} from "../lib/types";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { hashUserPassword, checkPassword } from "../lib/utils";
import { error_server } from "../lib/define";

const salt = bcrypt.genSaltSync(10);

const handleLogin = async (rawData: rawDataLogin) => {
  try {
    const sql_select = `
      Select * from users 
      where email = '${rawData?.email}'
    `;
    const [rows]: any = await connection.promise().query(sql_select);

    const isCorrectPassword = checkPassword(
      rawData?.password,
      rows[0]?.password
    );

    if ((rows as any)?.length === 0 || !isCorrectPassword) {
      return {
        status: "error",
        error_code: "invalid_credentials",
        message: "Thông tin đăng nhập không chính xác!",
      };
    }

    return {
      id: rows[0]?.id,
      name: rows[0]?.name,
      email: rows[0]?.email,
    };
  } catch (error) {
    console.log(">>> error-login", error);
    return error_server;
  }
};

const handleRegister = async (rawData: rawDataRegister) => {
  try {
    if (!validator.isEmail(rawData?.email)) {
      return {
        status: "error",
        error_code: "invalid_email",
        message: "Email không hợp lệ!",
      };
    }

    if (!validator.isStrongPassword(rawData?.password)) {
      return {
        status: "error",
        error_code: "weak_password",
        message:
          "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!",
      };
    }

    const sql_check_email_exists = `
      Select * from users 
      where email = '${rawData?.email}'
    `;

    const [rows]: any = await connection
      .promise()
      .query(sql_check_email_exists);

    if ((rows as any).length > 0) {
      return {
        status: "error",
        error_code: "email_exist",
        message: "Email đã tồn tại!",
      };
    }

    const sql_check_otp = `
      Select * from otp_codes
      where email = '${rawData?.email}' 
      and otp = '${rawData?.otp}' 
      and type = 'register_account'
    `;

    const [rows_otp]: any = await connection.promise().query(sql_check_otp);

    if ((rows_otp as any).length === 0) {
      return {
        status: "error",
        error_code: "invalid_otp",
        message: "Mã xác thực không chính xác!",
      };
    }

    const passwordHash = hashUserPassword(rawData?.password, salt);
    const user_id = uuidv4();

    const sql_register_account = `
      Insert into users (id, name, email, password, role_id, account_status)
      values ('${user_id}', '${rawData?.name}', '${rawData?.email}','${passwordHash}', '1', 'active')
    `;

    const [rows_users]: any = await connection
      .promise()
      .query(sql_register_account);

    if ((rows_users as any).length === 0) {
      return {
        status: "error",
        error_code: "error_register",
        message: "Lỗi khi đăng ký tài khoản!",
      };
    }

    return {
      status: "success",
      message: "Đăng ký tài khoản thành công!",
    };
  } catch (error) {
    console.log(">>> error-login", error);
    return error_server;
  }
};

const handleResetPassword = async (rawData: rawDataResetPassword) => {
  try {
    if (!validator.isEmail(rawData?.email)) {
      return {
        status: "error",
        error_code: "invalid_email",
        message: "Email không hợp lệ!",
      };
    }

    if (!validator.isStrongPassword(rawData?.password)) {
      return {
        status: "error",
        error_code: "weak_password",
        message:
          "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!",
      };
    }

    const sql_check_email_exists = `
      Select * from users 
      where email = '${rawData?.email}'
    `;

    const [rows]: any = await connection
      .promise()
      .query(sql_check_email_exists);

    if ((rows as any).length === 0) {
      return {
        status: "error",
        error_code: "email_not_exist",
        message: "Email không tồn tại trong hệ thống!",
      };
    }

    const sql_check_otp = `
      Select * from otp_codes
      where email = '${rawData?.email}' 
      and otp = '${rawData?.otp}' 
      and type = 'forgot_password'
    `;

    const [rows_otp]: any = await connection.promise().query(sql_check_otp);

    if ((rows_otp as any).length === 0) {
      return {
        status: "error",
        error_code: "invalid_otp",
        message: "Mã xác thực không chính xác!",
      };
    }

    const passwordHash = hashUserPassword(rawData?.password, salt);

    const sql_update_password = `
      Update users
      set password = '${passwordHash}'
      where email = '${rawData?.email}'
    `;

    const [rows_update]: any = await connection
      .promise()
      .query(sql_update_password);

    if ((rows_update as any).length === 0) {
      return {
        status: "error",
        error_code: "error_reset_password",
        message: "Lỗi khi đặt lại mật khẩu!",
      };
    }

    return {
      status: "success",
      message: "Đặt lại mật khẩu thành công!",
    };
  } catch (error) {
    console.log(">>> error-login", error);
    return error_server;
  }
};

const handleSendOTP = async (rawData: rawDataSendOTP) => {
  try {
    const id = uuidv4();
    const sql_insert_otp = `
      Insert into otp_codes (id, email, otp, type)
      values ('${id}', '${rawData?.email}', '${rawData?.otp}', '${rawData?.type}')
    `;

    const [rows]: any = await connection.promise().query(sql_insert_otp);

    if ((rows as any).length === 0) {
      return {
        status: "error",
        error_code: "error_send_otp",
        message: "Lỗi khi gửi mã xác thực!",
      };
    }

    return {
      status: "success",
      message: "Gửi mã xác thực thành công!",
    };
  } catch (error) {
    console.log(">>> error-login", error);
    return error_server;
  }
};

export { handleLogin, handleRegister, handleResetPassword, handleSendOTP };
