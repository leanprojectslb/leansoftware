import { Component, OnInit } from '@angular/core';
import { Process } from '../model/Process';
import { EntityQueue } from '../model/EntityQueue';
import { Task } from "../model/Task";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public backlog = new EntityQueue();
  public finalQueue: EntityQueue;
  public processCounter = 1;
  public processList: Array<Process> = [];

  public processName: string = "";
  public processCapacity: number = 0;

  public simulate() {
    this.processList.forEach(process => console.log(process.name) + " " + console.log(process.inputQueue) + " " + console.log(process.outputQueue) + " " + console.log(process.capacity))
    this.backlog.taskList.forEach(task => console.log(task));

    for (let i = this.processList.length - 1; i > -1; i--) {
      this.processList[i].doWork();
    }
  }


  public addProcess() {
    let process = new Process();
    process.capacity = this.processCapacity;
    process.name = this.processName;

    if (this.processCounter == 1) {
      process.inputQueue = this.backlog;
    } else {
      process.inputQueue = this.finalQueue;
    }
    process.outputQueue = new EntityQueue();
    this.finalQueue = process.outputQueue;
    this.processCounter++;

    this.processList.push(process);
    this.processCapacity = 0;
    this.processName = "";
  }

  // TODO(team) add effort
  public addTask(taskName: string) {
    const task = new Task(taskName, 1);
    this.backlog.taskList.push(task);
  }

  ngOnInit() {
    this.addProcess();
    this.addProcess();
    this.addProcess();

    this.addTask('task1');
    this.addTask('task2');
    this.addTask('task3');
    this.addTask('task4');
    this.addTask('task5');
    this.addTask('task6');
    this.addTask('task7');
    this.addTask('task8');
    this.addTask('task9');
    this.addTask('task10');
    this.addTask('task11');
  }

}
