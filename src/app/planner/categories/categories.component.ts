import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Array<{ name: string, identifier: string }> = [];
  category: { name: string, identifier: string } = {
    name: '',
    identifier: ''
  };

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('categories')) {
      this.categories = JSON.parse(localStorage.getItem('categories'));
    }
  }

  addCategory() {
    this.categories.push({
      name: this.category.name,
      identifier: this.category.identifier
    });
    localStorage.setItem('categories', JSON.stringify(this.categories));
    this.category.name = '';
    this.category.identifier = '';
  }

  removeCategory(category: { name: string, identifier: string }) {
    const idx = this.categories.indexOf(category);
    this.categories.splice(idx, 1);
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

}
