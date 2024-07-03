import { RoleEnum } from "./role-enum";

export class Users {
    firstName ! :string;
    lastName !:string;
    password !:string;
    email !:string;
    age !:number;
    tel !:number;
    address!:string;
    role !:RoleEnum;
    image !:string
}
