export class Task {
    public name: string;
    public effort: number;
    public remainingEffort: number;

    public startTime : number;
    public cycleTime : number = 0;

    constructor(name: string, effort: number, startTime: number) {
      if (effort === 0 || !effort) {
        console.log("We don't allow task with effort 0...assigning it to 1");
        effort = 1;
      }
      this.name = name;
      this.effort = effort;
      this.remainingEffort = effort;
      this.startTime = startTime;
    }

    print() {
      console.log("Task " + this.name + "with effort " + this.effort);
    }
}
