import connection from "./db";

export const fetchAllUsers = async () => {
  try {
    const sql_select = "SELECT * FROM users";
    const [rows, fields] = await connection.promise().query(sql_select);

    console.log("Dữ liệu từ database:", rows);
    return rows;
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu:", err);
    throw err;
  }
};
