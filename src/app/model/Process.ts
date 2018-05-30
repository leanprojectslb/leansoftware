import { EntityQueue } from './EntityQueue';

export class Process {
  public capacity: number;
  public name: string;
  public inputQueue: EntityQueue;
  public outputQueue: EntityQueue;

  public doWork() {
    console.log("Process " + this.name);
    console.log("tasks before work");
    this.inputQueue.taskList.forEach(x => console.log(x));

    for (let i = 0; i < this.capacity; i++) {
      if (this.inputQueue.taskList.length === 0) {
        break;
      }
      const currentElement = this.inputQueue.taskList[0];
      currentElement.remainingEffort--;

      if (currentElement.remainingEffort === 0) {
        currentElement.remainingEffort = currentElement.effort;
        this.outputQueue.taskList.push(currentElement);
        this.inputQueue.taskList = this.inputQueue.taskList.slice(1, this.inputQueue.taskList.length);
      }
    }

    console.log("tasks pending");
    this.inputQueue.taskList.forEach(x => x.print());
  }
}
