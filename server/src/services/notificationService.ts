import { error_server } from "../lib/define";
import connection from "../database/mysql";
import {
  rawDataCreateNotification,
  rawDataDeleteNotification,
  rawDataGetAllNotifications,
  rawDataUpdateNotification,
} from "../lib/types";

export const handleGetAllNotifications = async (
  rawData: rawDataGetAllNotifications
) => {
  const { type, userId, limit, page } = rawData;

  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    const sql_select =
      type === "system"
        ? `
          SELECT notification.*
          FROM notification
          WHERE type = '${type}' and is_deleted = 0
          ORDER BY notification.created_at DESC
          LIMIT ${limit} OFFSET ${offset};
        `
        : `
          SELECT * FROM notification
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
    console.log(">>> error-get-all-notifications", error);
    return error_server;
  }
};

export const handleCreateNotification = async (
  rawData: rawDataCreateNotification
) => {
  const { title, content, userId } = rawData;

  try {
    const sql_insert = `
      INSERT INTO notification (title, content, type, user_id)
      VALUES ('${title}', '${content}', 'system', '${userId}')
    `;

    const [rows]: any = await connection.promise().execute(sql_insert);

    if (rows.affectedRows === 0) {
      return {
        status: "error",
        message: "Create notification failed",
      };
    }

    return {
      status: "success",
      data: {
        notificationId: rows.insertId,
      },
    };
  } catch (error) {
    console.log(">>> error-create-notification", error);
    return error_server;
  }
};

export const handleDeleteNotification = async (
  rawData: rawDataDeleteNotification
) => {

  const { notificationId, userId } = rawData;

  try {
    const sql_delete = `
      UPDATE notification set is_deleted = 1
      WHERE id = '${notificationId}' and user_id = '${userId}'
    `;

    const [rows]: any = await connection.promise().execute(sql_delete);

    if (rows.affectedRows === 0) {
      return {
        status: "error",
        message: "Delete notification failed",
      };
    }

    return {
      status: "success",
      message: "Delete notification successfully",
    };
  } catch (error) {
    console.log(">>> error-delete-notification", error);
    return error_server;
  }
};

export const handleUpdateNotification = async (
  rawData: rawDataUpdateNotification
) => {
  const { notificationId, title, content } = rawData;

  try {
    const sql_update = `
      UPDATE notification
      SET title = '${title}', content = '${content}'
      WHERE id = '${notificationId}'
    `;

    const [rows]: any = await connection.promise().execute(sql_update);

    if (rows.affectedRows === 0) {
      return {
        status: "error",
        message: "Update notification failed",
      };
    }

    return {
      status: "success",
      message: "Update notification successfully",
    };
  } catch (error) {
    console.log(">>> error-update-notification", error);
    return error_server;
  }
};
