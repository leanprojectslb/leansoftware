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
  public processCapacity: number;
  public workInProgressLimit: number;

  public taskName: string = "";
  public taskEffort: number;

  public simulate() {
    this.processList.forEach(process => console.log(process.name) + " " + console.log(process.inputQueue) + " " + console.log(process.outputQueue) + " " + console.log(process.capacity))
    this.backlog.taskList.forEach(task => console.log(task));

    for (let i = this.processList.length - 1; i > -1; i--) {
      this.processList[i].doWork();
    }
  }


  public addProcess() {
    const process = new Process(this.processCapacity, this.processName, this.workInProgressLimit);

    if (this.processCounter == 0) {
      process.inputQueue = this.backlog;
    } else {
      process.inputQueue = this.finalQueue;
    }
    process.outputQueue = new EntityQueue();
    this.finalQueue = process.outputQueue;
    this.processCounter++;

    this.processList.push(process);
   // this.processCapacity = 1;
    this.processName = "";
    //this.workInProgressLimit = 4;
  }

  // TODO(team) add effort
  public addTask() {
    const task = new Task(this.taskName, this.taskEffort);
    this.backlog.taskList.push(task);
    // this.taskEffort = 1;
    this.taskName = "";
  }

  ngOnInit() {
    this.addProcess();
    this.addProcess();
    this.addProcess();
    this.processList[0].name = 'Process 1';
    this.processList[0].capacity = 4;
    this.processList[1].name = 'Process 2';
    this.processList[1].capacity = 2;
    this.processList[2].name = 'Process 3';
    this.processList[2].capacity = 3;

    this.taskEffort = 1;
    this.taskName = 'task1';
    this.addTask();

    this.taskEffort = 1;
    this.taskName = 'task2';
    this.addTask();

    this.taskEffort = 8;
    this.taskName = 'task3';
    this.addTask();

    this.taskEffort = 4;
    this.taskName = 'task4';
    this.addTask();

    this.taskEffort = 4;
    this.taskName = 'task5';
    this.addTask();

    this.taskEffort = 2;
    this.taskName = 'task6';
    this.addTask();

    this.taskEffort = null;
  }

}
