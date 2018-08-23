import { Injectable } from '@angular/core';

@Injectable()
export class ContentService {

  weekTasks: Array<any>;

  constructor() { }

  getTasks() {
    if (localStorage.getItem('weekTasks')) {
      return this.weekTasks = JSON.parse(localStorage.getItem('weekTasks'));
    }
    return [];
  }

}
