# Cách tạo database trên localhost với sequelize-cli

# Bước 1: Chạy XAMPP , tạo database có tên là web 
# Bước 2: Mở terminal chạy:
    // npx sequelize-cli db:migrate
    * Câu lệnh này sẽ tạo tất cả các table tương ứng với folder migrations, và lưu lại lịch sử migrate vào database(tức là chỉ có thể chạy lệnh này 1 lần, nếu muốn chạy lại phải vào database -> sequelizemeta và xóa lịch sử migrate)
    // npx sequelize db:seed:all
    * Câu lệnh này sẽ tạo data mẫu tương ứng với folder seeders, nhưng chúng sẽ không  được lưu lại, và có thể chạy nhiều lần