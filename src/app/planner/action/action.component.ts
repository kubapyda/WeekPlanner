import { Component, OnInit } from '@angular/core';

import { ActionsService } from './../../services/actions.service';
import { ScheduleGeneratorService } from './../../services/schedule-generator.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  providers: [ScheduleGeneratorService]
})
export class ActionComponent implements OnInit {

  tasks: Array<{ time: number, category: string, task: string }> = [];
  taskForm: { task: string, category: string, hasTime: boolean, time: number } = {
    task: '',
    category: null,
    hasTime: false,
    time: null
  };

  constructor(
    public scheduleGenerator: ScheduleGeneratorService,
    public actionsService: ActionsService
  ) { }

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
      category: null,
      hasTime: false,
      time: null
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeTask(task: { time: number, category: string, task: string }) {
    const idx = this.tasks.indexOf(task);
    this.tasks.splice(idx, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}
