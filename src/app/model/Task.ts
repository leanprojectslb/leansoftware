export class Task {
    public name: string;
    public effort: number;

    constructor(name: string, effort: number) {
      this.name = name;
      this.effort = effort;
    }

    print() {
      console.log("Task " + this.name + "with effort " + this.effort);
    }
}
