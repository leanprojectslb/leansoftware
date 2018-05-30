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
  public processCounter = 0;
  public processList: Array<Process> = [];

  public processName: string = "";
  public processCapacity: number = 0;

  public taskName: string = "";
  public taskEffort: number = 0;

  public simulate() {
    this.processList.forEach(process => console.log(process.name) + " " + console.log(process.inputQueue) + " " + console.log(process.outputQueue) + " " + console.log(process.capacity))
    this.backlog.taskList.forEach(task => console.log(task));

    for (let i = this.processList.length - 1; i > -1; i--) {
      this.processList[i].doWork();
    }
  }


  public addProcess() {
    const process = new Process(this.processCapacity, this.processName);

    if (this.processCounter == 0) {
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
  public addTask() {
    const task = new Task(this.taskName, this.taskEffort);
    this.backlog.taskList.push(task);
    this.taskEffort = 0;
    this.taskName = "";
  }

  ngOnInit() {

  }

}
