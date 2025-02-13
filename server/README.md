# 1. Hướng dẫn setup dự án

## 1. Clone dự án

```bash
  git clone https://github.com/phohoccode/phomanga-v3.git
```

## 2. Di chuyển đến thư mục server

```bash
  cd phomanga-v3/server
```

## 3. Cài đặt node_modules

```bash
  npm i
```

## 4. Thiết lập database

### MYSQL 

#### 1. Cài đặt XAMPP
- Tải và cài đặt XAMPP: [Download XAMPP](https://www.apachefriends.org/index.html)
- Sau khi cài đặt, mở **XAMPP Control Panel** và khởi động **Apache** và **MySQL**.

#### 2. Tạo Database MySQL
1. Mở trình duyệt và truy cập **phpMyAdmin** tại địa chỉ: http://localhost/phpmyadmin
2. Trong **phpMyAdmin**, tạo một database mới:
- Nhấp vào tab **Databases**.
- Nhập tên database, ví dụ: `phomanga_db`.
- Nhấn **Create**.

#### 3. Cấu hình kết nối MySQL trong file `.env`
Cập nhật file `.env` với thông tin kết nối:
```bash
DB_HOST='localhost'
DB_USER='root'            # Tài khoản mặc định của XAMPP
DB_PASSWORD=''            # Mật khẩu trống nếu bạn chưa cài đặt
DB_NAME='phomanga_db'     # Tên database đã tạo
DB_PORT='3306'            # Cổng mặc định của MySQL trên XAMPP
```

### MongoDB (MongoDB Compass)

#### 1. Cài đặt MongoDB và MongoDB Compass
- **MongoDB Community Server**: [Download MongoDB](https://www.mongodb.com/try/download/community)  
- **MongoDB Compass** (giao diện đồ họa để quản lý dữ liệu): [Download MongoDB Compass](https://www.mongodb.com/try/download/compass)

#### 2. Khởi động MongoDB
- Nếu bạn cài đặt MongoDB trên máy, server MongoDB sẽ chạy ở cổng mặc định `27017`.  
- Kiểm tra kết nối bằng cách mở **MongoDB Compass** và nhập `mongodb://localhost:27017` vào ô **Connection String**, sau đó nhấn **Connect**.

#### 3. Tạo Database với MongoDB Compass
1. Sau khi kết nối, nhấp vào nút **Create Database**.  
2. Điền thông tin:
   - **Database Name**: `phomanga_db`
   - **Collection Name**: `users` (hoặc bất kỳ tên nào bạn muốn)  
   Nhấn **Create Database**.

#### 4. Cấu hình kết nối MongoDB trong file `.env`
Cập nhật file `.env` với thông tin kết nối:
```bash
MONGODB_URI='mongodb://localhost:27017/phomanga_db'
```


## 5. Chạy dự án

```bash
  npm run dev
```

