import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {AuthService} from "../../service/auth.service";
import {ResetPassword} from "../../model/ResetPassword";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    form: any={};
  hide = true;
  token:any;
  status = 'Enter your new Password'

  constructor(private route:ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams.token
  }

  changepassword(){

    const bodyPassword = new ResetPassword(this.form.password,this.token)
    // const headers = new HttpHeaders();

    // headers.append('Authorization', );

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`});
    let options = { headers: headers };

    this.authService.resetPassword(bodyPassword,options).subscribe((data)=>{
      console.log(data)
      if (data.message === 'yes'){
        this.status = 'Change Password Success!'
      }
      if (data.message === 'no'){
        this.status = 'Change Password Failed! Please try again!'
      }
    })

  }


}
