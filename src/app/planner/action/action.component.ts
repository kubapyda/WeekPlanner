import { Component, OnInit } from '@angular/core';

import { ScheduleGeneratorService } from './../../services/schedule-generator.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  providers: [ScheduleGeneratorService]
})
export class ActionComponent implements OnInit {

  tasks: Array<{ time: number, task: string }> = [];
  taskForm: { task: string, hasTime: boolean, time: number } = {
    task: '',
    hasTime: false,
    time: null
  };

  constructor(public scheduleGenerator: ScheduleGeneratorService) { }

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

}
