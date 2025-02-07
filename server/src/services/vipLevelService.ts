import connection from "../database/mysql";
import { error_server } from "../lib/define";

export const handleGetAllVipLevel = async () => {
  try {
    const sql_select = `
      Select * from vip_levels
    `;

    const [rows]: any = await connection.promise().query(sql_select);

    return {
      status: "success",
      message: "Lấy thông tin vip level thành công!",
      data: {
        items: rows,
      },
    };
  } catch (error) {
    console.log(error);
    return error_server;
  }
};
