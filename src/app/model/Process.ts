import {EntityQueue} from './EntityQueue';
export class Process {
    public capacity: number;
    public name: string;
    public inputQueue: EntityQueue;
    public outputQueue: EntityQueue;
}
