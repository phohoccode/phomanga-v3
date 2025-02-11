import { error_server } from "../lib/define";
import connection from "../database/mysql";

export const handleGetAllUsers = async () => {
  try {
    const sql_select = `
      SELECT users.id, users.name, users.email, users.type_account,
      users.account_status, users.created_at, roles.name as role
      from users, roles
      where users.role_id = roles.id
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
      SELECT c.id, c.content, c.created_at, u.name, c.user_id, c.comic_slug
      FROM comments c, users u
      WHERE c.user_id = u.id

    `;

    const [rows]: any = await connection.promise().query(sql_select_by_page);

    return {
      status: "success",
      data: {
        comments: rows,
      },
    };
  } catch (error) {
    console.log(">>> error-get-all-comments", error);
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
    console.log(">>> error-get-all-notifications", error);
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
    console.log(">>> error-get-all-feedbacks", error);
    return error_server;
  }
};
