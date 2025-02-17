import { error_server } from "../lib/define";
import connection from "../database/mysql";
import {
  rawDataCreateNotification,
  rawDataDeleteNotification,
  rawDataGetAllNotifications,
  rawDataUpdateNotification,
} from "../lib/types";
import { v4 as uuidv4 } from "uuid";

export const handleGetAllNotifications = async (
  rawData: rawDataGetAllNotifications
) => {
  const { type, userId, limit, page } = rawData;

  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    const sql_select =
      type === "system"
        ? `
          SELECT notification.*,
          CONVERT_TZ(notification.created_at, '+00:00', '+07:00') AS created_at
          FROM notification
          WHERE type = '${type}' and is_deleted = 0
          ORDER BY notification.created_at DESC
          LIMIT ${limit} OFFSET ${offset};
        `
        : `
          SELECT notification.*, 
          CONVERT_TZ(created_at, '+00:00', '+07:00') AS created_at
          FROM notification
          WHERE type = '${type}'
          AND user_id = '${userId}' and is_deleted = 0
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset};
       `;

    const sql_select_total =
      type === "system"
        ? `
      SELECT count(*) as total from notification
      WHERE type = '${type}' and is_deleted = 0
    `
        : `
      SELECT count(*) as total from notification
      WHERE type = '${type}'
      AND user_id = '${userId}' and is_deleted = 0
    `;

    const [rows]: any = await connection.promise().execute(sql_select);
    const [rows_total]: any = await connection
      .promise()
      .execute(sql_select_total);

    return {
      status: "success",
      data: {
        items: rows,
        totalItem: rows_total[0].total,
        type,
      },
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleCreateNotification = async (
  rawData: rawDataCreateNotification
) => {
  const { title, content, userId, type } = rawData;

  try {
    const id = uuidv4();

    const sql_insert = `
      INSERT INTO notification (id, title, content, type, user_id)
      VALUES ('${id}', '${title}', '${content}', '${type}', '${userId}')
    `;

    const [rows]: any = await connection.promise().execute(sql_insert);

    if (rows.affectedRows === 0) {
      return {
        status: "error",
        message: "Tạo thông báo thất bại!",
      };
    }

    return {
      status: "success",
      message: "Tạo thông báo thành công!",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleDeleteNotification = async (
  rawData: rawDataDeleteNotification
) => {
  const { notificationId, userId, role } = rawData;

  try {
    let sql_delete = "";

    if (role === "admin") {
      sql_delete = `
        UPDATE notification set is_deleted = 1
        WHERE id = '${notificationId}' 
      `;
    } else if (role === "user") {
      sql_delete = `
        UPDATE notification set is_deleted = 1
        WHERE id = '${notificationId}' and user_id = '${userId}'
      `;
    }

    const [rows]: any = await connection.promise().execute(sql_delete);

    if (rows.affectedRows === 0) {
      return {
        status: "error",
        message: "Xóa thông báo thất bại!",
      };
    }

    return {
      status: "success",
      message: "Xóa thông báo thành công!",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleUpdateNotification = async (
  rawData: rawDataUpdateNotification
) => {
  const { id, title, content } = rawData;

  try {
    const sql_update = `
      UPDATE notification
      SET title = '${title}', content = '${content}'
      WHERE id = '${id}' 
    `;

    const [rows]: any = await connection.promise().execute(sql_update);

    if (rows.affectedRows === 0) {
      return {
        status: "error",
        message: "Cập nhật thông báo thất bại!",
      };
    }

    return {
      status: "success",
      message: "Cập nhật thông báo thành công!",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};
