export class Task {
    public name: string;
    public effort: number;
    public remainingEffort: number;

    constructor(name: string, effort: number) {
      if (effort === 0) {
        throw Error("We don't allow task with effort 0");
      }
      this.name = name;
      this.effort = effort;
      this.remainingEffort = effort;
    }

    print() {
      console.log("Task " + this.name + "with effort " + this.effort);
    }
}
