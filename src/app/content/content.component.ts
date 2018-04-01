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
  weekTasks: Array<any> = [
    {
      date: '26-03-2018',
      dayName: 'Pn',
      tasks: [
        {
          name: 'Praca',
          category: 'work',
          timeFrom: '7:00',
          timeTo: '14:00'
        }, {
          name: 'Uczelnia',
          category: 'school',
          timeFrom: '14:00',
          timeTo: '17:50'
        }, {
          name: 'Droga do domu',
          timeFrom: '17:50',
          timeTo: '18:50'
        }, {
          name: 'Czas wolny',
          category: 'free-time',
          timeFrom: '18:50',
          timeTo: '22:00'
        }
      ]
    }, {
      date: '27-03-2018',
      dayName: 'Wt',
      tasks: [
        {
          name: 'Praca',
          category: 'work',
          timeFrom: '7:15',
          timeTo: '15:15'
        }, {
          name: 'Droga do domu',
          timeFrom: '15:15',
          timeTo: '16:30'
        }, {
          name: 'Czas wolny',
          category: 'free-time',
          timeFrom: '16:30',
          timeTo: '18:30'
        }, {
          name: 'Trening',
          category: 'sport',
          timeFrom: '18:30',
          timeTo: '21:10'
        }
      ]
    }, {
      date: '28-03-2018',
      dayName: 'Śr',
      tasks: [
        {
          name: 'Uczelnia',
          category: 'school',
          timeFrom: '8:30',
          timeTo: '10:15'
        }, {
          name: 'Praca',
          category: 'work',
          timeFrom: '10:15',
          timeTo: '15:30'
        }, {
          name: 'Droga do domu',
          timeFrom: '15:30',
          timeTo: '16:40'
        }, {
          name: 'Czas wolny',
          category: 'free-time',
          timeFrom: '16:40',
          timeTo: '22:00'
        }
      ]
    }, {
      date: '29-03-2018',
      dayName: 'Czw',
      tasks: [
        {
          name: 'Praca',
          category: 'work',
          timeFrom: '6:00',
          timeTo: '14:00'
        }, {
          name: 'Uczelnia',
          category: 'school',
          timeFrom: '14:00',
          timeTo: '19:15'
        }, {
          name: 'Droga do domu',
          timeFrom: '19:15',
          timeTo: '20:30'
        }, {
          name: 'Czas wolny',
          category: 'free-time',
          timeFrom: '20:30',
          timeTo: '22:00'
        }
      ]
    }, {
      date: '30-03-2018',
      dayName: 'Pt',
      tasks: [
        {
          name: 'Praca',
          category: 'work',
          timeFrom: '6:00',
          timeTo: '12:00'
        }, {
          name: 'Uczelnia',
          category: 'school',
          timeFrom: '12:00',
          timeTo: '16:45'
        }, {
          name: 'Droga do domu',
          timeFrom: '16:45',
          timeTo: '18:00'
        }, {
          name: 'Czas wolny',
          category: 'free-time',
          timeFrom: '18:00',
          timeTo: '22:00'
        }
      ]
    }, {
      date: '31-03-2018',
      dayName: 'Sob',
      tasks: [
        {
          name: 'Czas wolny',
          category: 'free-time',
          timeFrom: '9:00',
          timeTo: '22:00'
        }
      ]
    }, {
      date: '01-04-2018',
      dayName: 'Nd',
      tasks: [
        {
          name: 'Czas wolny',
          category: 'free-time',
          timeFrom: '9:00',
          timeTo: '22:00'
        }
      ]
    }
  ];

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
