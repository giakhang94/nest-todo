## Task 1 git init

`git init -b develop`

- Nếu clone về từ repo có sẵn thì làm khác

### BE init

- `nest new . ` -> chọn npm
- `npm install @nestjs/typeorm typeorm pg`
  - pg: driver cho PostgreSQL
- `npm install class-validator class-transformer`
- `npm install @nestjs/jwt`
- `npm install bcrypt`
- `npm install -D @types/bcrypt`
- `npm install @nestjs/swagger swagger-ui-express`
- `npm install @nestjs/config`
- `npm install

### FE

`npm create vite@latest . -- --template react-ts`

## Task 2. Config module and env (BE)

```ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- Sau đó qua script làm lại script để chạy các biến môi trường cho đúng
- thêm các biến môi trường vào
- thêm file env cho development và test
  - đối với postgres và mySQL thì nó k tự tạo bảng khi test, nên phải tạo sẵn bảng, gắn cho nó 1 cái user
  - sau đó lấy thông tin username, host, port, pasword, dbname bỏ vô env của test
  - tương tự cũng phải tạo sẵn 1 cái cho development rồi cũng bỏ vô env của development
- các bươc tạo db, user trong postgres. Dùng postgres cli
  - `psql -U postgres -p 5433` <= vào psql, giống như vào mysql
  - `create user test_user with password 'testpassword';`
  - `create database  nestjs_test owner test_user;`
  - `grant all privileges on database nestjs_test to test_user;` <= cấp toàn bộ quyền cho user trên db test
