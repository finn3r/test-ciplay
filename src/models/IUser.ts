export interface IUserLogin{
    email: string,
    password: string
}

export interface IUserChange {
    oldPassword: string,
    newPassword: string
}

export interface IUser extends Omit<IUserLogin, 'password'>{
    id: number,
    isAuth?: boolean,
}