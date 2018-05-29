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

  public addProcess() {
  let process = new Process();
  process.capacity = 3;
  process.name = 'Process'+ this.processCounter;
  this.processCounter = this.processCounter + 1;
  process.outputQueue = new EntityQueue();
  this.finalQueue = process.outputQueue;
  if(this.processCounter == 1){
    process.inputQueue = this.backlog;
  } else {
    process.inputQueue = this.finalQueue;
  }
  console.log(process.name)
  this.processList.push(process);
  }

  getProcesses () {
    
  }
}
