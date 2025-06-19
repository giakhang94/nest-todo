export enum Role {
  Admin = 'admin',
  User = 'user',
}
export type PayloadToken = {
  userId: number;
  role: Role;
};
