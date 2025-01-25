import connection from "../database/mysql";
import { error_server } from "../lib/define";
import { v4 as uuidv4 } from "uuid";

export const handleGetSearchHistory = async (userId: string) => {
  try {
    const sql_select = `
      Select * from search_history 
      where user_id = '${userId}'
      order by created_at desc
    `;

    const [rows]: any = await connection.promise().query(sql_select);

    console.log(">>> rows", rows);

    return {
      status: "success",
      message: "Lấy thông tin tìm kiếm thành công!",
      data: {
        items: rows,
      },
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleAddSearchHistory = async (
  userId: string,
  keyword: string
) => {
  try {
    const id = uuidv4();
    const sql_insert = `
      Insert into search_history (id, user_id, keyword)
      values ('${id}', '${userId}', '${keyword}')
    `;
    await connection.promise().query(sql_insert);

    return {
      status: "success",
      message: "Thêm lịch sử tìm kiếm thành công!",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};

export const handleDeleteSearchHistory = async (
  userId: string,
  searchId: string
) => {
  try {
    const sql_delete = `
      Delete from search_history 
      where user_id = '${userId}' and id = '${searchId}'
    `;
    await connection.promise().query(sql_delete);

    return {
      status: "success",
      message: "Xóa lịch sử tìm kiếm thành công!",
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};
