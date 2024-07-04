import { RoleEnum } from "./role-enum";

export class Users {
    firstname ! :string;
    lastname !:string;
    password !:string;
    email !:string;
    age !:number;
    tel !:number;
    address!:string;
    role ?:RoleEnum;
    image !:string
}
