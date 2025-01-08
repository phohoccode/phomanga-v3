import connection from "../database/mysql/connectDB";

const handleGetUserByEmail = async (email: string) => {
  try {
    const sql_select = `
      Select 
      users.id as user_id,
      users.name as username, users.email, 
      roles.name as role_name, 
      roles.id as role_id, 
      roles.description as role_description
      from users, roles 
      where email = '${email}'
    `;
    const [rows]: any = await connection.promise().query(sql_select);

    if (rows?.length === 0) {
      return {
        status: "error",
        error_code: "user_not_found",
        message: "Không tìm thấy người dùng!",
      };
    }

    return {
      status: "success",
      message: "Lấy thông tin người dùng thành công!",
      user: rows[0],
    };
  } catch (error) {
    console.log(">>> error-login", error);
    return {
      status: "error",
      error_code: "error_server",
      message: "Lỗi server!",
    };
  }
};

export { handleGetUserByEmail };
