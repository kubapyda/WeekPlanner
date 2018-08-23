import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

import { ContentService } from '../services/content.service';
import { LoginComponent } from '../login/login.component';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  byAction: string = '';
  byDate: string;

  constructor(
    public loginService: LoginService,
    private contentService: ContentService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  searchByAction() {
    this.contentService.weekTasks.forEach(day => {
      day.tasks = day.tasks.filter(task => task.name.toLowerCase().indexOf(this.byAction) !== -1);
    });
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent);
  }

  logout() {
    localStorage.removeItem('token');
  }

}
