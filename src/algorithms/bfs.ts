import { Graph } from "../core/Graph";
import type { Step } from "../types/steps";

export function bfsSteps(graph: Graph, start: string): Step[] {
  const visited = new Set<string>();
  const queue: string[] = [];
  const steps: Step[] = [];

  visited.add(start);
  queue.push(start);
  steps.push({ type: "enqueue", node: start });

  while (queue.length) {
    const node = queue.shift()!;
    steps.push({ type: "dequeue", node, queue: [...queue] });
    steps.push({ type: "visit_node", node });

    for (const edge of graph.getNeighbors(node)) {
      const neighbor = edge.target;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        steps.push({ type: "enqueue", node: neighbor });
      }
    }
  }

  return steps;
}
