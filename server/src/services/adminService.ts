import { error_server } from "../lib/define";
import connection from "../database/mysql";

export const handleGetAllUsers = async (rawData: any) => {
  const { page, sort, limit } = rawData;

  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    const sql_select = `
      SELECT users.id, users.name, users.email, users.type_account,
      users.account_status, users.created_at, roles.name as role
      from users, roles
      where users.role_id = roles.id and roles.name = 'user'
      ORDER BY users.created_at ${sort}
      LIMIT ${limit} OFFSET ${offset};
    `;

    const sql_select_total = `
      Select count(*) as total from users
      where role_id = 2
    `;

    const [rows]: any = await connection.promise().query(sql_select);
    const [rows_total]: any = await connection
      .promise()
      .query(sql_select_total);

    return {
      status: "success",
      data: {
        users: rows,
        totalItems: rows_total[0].total,
      },
    };
  } catch (error) {
    console.log(">>> error-get-all-users", error);
    return error_server;
  }
};

export const handleGetAllComments = async (rawData: any) => {
  const { page, sort, limit } = rawData;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    const sql_select_by_page = `
      SELECT c.id, c.content, c.created_at, u.name, c.user_id, c.comic_slug
      FROM comments c, users u
      WHERE c.user_id = u.id
      ORDER BY c.created_at ${sort}
      LIMIT ${limit} OFFSET ${offset};
    `;

    const sql_select_total = `
      Select count(*) as total from comments
    `;

    const [rows]: any = await connection.promise().query(sql_select_by_page);
    const [rows_total]: any = await connection
      .promise()
      .query(sql_select_total);

    console.log(">>> rows", rows);
    console.log(">>> rows_total", rows_total);

    return {
      status: "success",
      data: {
        comments: rows,
        totalItems: rows_total[0].total,
      },
    };
  } catch (error) {
    console.log(">>> error-get-all-comments", error);
    return error_server;
  }
};

export const handleGetAllNotifications = async () => {
  try {
    const sql_select = `SELECT * FROM notifications`;
    const [rows]: any = await connection.query(sql_select);

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
