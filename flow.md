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

## task 3 connect db

- tạo postgresConfig fuction return object chứa các config. Tạo function để sử dụng thằng configService
  - sử dụng `config.get<string>('DB_HOST')`

```ts
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const postgresConfig = (config: ConfigService): TypeOrmModuleOptions => {
  return {
    type: "postgres",
    host: config.get<string>("DB_HOST"),
    port: Number(config.get<string>("DB_PORT")) || 5433,
    username: config.get<string>("DB_USERNAME") || "postgres",
    password: config.get<string>("DB_PASSWORD"),
    database: config.get<string>("DB_NAME"),
    entities: [],
    synchronize: config.get<string>("NODE_ENV") === "production" ? true : false,
  };
};
```

- thêm TypeOrmModule vào import của appModule

```ts
 TypeOrmModule.forRootAsync({
      imports: [ConfigModule], //import y như cách hoạt động của module,
      useFactory: postgresConfig, //gọi method (có return object mới được quá)
      inject: [ConfigService], //inject vào để xài,
      // nguyên đống này giống như 1 module con
    }),
```

## Task 4 - user module

- tạo module, controller, service
- tạo user/user.entity.ts
- nhớ phải có `@Entity()` và cột id phải là `@PrimaryGeneratedColumn()`
- email thì phải là `@Column({unique: true})`
  import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
  type Role = 'admin' | 'user';

```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;
}
```

### Vao user service

- inject userRepository to the userService

```ts
constructor(InjectRepository(User) private User: Repository<User>) {}
```

- go to user.module.ts (userModule class)
  - `imports: [TypeOrmModule.forFeature([User])]`
  - //User: user entity

### task 4 - create user

- create-user.dto.ts
- validation pipe
- create-user flow (controller and service)
- không hiện password
- trong entity: thêm @exclude() vào chỗ cần che đậy
- trong controller `return instanceToPlain(user)` hoặc `return instanceToPlain(this.usersService.create(body))`
