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
            if (data.message === 'OK'){
                status = 'Change password success!'
            }else {
                status = 'Change password failed! Please try again!'
            }
        })
    }
}
