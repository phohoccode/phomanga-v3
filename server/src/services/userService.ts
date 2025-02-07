import connection from "../database/mysql";
import { error_server } from "../lib/define";
import { v4 as uuidv4 } from "uuid";
import { rawDataGetUserInfo } from "../lib/types";

export const handleGetUserInfo = async (rawData: rawDataGetUserInfo) => {
  const { email, typeAccount, userId } = rawData;

  try {
    const sql_select = `
      Select 
        users.id as user_id,
        users.name as username,
        users.email,
        users.avatar,
        users.created_at, 
        users.type_account,
        roles.name as role_name, 
        vip_levels.level as vip_level,
        vip_levels.max_stories as max_stories
      from users, roles, vip_levels 
      where ${userId ? `users.id = '${userId}'` : `users.email = '${email}'`}
      ${typeAccount ? `and users.type_account = '${typeAccount}'` : ""}
      and users.role_id = roles.id
      and users.vip_level_id = vip_levels.id
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

export const handleAddFeedback = async (rawData: any) => {
  const { userId, title, description } = rawData;

  try {
    const sql_insert = `
      Insert into user_feedback (id, user_id, title, description)
      values ('${uuidv4()}', '${userId}', '${title}', '${description}')
    `;

    const response: any = await connection.promise().query(sql_insert);

    if (response?.[0]?.affectedRows === 0) {
      return {
        status: "error",
        message: "Gửi phản hồi thất bại!",
      };
    }

    return {
      status: "success",
      message: "Gửi phản hồi thành công!",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};
