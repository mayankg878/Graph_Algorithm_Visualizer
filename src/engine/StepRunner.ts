import type { Step } from "../types/steps";

export class StepRunner {
  private steps: Step[];
  private index = 0;
  private interval: number | null = null;

  constructor(steps: Step[], private onStep: (s: Step) => void) {
    this.steps = steps;
  }

  start(speed = 500) {
    this.interval = window.setInterval(() => {
      if (this.index >= this.steps.length) {
        if (this.interval) clearInterval(this.interval);
        return;
      }
      this.onStep(this.steps[this.index++]);
    }, speed);
  }
}
