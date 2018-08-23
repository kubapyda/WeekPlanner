import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: { login: string, password: string } = {
    login: '',
    password: ''
  };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() { }

  loginToApp() {
    if (this.data.login === 'admin' && this.data.password === 'admin') {
      localStorage.setItem('token', 'true');
      this.activeModal.close();
    }
  }

}
