import { Component, OnInit } from '@angular/core';

import { ActionsService } from '../../services/actions.service';

@Component({
  selector: 'app-repeatable',
  templateUrl: './repeatable.component.html',
  styleUrls: ['./repeatable.component.scss']
})
export class RepeatableComponent implements OnInit {

  idx: number = null;
  weekDaysName: Array<string> = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
  actions: Array<{ name: string, category: string, weekDays: Array<{ name: string, timeFrom: string, timeTo: string }> }> = [];
  action: { name: string, category: string, weekDays: Array<{ name: string, timeFrom: string, timeTo: string }> } = {
    name: '',
    category: '',
    weekDays: []
  };

  constructor(public actionsService: ActionsService) {
    this.createWeekDaysObject();
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('actions'))) {
      this.actions = JSON.parse(localStorage.getItem('actions'));
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  createWeekDaysObject() {
    this.action.weekDays = this.weekDaysName.map(day => {
      return {
        name: day,
        timeFrom: '',
        timeTo: ''
      }
    });
  }

  addRepeatableAction() {
    if (this.idx !== null) {
      this.actions[this.idx] = this.action;
    } else {
      this.actions.push(this.action);
    }
    localStorage.setItem('actions', JSON.stringify(this.actions));
    this.idx = null;
    this.createWeekDaysObject();
    this.action.name = '';
    this.action.category = null;
    this.actions = JSON.parse(localStorage.getItem('actions'));
  }

  removeAction(idx: number) {
    this.actions.splice(idx, 1);
    localStorage.setItem('actions', JSON.stringify(this.actions));
  }

  editAction(idx: number) {
    this.idx = idx;
    this.action = this.actions[idx];
  }

}
