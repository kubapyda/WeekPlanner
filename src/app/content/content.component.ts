import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  firstHour: string;
  lastHour: string;
  time: Array<string> = [];
  weekTasks: Array<any> = JSON.parse(localStorage.getItem('weekTasks'));

  constructor() { }

  ngOnInit() {
    this.prepareTimeFrame();
  }

  prepareTimeFrame() {
    let from: number = 0;
    let to: number = 0;
    let minTime = Date.parse(`01/01/1970 ${this.weekTasks[0].tasks[0].timeFrom}`);
    let maxTime = Date.parse(`01/01/1970 ${this.weekTasks[0].tasks[0].timeTo}`);
    this.firstHour = this.weekTasks[0].tasks[0].timeFrom;
    this.lastHour = this.weekTasks[0].tasks[0].timeTo;
    this.weekTasks.forEach(day => {
      day.tasks.forEach(task => {
        from = Date.parse(`01/01/1970 ${task.timeFrom}`);
        to = Date.parse(`01/01/1970 ${task.timeTo}`);
        if (minTime > from) {
          minTime = from;
          this.firstHour = task.timeFrom;
        }
        if (maxTime < to) {
          maxTime = to;
          this.lastHour = task.timeTo;
        }
      });
    });
    this.createHoursScope();
  }

  createHoursScope() {
    let from = +this.firstHour.split(':')[0] - 1;
    let to = +this.lastHour.split(':')[0] + 1;
    let hour: string = '';
    for (from; from <= to; from++) {
      hour = from < 10 ? `0${from}` : from.toString();
      this.time.push(hour);
    }
  }

  calculateHourHeight() {
    return `${57.35 / this.time.length}vh`;
  }

}
