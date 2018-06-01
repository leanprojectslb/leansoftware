import { EntityQueue } from './EntityQueue';
import { Task } from "./Task";

export class Process {
    public capacity: number;
    public workInProgressLimit: number;
    public name: string;
    public sourceQueue: EntityQueue;
    public inputQueue: EntityQueue;
    public outputQueue: EntityQueue;

    constructor(capacity: number, name: string, workInProgress: number) {
        if (!workInProgress || workInProgress < 1) {
            workInProgress = 1;
            // throw Error("Work in progress limit must be strictly greater than 0");
        }
        if (!capacity || capacity < 1) {
            capacity = 1;
        }
        this.capacity = capacity;
        this.name = name;
        this.workInProgressLimit = workInProgress;
    }

    public doWork() {
        let currentWorkInProgress = this.inputQueue.taskList.length + this.outputQueue.taskList.length;
        for (let i = currentWorkInProgress; i < this.workInProgressLimit; i++) {
            if (this.sourceQueue.taskList.length > 0) {
                let deletedTaskArray = this.sourceQueue.taskList.splice(0, 1);
                deletedTaskArray[0].remainingEffort = deletedTaskArray[0].effort;                
                this.inputQueue.taskList.push(deletedTaskArray[0]);
            }
        }
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
                currentWorkInProgress++;
                this.moveElementToNextQueue(currentElement);
            }
        }


        // //for (let i = 0; i < this.capacity; i++) {
        // if (this.inputQueue.taskList.length === 0) {
        //     console.log("there is no task left for processing");
        //     break;
        // }
        // if (this.currentWorkInProgress === this.workInProgressLimit) {
        //     console.log("we reached the work in progress limit");
        //     break;
        // }
        // const currentElement = this.inputQueue.taskList[0];
        // currentElement.remainingEffort--;

        // if (currentElement.remainingEffort === 0) {
        //     this.currentWorkInProgress++;
        //     this.moveElementToNextQueue(currentElement);
        // }
        // //}

        console.log("tasks pending");
        this.inputQueue.taskList.forEach(x => x.print());
    }

    private moveElementToNextQueue(task: Task): void {
        task.remainingEffort=0;        
        this.outputQueue.taskList.push(task);
        this.inputQueue.taskList = this.inputQueue.taskList.slice(1, this.inputQueue.taskList.length);
    }
}
