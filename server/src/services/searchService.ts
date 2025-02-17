import connection from "../database/mysql";
import { error_server } from "../lib/define";
import { v4 as uuidv4 } from "uuid";
import { rawDataGetSearchHistory } from "../lib/types";

export const handleGetSearchHistory = async (
  rawData: rawDataGetSearchHistory
) => {
  const { userId, limit, page } = rawData;

  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    const sql_select = `
      Select * from search_history 
      where user_id = '${userId}' and is_deleted = 0
      order by created_at desc
      limit ${limit} offset ${offset}
    `;

    const sql_select_total = `
      Select count(*) as total from search_history
      where user_id = '${userId}' and is_deleted = 0
    `;

    const [rows]: any = await connection.promise().query(sql_select);
    const [rows_total]: any = await connection
      .promise()
      .query(sql_select_total);

    return {
      status: "success",
      message: "Lấy thông tin tìm kiếm thành công!",
      data: {
        items: rows,
        totalItems: rows_total[0].total,
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
      Update search_history set is_deleted = 1
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
