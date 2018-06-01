export class Task {
    public name: string;
    public effort: number;
    public remainingEffort: number;
    public cycleTime: number = 4;

    constructor(name: string, effort: number) {
      if (!effort || effort === 0) {
        //throw Error("We don't allow task with effort 0");
        effort =1;
      }
      this.name = name;
      this.effort = effort;
      this.remainingEffort = effort;
    }

    print() {
      console.log("Task " + this.name + "with effort " + this.effort);
    }
}
