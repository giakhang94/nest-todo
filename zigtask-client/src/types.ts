export interface LoginInput {
  email: string;
  password: string;
}
export type Role = "admin" | "user";
export type TaskStatus = "To Do" | "In Progress" | "Done";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface InitState {
  user: User | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  description: string;
  due: Date;
}
