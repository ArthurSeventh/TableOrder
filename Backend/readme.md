## Trình tự cài đặt và thiết lập máy chủ Backend

### Bước 1: Cài đặt và thiết lập cơ sở dữ liệu PosgreSQL
Truy cập đường dẫn sau: https://www.postgresql.org/download/ để tải và cài PostgreSQL.

Sau khi cài đặt xong, truy cập vào cơ sở dữ liệu để tạo ra 1 user với vai trò là superuser (Để tránh các lỗi về quyền truy cập cơ sở dữ liệu).

> psql
>
> CREATE USER <tên-người-dùng> WITH PASSWORD '<mật-khẩu>';
>
> ALTER USER <tên-người-dùng> WITH SUPERUSER;
>
> exit

Chỉnh sửa lại các thông tin về tài khoản và địa chỉ sử dụng cơ sở dữ liệu ở dòng POSTGRES_SERVER trong file .env.

> Ví dụ: postgresql://<tên-người-dùng>:<mật-khẩu>@<địa-chỉ-ip>:<cổng>/<tên-cơ-sở-dữ-liệu>

### Bước 2: Cài đặt và sử dụng một môi trường ảo (Những thay đổi về việc cài hoặc xoá tiện ích cho Python chỉ sẽ xảy ra trong môi trường ảo này)
Bật Terminal và nhập lệnh như sau để thực hiện cài đặt môi trường ảo:

> pip3 install virtualenv

Sau khi Terminal đã hoàn thành việc tải và cài đặt môi trường ảo, sử dụng lệnh sau để tạo một môi trường ảo.

> virtualenv <tên-môi-trường>

Để kích hoạt môi trường ảo, sử dụng lệnh như sau:

> source <tên-môi-trường>/bin/active

Để kiểm tra đã kích hoạt môi trường ảo thành công hay thất bại, sử dụng lệnh sau:

> which python

Nếu đường dẫn đến python là <tên-môi-trường>/bin/python thì đã thành không, nếu không, hãy thực hiện lại những bước trên.

Để thoát khỏi môi trường ảo, sử dụng lệnh sau:

> deativate

### Bước 3: Cài đặt các tiện ích cần thiết để có thể chạy máy chủ Backend

Sử dụng lệnh như sau để cài các gói tiện ích:

> pip3 install -r ./requirements.txt

### Bước 4: Khởi tạo các bảng và dữ liệu cơ bản cho cơ sở dữ liệu

Hệ thống sử dụng Flask Migration để tự động tạo ra các bảng trong cơ sở dựa trên các model bằng những câu lệnh sau đây:

> flask db stamp head
>
> flask db migrate -m "message"
>
> flask db upgrade

Nếu như gặp phải lỗi "multiple heads" thì hãy nhập như sau và sau đó lập lại các lệnh như trên:

> flask db merge heads

Sau khi đã khởi tạo thành công các bảng cho cơ sở dữ liệu, sử dụng lệnh sau để tạo dữ liệu cơ bản:

> flask init

Câu lệnh này sẽ thêm vào 2 vai trò Admin và User cho hệ thống. Đồng thời tạo ra 1 systemadmin để người dùng có thể bắt đầu sử dụng.

### Bước 5: Khởi động máy chủ
Sử dụng lệnh như sau để chạy máy chủ:

> flask run -h 0.0.0.0 -p 5000

Các ký hiệu trong câu lệnh trên có ý nghĩa như sau:

> -h <địa-chỉ-ip> Là chỉ định địa chỉ ip của máy chủ backend
>
> -p <cổng> Là chỉ định cổng của máy chủ backend