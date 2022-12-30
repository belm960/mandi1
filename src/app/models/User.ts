import { Role } from "../shared/security/role";


export class User {
    
    id: string;
    fname: string;
    lname: string;
    gname: string;
    dob: string;
    city: string;
    phonenum: string;
    username: string;
    email: string;
    password: string;
    active: boolean;
    role: string;
    constructor(){
        this.active = true;
        this.role = Role.User;
    }
}
