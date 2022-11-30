export class UpdatePassword {
    currentPassword: string;
    newPassword: string;
    error: any = {
        message: 'no'
    }
    success: any = {
        message: 'yes'
    }
    constructor(currentPassword: string, newPassword: string) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}
