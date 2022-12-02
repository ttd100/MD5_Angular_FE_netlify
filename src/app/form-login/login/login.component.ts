import { Component, OnInit } from '@angular/core';
import {SignInForm} from "../../model/SignInForm";
import {AuthService} from "../../service/auth.service";
import {TokenService} from "../../service/token.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import auth = firebase.auth;
import {log} from "util";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  hide = true;
  signInForm: SignInForm;
  status = 'Please fill in form to login!'
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private auth: AngularFireAuth,
              private http:HttpClient
              ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('SUCCESS_KEY')!=null){
      this.status = localStorage.getItem('SUCCESS_KEY')
    }else {
      this.status = 'Please fill in the form to login!'
    }


  }

    login() {
    this.signInForm = new SignInForm(
        this.form.username,
        this.form.password
    );
    this.authService.signin(this.signInForm).subscribe(data=>{
      console.log('data------->',data);
      if (data.token != undefined){
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setAvatar(data.avatar);
        this.tokenService.setRole(data.roles);
        localStorage.removeItem('SUCCESS_KEY')
        this.router.navigate(['profile']).then(()=>{
          location.reload();
        }) //dieu huong tu  ts ----> component
      }
      // @ts-ignore
      if (data.status == 202){
        this.status = 'Login Failed!  Please check your username or password!'
      }
    })
    }



    loginByGoogle() {

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    let app=this;

      this.auth.signInWithPopup(googleProvider)

          .then((t) => {

            this.auth.onAuthStateChanged(function (user) {


              if (user) {

                user.getIdToken().then(function (idToken) {

                  const googleForm = {"idToken":idToken}// <------ Check this line
                  app.http.post("http://localhost:5000/login/google",googleForm).subscribe((data:any)=>{
                    if (data.token != undefined){
                      app.tokenService.setToken(data.token);
                      app.tokenService.setName(data.name);
                      app.tokenService.setAvatar(data.avatar);

                      localStorage.removeItem('SUCCESS_KEY')
                      app.router.navigate(['profile']).then(()=>{
                        location.reload();
                      }) //dieu huong tu  ts ----> component
                    }
                  })
                })
              }
            });
          })

    }


}
