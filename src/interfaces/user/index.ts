export interface IUserRequest {
  user_name: string;
  email: string;
  password: string;
  is_adm: boolean;
}

export interface IUser {
  id: string;
  user_name: string;
  email: string;
  user_since: Date;
  is_adm: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}
