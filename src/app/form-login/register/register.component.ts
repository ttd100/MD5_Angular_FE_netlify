import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {SignUpForm} from "../../model/SignUpForm";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  emailFormControl= new FormControl('',[
      Validators.required,
      Validators.email]);
    hide=true;
    signUpForm: SignUpForm;
  status = 'please fill in the form  to create account';
  constructor(private authService: AuthService,
              private router: Router) { }
  ngOnInit(): void {
  }

  register() {
    this.signUpForm = new SignUpForm(
        this.form.name,
        this.form.username,
        this.form.email,
        this.form.password
    );
    this.authService.signup(this.signUpForm).subscribe(data => {
      console.log('data---->',data);
      if (data.message === 'nouser'){
        this.status = 'Username is existed! please try again!';
        return;
      }
      if (data.message === 'noemail'){
        this.status = 'Email is existed! please try again!';
        return;
      }
      if (data.message === 'yes'){
        this.status = 'Create account success!';
        localStorage.setItem('SUCCESS_KEY',this.status);
        this.router.navigate(['login'])
      }
    },error => {
      console.log('error---->', error);
      this.status = 'Mail invalid! Please try again! '
    });
  }
}