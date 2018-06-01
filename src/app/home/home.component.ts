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
  public completedQueue = new EntityQueue();

  public finalQueue: EntityQueue;

  public processCounter = 0;
  public processList: Array<Process> = [];
  public iterationCounter: number = 0;
  public processName: string = "";
  public processCapacity: number;
  public workInProgressLimit: number;

  public taskName: string = "";
  public taskEffort: number = 1;
  public totalCycleTime = 0;
  public avgThroughput = 0;
  public totalTaskNumber = 0;

  public simulate() {
    this.iterationCounter++;
    this.processList.forEach(process => console.log(process.name) + " " + console.log(process.inputQueue) + " " + console.log(process.outputQueue) + " " + console.log(process.capacity))
    this.backlog.taskList.forEach(task => console.log(task));

    for (let i = this.processList.length - 1; i > -1; i--) {
      this.processList[i].doWork();
    }

    this.completedQueue.taskList = this.completedQueue.taskList.concat(this.finalQueue.taskList);
    this.finalQueue.taskList = [];
    this.completedQueue.taskList.forEach(task => this.calculateCycleTime(task));
  }

  public calculateAverageThroughput() {

    this.totalCycleTime = 0;
    if (this.completedQueue.taskList.length != 0) {
      this.completedQueue.taskList.forEach(task => this.totalCycleTime += task.cycleTime);
      this.avgThroughput = this.totalCycleTime / this.completedQueue.taskList.length;
      alert("Average Throughput is " + this.avgThroughput);
    } else {
      alert("No task is completed yet");
    }
  }

  public calculateCycleTime(task: Task) {
    if (task.cycleTime === 0)
      task.cycleTime = this.iterationCounter - task.startTime
  }

  public addProcess() {
    const process = new Process(this.processCapacity, this.processName, this.workInProgressLimit);

    if (this.processCounter == 0) {
      process.sourceQueue = this.backlog;
    } else {
      process.sourceQueue = this.finalQueue;
    }
    process.inputQueue = new EntityQueue();
    process.outputQueue = new EntityQueue();
    this.finalQueue = process.outputQueue;
    this.processCounter++;

    this.processList.push(process);
    this.processName = "";
    this.processCapacity = null
    this.workInProgressLimit = null;
  }

  public addTask() {
    const task = new Task(this.taskName, this.taskEffort, this.iterationCounter);
    this.backlog.taskList.push(task);
    // this.taskEffort = 1;
    this.taskName = "";
    this.totalTaskNumber = this.backlog.taskList.length;
    this.taskEffort = null;
  }

  ngOnInit() {
    this.processName = 'Analysis';
    this.processCapacity = 4;
    this.workInProgressLimit = 2;
    this.addProcess();
    this.processName = 'Development';
    this.processCapacity = 4;
    this.workInProgressLimit = 3;
    this.addProcess();
    this.processName = 'Testing';
    this.processCapacity = 2;
    this.workInProgressLimit = 2;
    this.addProcess();

    this.taskEffort = 8;
    this.taskName = 'task1';
    this.addTask();

    this.taskEffort = 1;
    this.taskName = 'task2';
    this.addTask();

    this.taskEffort = 1;
    this.taskName = 'task3';
    this.addTask();

    this.taskEffort = 1;
    this.taskName = 'task4';
    this.addTask();

    this.taskEffort = 3;
    this.taskName = 'task5';
    this.addTask();

    this.taskEffort = 2;
    this.taskName = 'task6';
    this.addTask();

    this.taskEffort = 8;
    this.taskName = 'task7';
    this.addTask();

    this.taskEffort = 2;
    this.taskName = 'task8';
    this.addTask();

    this.taskEffort = 5;
    this.taskName = 'task9';
    this.addTask();

    this.taskEffort = 9;
    this.taskName = 'task10';
    this.addTask();

    this.taskEffort = null;
  }

}
