import { Component, Input, OnInit } from '@angular/core';

import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  providers: [NgbTooltipConfig]
})
export class DayComponent implements OnInit {

  @Input() timeLength: number;
  @Input() taskLength: number;
  @Input() firstHour: string;
  @Input('day') dayTasks: {
    date: string,
    dayName: string,
    tasks: Array<{
      name: string,
      timeFrom: string,
      timeTo: string,
      category: string
    }>
  };

  constructor() { }

  ngOnInit() {
  }

  calculateTaskHeight(task: { name: string, timeFrom: string, timeTo: string }) {
    return `${this.caluclateResult(task.timeTo, task.timeFrom) - 1}vh`;
  }

  calculateFirstTaskPosition() {
    if (this.dayTasks.tasks.length) {
      const firstTask = this.dayTasks.tasks[0].timeFrom;
      let firstHour = (+this.firstHour.split(':')[0]) - 1;
      return `${this.caluclateResult(firstTask, `${firstHour}:${this.firstHour.split(':')[1]}`)}vh`;
    }
  }

  caluclateResult(timeTo, timeFrom) {
    const hour = (+timeTo.split(':')[0]) - (+timeFrom.split(':')[0]);
    const minute = (+timeTo.split(':')[1]) - (+timeFrom.split(':')[1]);
    let result = hour + (minute / 60);
    return result * 74.3 / this.timeLength;
  }

}
