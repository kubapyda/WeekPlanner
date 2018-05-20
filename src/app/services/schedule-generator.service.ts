import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleGeneratorService {

  tasks: any = JSON.parse(localStorage.getItem('tasks'));
  actions: any = JSON.parse(localStorage.getItem('actions'));
  allTimeTasks: any = this.tasks.filter(task => task.time === 0);
  notAllTimeTasks: any = this.tasks.filter(task => task.time !== 0);
  freeTimes: any = [
    [], [], [], [], [], [], []
  ];
  weekTasks: Array<{ dayName: string, tasks: any }> = [
    { dayName: 'Pn', tasks: [] },
    { dayName: 'Wt', tasks: [] },
    { dayName: 'Śr', tasks: [] },
    { dayName: 'Czw', tasks: [] },
    { dayName: 'Pt', tasks: [] },
    { dayName: 'Sob', tasks: [] },
    { dayName: 'Nd', tasks: [] },
  ];
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

  constructor() { }

  generate() {
    this.createScheduleForRepetableActions(this.actions, this.weekTasks);
    this.sortTaskInSchedule(this.weekTasks);
    this.createFreeTimeArray(this.weekTasks, this.freeTimes);
    this.addTaskWithTimeToSchedule(this.freeTimes, this.weekTasks);
    this.sortTaskInSchedule(this.weekTasks);
    this.addTaskWithoutTimeToSchedule(this.freeTimes, this.weekTasks);
    this.sortTaskInSchedule(this.weekTasks);
    localStorage.setItem('weekTasks', JSON.stringify(this.weekTasks));
  }

  createScheduleForRepetableActions(_actions, _weekTasks) {
    _actions.forEach(action => {
      action.weekDays.forEach((day, idx) => {
        if (day.timeFrom && day.timeTo) {
          _weekTasks[idx].tasks.push({
            name: action.name,
            category: null, // TODO: !!!
            timeFrom: day.timeFrom,
            timeTo: day.timeTo
          });
        }
      });
    });
  }

  sortTaskInSchedule(_weekTasks) {
    _weekTasks.forEach(dayTasks => {
      dayTasks.tasks.sort((first, second) => {
        let firstTime = Date.parse(`01/01/1970 ${first.timeFrom}`);
        let secondTime = Date.parse(`01/01/1970 ${second.timeFrom}`);
        return firstTime - secondTime;
      });
    });
  }

  createFreeTimeArray(_weekTasks, _freeTime) {
    for (let i = 0; i < 7; i++) {
      if (this.days[i].value) continue;
      if ((i === 5 || i === 6) && !_weekTasks[i].tasks.length) {
        _freeTime[i].push({
          freeTime: 14,
          timeFrom: '9:00',
          timeTo: '23:00'
        });
      } else if (!_weekTasks[i].tasks.length) {
        _freeTime[i].push({
          freeTime: 16,
          timeFrom: '7:00',
          timeTo: '23:00'
        });
      }
      for (let j = 0; j < _weekTasks[i].tasks.length; j++) {
        if (j !== _weekTasks[i].tasks.length - 1) {
          let timeFrom = _weekTasks[i].tasks[j].timeTo.split(':');
          let timeTo = _weekTasks[i].tasks[j + 1].timeFrom.split(':');
          let hoursPart = timeTo[0] - timeFrom[0];
          let minutePart = (timeTo[1] - timeFrom[1]) / 60;
          if (minutePart < 0) {
            minutePart = minutePart + 1;
          }
          let freeTime = hoursPart + minutePart;
          if (freeTime > 0.5) {
            _freeTime[i].push({
              freeTime: freeTime,
              timeFrom: _weekTasks[i].tasks[j].timeTo,
              timeTo: _weekTasks[i].tasks[j + 1].timeFrom
            });
          } else {
            _weekTasks[i].tasks[j + 1].timeFrom = _weekTasks[i].tasks[j].timeTo;
          }
        } else {
          let timeTo = _weekTasks[i].tasks[j].timeTo.split(':');
          let freeTime = (23 - timeTo[0]) - (timeTo[1] / 60);
          _freeTime[i].push({
            freeTime: freeTime,
            timeFrom: _weekTasks[i].tasks[j].timeTo,
            timeTo: '23:00'
          });
        }
      }
    }
  }

  addTaskWithTimeToSchedule(_freeTime, _weekTasks) {
    let availableTasks;
    let taskPeriod;
    let newTimeTo;
    let indexToRemove;
    for (let i = 0; i < _freeTime.length; i++) {
      for (let j = 0; j < _freeTime[i].length; j++) {
        availableTasks = this.notAllTimeTasks.filter(task => task.time <= _freeTime[i][j].freeTime);
        if (availableTasks.length) {
          while (availableTasks[0].time <= _freeTime[i][j].freeTime) {
            taskPeriod = _freeTime[i][j].timeFrom.split(':');
            if (availableTasks[0].time % 1 !== 0) {
              taskPeriod[0] = +taskPeriod[0] + Math.floor(availableTasks[0].time);
              if (+taskPeriod[1] + 30 > 60) {
                taskPeriod[1] = +taskPeriod[1] - 30;
                taskPeriod[0]++;
              } else {
                taskPeriod[1] = +taskPeriod[1] + 30;
              }
              newTimeTo = +taskPeriod[1] < 10 ? `0${taskPeriod[1]}` : taskPeriod[1];
              taskPeriod = `${taskPeriod[0]}:${newTimeTo}`;
            } else {
              taskPeriod = `${+taskPeriod[0] + availableTasks[0].time}:${taskPeriod[1]}`;
            }
            _weekTasks[i].tasks.push({
              name: availableTasks[0].task,
              category: null, // TODO: !!!
              timeFrom: _freeTime[i][j].timeFrom,
              timeTo: taskPeriod
            });
            indexToRemove = this.notAllTimeTasks.findIndex(task => task === availableTasks[0]);
            _freeTime[i][j].freeTime -= availableTasks[0].time;
            _freeTime[i][j].timeFrom = taskPeriod;
            availableTasks.splice(0, 1);
            this.notAllTimeTasks.splice(indexToRemove, 1);
            availableTasks = this.notAllTimeTasks.filter(task => task.time <= _freeTime[i][j].freeTime);
            if (!availableTasks.length) break;
          }
        }
      }
    }
  }

  addTaskWithoutTimeToSchedule(_freeTime, _weekTasks) {
    let remainingFreeTime = this.calculateRemainingFreeTime(_freeTime);
    let timeForOneTask = remainingFreeTime / this.allTimeTasks.length;
    let freeTimesInDayLength;
    remainingFreeTime -= timeForOneTask;
    for (let i = 0; i < _freeTime.length; i++) {
      freeTimesInDayLength = _freeTime[i].length;
      for (let j = 0; j < freeTimesInDayLength; j++) {
        timeForOneTask -= _freeTime[i][0].freeTime;
        if (i === 6 && _freeTime[i].length && !_weekTasks[i].tasks.length) {
          _weekTasks[i].tasks.push({
            name: this.allTimeTasks[0].task,
            category: null, // TODO:
            timeFrom: _freeTime[i][0].timeFrom,
            timeTo: _freeTime[i][0].timeTo
          });
        }
        if (timeForOneTask > 0) {
          _weekTasks[i].tasks.push({
            name: this.allTimeTasks[0].task,
            category: null, // TODO:
            timeFrom: _freeTime[i][0].timeFrom,
            timeTo: _freeTime[i][0].timeTo
          });
          _freeTime[i].splice(0, 1);
        } else {
          this.allTimeTasks.splice(0, 1);
          let task;
          if (this.allTimeTasks.length) {
            _weekTasks[i].tasks.push({
              name: this.allTimeTasks[0].task,
              category: null, // TODO:
              timeFrom: _freeTime[i][0].timeFrom,
              timeTo: _freeTime[i][0].timeTo
            });
            if (_freeTime[i].length > 1) {
              // TODO:
            } else {
              task = {
                name: this.allTimeTasks[0].task,
                category: null, // TODO:
                timeFrom: _freeTime[i + 1][0].timeFrom,
                timeTo: null
              };
              this.setTimeOfTaskEnd(_freeTime[i + 1][0], timeForOneTask);
              task.timeTo = _freeTime[i + 1][0].timeFrom;
              timeForOneTask = remainingFreeTime / this.allTimeTasks.length;
              remainingFreeTime -= timeForOneTask;
              _weekTasks[i + 1].tasks.push(task);
              this.allTimeTasks.splice(0, 1);
            }
          }
        }
      }
    }
  }

  calculateRemainingFreeTime(_freeTime): number {
    let remainingFreeTime = 0;
    _freeTime.forEach(dayFreeTime => {
      dayFreeTime.forEach(free => {
        remainingFreeTime += free.freeTime;
      });
    });
    return remainingFreeTime;
  }

  setTimeOfTaskEnd(_task, _time) {
    let timeString;
    _time += _task.freeTime;
    _time = Math.round(_time * 10) / 10;
    timeString = this.createTimeString(_time, _task.timeFrom);
    _task.freeTime -= _time;
    _task.timeFrom = timeString;

  }

  createTimeString(_time, _timeString): string {
    let digitsPart;
    let intPart;
    let timeStr;
    digitsPart = _time.toString().split('.');
    intPart = +digitsPart[1];
    digitsPart = +`0.${digitsPart[1]}`;
    timeStr = _timeString.split(':');
    timeStr[0] = +timeStr[0] + intPart;
    timeStr[1] = +timeStr[1] + digitsPart * 60;
    timeStr[1] = timeStr[1] > 60 ? timeStr[1] - 60 : timeStr[1];
    timeStr = timeStr.join(':');
    return timeStr;
  }

}
