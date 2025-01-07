import connection from "../database/mysql/connectDB";
import { rawDataLogin } from "../types";

const handleLogin = async (rawData: rawDataLogin) => {
  try {
    console.log(">>> rawData", rawData);

    const sql_select = `
      Select * from users 
      where email = '${rawData.email}' and password = '${rawData.password}'
    `;
    const [rows]: any = await connection.promise().query(sql_select);

    console.log('>>> rows', rows)

    if ((rows as any).length === 0) {
      return {
        status: "error",
        error_code: "invalid_credentials",
        message: "Thông tin đăng nhập không chính xác!",
      };
    }

    console.log("Dữ liệu từ database:", rows);
    return rows[0]

  } catch (error) {
    console.log(">>> error-login", error);
    return {
      status: "error",
      error_code: "error_server",
      message: "Lỗi server!",
    };
  }
};

const handleRegister = async (rawData: any) => {};

const handleResetPassword = async (rawData: any) => {};

export { handleLogin, handleRegister, handleResetPassword };
