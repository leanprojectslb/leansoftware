import { EntityQueue } from './EntityQueue';
import { Input } from '@angular/core/src/metadata/directives';
import { print } from 'util';
import { componentFactoryName } from '@angular/compiler';

export class Process {
  public capacity: number;
  public name: string;
  public inputQueue: EntityQueue;
  public outputQueue: EntityQueue;

  public doWork() {
    console.log("Working")
    console.log("Process " + this.name)

    this.inputQueue.taskList.forEach(x => console.log(x))
    var i = 0
    for (i = 0; i < this.capacity; i++) {
      let currentElement = this.inputQueue.taskList[0]
      this.outputQueue.taskList.push(currentElement)
      this.inputQueue.taskList = this.inputQueue.taskList.slice(1, this.inputQueue.taskList.length)
    }

    console.log("tasks pending")
    this.inputQueue.taskList.forEach(x => console.log(x))
  }
}
