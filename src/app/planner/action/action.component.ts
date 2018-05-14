import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  tasks: Array<{ time: number, task: string }> = [];
  days: Array<{ name: string, viewName: string, value: boolean }> = [
    {
      name: 'monday',
      viewName: 'Pn',
      value: false
    }, {
      name: 'tuesday',
      viewName: 'Wt',
      value: false
    }, {
      name: 'wednesday',
      viewName: 'Śr',
      value: false
    }, {
      name: 'thursday',
      viewName: 'Czw',
      value: false
    }, {
      name: 'friday',
      viewName: 'Pt',
      value: false
    }, {
      name: 'saturday',
      viewName: 'Sb',
      value: false
    }, {
      name: 'sunday',
      viewName: 'Nd',
      value: false
    },
  ];

  taskForm: { task: string, hasTime: boolean, time: number } = {
    task: '',
    hasTime: false,
    time: null
  };

  constructor() { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('tasks'))) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }

  addTask() {
    let { hasTime, ...task } = this.taskForm;
    task.time = +task.time;
    this.tasks.push(task);
    this.taskForm = {
      task: '',
      hasTime: false,
      time: null
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeTask(task: { time: number, task: string }) {
    const idx = this.tasks.indexOf(task);
    this.tasks.splice(idx, 1);
  }

  generateSchedule() {
    console.log('generate');
  }

}
