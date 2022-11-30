import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../service/token.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private tokenService: TokenService,
              private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.getToken()){
      console.log('roles---->',this.tokenService.getRole());
      console.log('check----->',JSON.stringify(this.tokenService.getToken()) == JSON.stringify(['ADMIN']))
      if (JSON.stringify(this.tokenService.getRole())== JSON.stringify(['ADMIN'])){
        return true;
        console.log('check2----->',JSON.stringify(this.tokenService.getToken()) == JSON.stringify(['ADMIN']))
      }else {
        alert('khong co quyen cua admin')
        this.router.navigate([''])
      }
    }else {
      this.router.navigate(['login'])
    }
  }
  
}
