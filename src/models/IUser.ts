export interface IUserLogin{
    email: string,
    password: number
}

export interface IUser extends IUserLogin{
    id: number,
    isAuth?: boolean,
}