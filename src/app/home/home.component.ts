import {Component} from '@angular/core';
import {Process} from '../model/Process';
import {EntityQueue} from '../model/EntityQueue';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public backlog = new EntityQueue();
  // set array for task

   public finalQueue: EntityQueue;
  // set array for task

  public processCounter: number = 1;

  public processList : Array<Process> = [];

  addProcess() {
  let process1 = new Process();
  process1.capacity = 3;
  process1.name = 'Process One'+ this.processCounter;
  this.processCounter = this.processCounter + 1;
  process1.outputQueue = new EntityQueue();
  this.finalQueue = process1.outputQueue;
  if(this.processCounter == 1){
    process1.inputQueue = this.backlog;
  } else {
    process1.inputQueue = this.finalQueue;
  }
  this.processList.push(process1);
  }

  getProcesses () {
    
  }
}
