import connection from "../database/mysql";

export const handleGetUserByEmail = async (
  email: string,
  typeAccount: string
) => {
  try {
    const sql_select = `
      Select 
      users.id as user_id,
      users.name as username,
      users.email,
      users.created_at, 
      roles.name as role_name, 
      users.type_account
      from users, roles 
      where email = '${email}' and users.role_id = roles.id and users.type_account = '${typeAccount}'
    `;
    const [rows]: any = await connection.promise().query(sql_select);

    console.log(">>> rows", rows);

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
      user: rows?.[0],
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
