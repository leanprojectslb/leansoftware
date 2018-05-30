import { Component, OnInit } from '@angular/core';
import { Process } from '../model/Process';
import { EntityQueue } from '../model/EntityQueue';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public backlog = new EntityQueue();
  // set array for task

  public finalQueue: EntityQueue;
  // set array for task

  public processCounter: number = 1;

  public processList: Array<Process> = [];

  public simulate() {

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

    // while(this.finalQueue.taskList.length!=this.backlog.taskList.length){
    this.processList.forEach(process => console.log(process.name) + " " + console.log(process.inputQueue) + " " + console.log(process.outputQueue) + " " + console.log(process.capacity))

    this.backlog.taskList.forEach(task => console.log(task));

    //while(this.backlog)
    this.processList.forEach(process => process.doWork())
    //}
  }


  public addProcess() {
    let process = new Process();
    process.capacity = 3;
    process.name = 'Process' + this.processCounter;

    if (this.processCounter == 1) {
      process.inputQueue = this.backlog;
    } else {
      process.inputQueue = this.finalQueue;
    }
    process.outputQueue = new EntityQueue();
    this.finalQueue = process.outputQueue;
    this.processCounter = this.processCounter + 1;

    //console.log(process.name)
    this.processList.push(process);
  }

  public addTask(task: string) {
    this.backlog.taskList.push(task)
    //console.log("added task " +task)
  }

  ngOnInit() {
  }

}
