import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {SignUpForm} from "../model/SignUpForm";
import {Observable} from "rxjs";
import {SignInForm} from "../model/SignInForm";
import {JwtResponse} from "../model/JwtResponse";
import {ChangeAvatar} from "../model/ChangeAvatar";
import {CategoryComponent} from "../form-login/category/category/category.component";
import {UpdatePassword} from "../model/UpdatePassword";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //API_LOCAL
// private   API_SIGNUP = environment.API_LOCAL + 'signup';
//   private   API_SIGNIN = environment.API_LOCAL + 'signin';
//API_SERVE
  private   API_SIGNUP = environment.API_LOCAL + 'signup';
  private   API_SIGNIN = environment.API_LOCAL + 'signin';
  private  API_UPDATE_AVATAR = environment.API_LOCAL + 'change/avatar';
  private API_UPDATE_PASSWORD = environment.API_LOCAL + 'change/password';

  // private API_CATEGORY = environment.API_SERVE + 'categories'
  constructor(private http: HttpClient) { }
  signup(signUpForm: SignUpForm): Observable<any>{
    return this.http.post(this.API_SIGNUP,signUpForm);
  }
  signin(signInForm: SignInForm): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.API_SIGNIN, signInForm);
  }
  updateAvatar(changeAvatar: ChangeAvatar): Observable<any>{
    return this.http.put(this.API_UPDATE_AVATAR,changeAvatar);
  }
  updatePassword(updatePassword: UpdatePassword): Observable<any>{
    return this.http.put(this.API_UPDATE_PASSWORD,updatePassword)
  }

  // showListCategory(category: CategoryComponent):Observable<any>{
  //   return this.http.get(this.API_CATEGORY,category)
  // }
}
