import connection from "../database/mysql";
import { error_server } from "../lib/define";

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
        users.type_account,
        roles.name as role_name, 
        vip_levels.level as vip_level,
        vip_levels.max_stories as max_stories
      from users, roles, vip_levels 
      where email = '${email}' and users.role_id = roles.id
      and users.type_account = '${typeAccount}' and users.vip_level_id = vip_levels.id
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
      user: rows?.[0],
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};
