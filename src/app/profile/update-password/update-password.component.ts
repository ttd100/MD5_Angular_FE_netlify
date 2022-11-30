import { Component, OnInit } from '@angular/core';
import {UpdatePassword} from "../../model/UpdatePassword";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  error: any = {
    message: 'no'
  }
  success: any = {
    message: 'yes'
  }
  form: any = {};
  hide= true;
  updatePassword: UpdatePassword;
  status= 'Form Change password';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

    changePassword() {
    // @ts-ignore
      this.updatePassword = new UpdatePassword(this.form.password,this.form.newpassword);

      this.authService.updatePassword(this.updatePassword).subscribe(data => {
        console.log('dataPassword----->',data);
        if (data.message == this.error.message){
          this.status = 'Password not matching! Please try again!'
        }
        if (data.message == this.success.message){
          this.status = 'ChangePassword Success!'
        }
      })
    }
}
