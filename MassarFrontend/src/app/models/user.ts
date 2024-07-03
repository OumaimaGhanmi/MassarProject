import { RoleEnum } from "./role-enum";

export class User {
    id !: number;
    email !:string;
    role !: RoleEnum;
}
