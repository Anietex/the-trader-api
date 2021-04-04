export enum Role{
    User ='user',
    Admin = 'Admin'
}

export interface User{
    first_name: string,
    last_name: string,
    email: string,
    phone_no?:string
    password:string,
    role?: Role,
    phone_no_verified?: boolean,
    email_verified?: boolean,
    auth_tokens?: boolean
}
