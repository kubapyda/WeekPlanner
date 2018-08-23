import { Injectable } from '@angular/core';

@Injectable()
export class ActionsService {

  category: Array<{ id: string, name: string }> = [];

  constructor() {
    console.log(localStorage.getItem('categories'));
    if (localStorage.getItem('categories')) {
      this.category = JSON.parse(localStorage.getItem('categories'));
    }
  }

  getCategory() {
    this.category = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [];
    console.log(this.category);
    return this.category;
  }

}
