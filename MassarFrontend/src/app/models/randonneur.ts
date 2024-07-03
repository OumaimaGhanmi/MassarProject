import { Admin } from "./admin";

import { Users } from "./users";

export class Randonneur extends Users{
    idRandonneur!: number;
    admin! :Admin;
}
