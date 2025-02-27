import { error_server } from "../lib/define";
import connection from "../database/mysql";

export const handleGetAllUsers = async () => {
  try {
    const sql_select = `
      SELECT users.id, users.name, users.email, users.type_account,
      users.account_status, users.created_at, roles.name as role, vip_levels.level as vip_level
      from users, roles, vip_levels
      where users.role_id = roles.id and users.vip_level_id = vip_levels.id
    `;

    const [rows]: any = await connection.promise().query(sql_select);

    return {
      status: "success",
      data: {
        users: rows,
      },
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleGetAllComments = async () => {
  try {
    const sql_select_by_page = `
      SELECT c.id, c.content, c.created_at, u.name, u.id as user_id,
        c.user_id, c.comic_slug, c.is_spam, c.is_deleted, c.comic_name
      FROM comments c, users u
      WHERE c.user_id = u.id
      ORDER BY created_at DESC
    `;

    const [rows]: any = await connection.promise().query(sql_select_by_page);

    return {
      status: "success",
      data: {
        comments: rows,
      },
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleGetAllNotifications = async () => {
  try {
    const sql_select = `
      SELECT * FROM notification
      where is_deleted = 0 and type = 'system'
      ORDER BY created_at DESC`;

    const [rows]: any = await connection.promise().query(sql_select);

    return {
      status: "success",
      data: {
        notifications: rows,
      },
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleGetAllFeedbacks = async () => {
  try {
    const sql_select = `
      Select 
        user_feedback.id, user_feedback.title,
        user_feedback.description, user_feedback.created_at, 
        users.name, users.email, users.id as user_id
      from user_feedback, users
      where user_feedback.user_id = users.id
      ORDER BY created_at DESC`;

    const [rows]: any = await connection.promise().query(sql_select);

    return {
      status: "success",
      data: {
        feedbacks: rows,
      },
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleUpdateUserRole = async (
  userId: string,
  role: "admin" | "user"
) => {
  try {
    const sql_update = `
      UPDATE users
      SET role_id = (SELECT id FROM roles WHERE name = '${role}')
      WHERE id = '${userId}'
    `;

    const response: any = await connection.promise().query(sql_update);

    if (response[0].affectedRows === 0) {
      return {
        status: "error",
        message: "Cập nhật vai trò thất bại",
      };
    }

    return {
      status: "success",
      message: "Cập nhật vai trò thành công",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleUpdateVipLevels = async (
  userId: string,
  idLevel: number
) => {
  try {
    const sql_update = `
      UPDATE users
      SET vip_level_id = '${idLevel}'
      WHERE id = '${userId}'
    `;

    const response: any = await connection.promise().query(sql_update);

    if (response[0].affectedRows === 0) {
      return {
        status: "error",
        message: "Cập nhật cấp độ VIP thất bại!",
      };
    }

    return {
      status: "success",
      message: "Cập nhật cấp độ VIP thành công!",
      userId,
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleMarkUserCommentAsSpam = async (commentId: string) => {
  try {
    console.log(commentId);

    // nếu is_spam là 1 thì thành 0 và ngược lại
    const sql_update = `
      UPDATE comments
      SET is_spam = CASE WHEN is_spam = 1 THEN 0 ELSE 1 END
      WHERE id = '${commentId}'
    `;

    const sql_select = `
      SELECT is_spam
      FROM comments
      WHERE id = '${commentId}'
    `;

    const response: any = await connection.promise().query(sql_update);
    const [rows]: any = await connection.promise().query(sql_select);

    if (response[0].affectedRows === 0) {
      return {
        status: "error",
        message: "Đánh dấu spam thất bại",
      };
    }

    let message = "";

    if (rows[0]?.is_spam === 1) {
      message = "Đã đánh dấu bình luận này là spam";
    } else {
      message = "Đã bỏ đánh dấu spam cho bình luận này";
    }

    return {
      status: "success",
      message,
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};
