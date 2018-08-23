import { Component, OnInit } from '@angular/core';

import { ActionsService } from './../services/actions.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  providers: [ActionsService]
})
export class PlannerComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

}
