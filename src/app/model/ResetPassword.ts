export class ResetPassword {
    newpassword: string;
    token: string;

    constructor(newpassword: string, token: string) {
        this.newpassword = newpassword;
        this.token = token;
    }
}
