import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error("Kết nối database thất bại!", err);
    return;
  }
  console.log("Kết nối database thành công!");
})


export default connection;
