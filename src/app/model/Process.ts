import { EntityQueue } from './EntityQueue';
import { Task } from "./Task";

export class Process {
    public capacity: number;
    public currentWorkInProgress: number = 0;
    public name: string;
    public inputQueue: EntityQueue;
    public outputQueue: EntityQueue;

    constructor(capacity: number, name: string) {
        if (!capacity || capacity < 1) {
            capacity = 1;
        }
        this.capacity = capacity;
        this.name = name;
    }

    public doWork() {
        let tempCapacity = this.capacity;
        console.log("Process " + this.name);
        console.log("tasks before work");
        this.inputQueue.taskList.forEach(x => console.log(x));

        while (tempCapacity > 0) {
            if (this.inputQueue.taskList.length === 0) {
                console.log("there is no task left for processing");
                break;
            }
          
            const currentElement = this.inputQueue.taskList[0]
            if (tempCapacity < currentElement.remainingEffort) {
                currentElement.remainingEffort -= tempCapacity
                tempCapacity = 0;
            } else {
                tempCapacity -= currentElement.remainingEffort
                this.moveElementToNextQueue(currentElement);
            }
        }

        console.log("tasks pending");
        this.inputQueue.taskList.forEach(x => x.print());
    }

    private moveElementToNextQueue(task: Task): void {
        task.remainingEffort = task.effort;
        this.outputQueue.taskList.push(task);
        this.inputQueue.taskList = this.inputQueue.taskList.slice(1, this.inputQueue.taskList.length);
    }
}
