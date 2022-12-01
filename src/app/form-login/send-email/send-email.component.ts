import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {SendEmail} from "../../model/SendEmail";

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
    form: any = {};
    status = 'PLease enter your email!!'
    error: any = {
        message: 'Email not existed'
    };
    // @ts-ignore
    sendEmail: SendEmail;
  emailFormControl = new FormControl('',[
    Validators.required,
    Validators.email]);

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


    handleSendEmail() {
        this.sendEmail = new SendEmail(
            this.form.email
        );
        this.authService.sendEmail(this.sendEmail).subscribe(data => {
            console.log('data sendEmail---->',data);

            if (data.message === 'no'){
                this.status = 'Email not found! Please try again!'
            }else {
                this.status = 'Check Email, Click Link to Change Password!'
            }
        })
    }
}
