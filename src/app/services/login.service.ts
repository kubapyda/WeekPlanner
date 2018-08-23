import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService implements CanActivate {

  constructor() { }

  canActivate() {
    return localStorage.getItem('token') ? !!localStorage.getItem('token') : false;
  }

}
