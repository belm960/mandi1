export class SignUpInfo {
    fname: string;
    lname: string;
    gname: string;
    username: string;
    email: string;
    role: string[];
    password: string;
    phonenum: string;
 
    constructor(fname: string,lname: string, gname: string,phonenum: string, username: string, email: string, password: string) {
        this.fname = fname;
        this.lname= lname;
        this.gname= lname;
        this.phonenum=phonenum;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = ['user'];
    }
}