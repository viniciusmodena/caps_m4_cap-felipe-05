export interface IUser {
  user_name: string;
  email: string;
  password: string;
  is_adm: boolean;
}

export interface IUserUpdate {
  user_name?: string;
  email?: string;
  password?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
