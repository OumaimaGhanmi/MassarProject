
import { Randonneur } from "./randonneur";
import { User } from "./user";
import { Users } from "./users";

export class Admin extends Users {
    idAdmin !:number;
    list_Randonneur!:Set<Randonneur>;
}
