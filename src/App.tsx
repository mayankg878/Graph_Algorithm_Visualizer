import { useState } from "react";
import { Graph } from "./core/Graph";
import { GraphCanvas } from "./ui/GraphCanvas";
import { bfsSteps } from "./algorithms/bfs";
import { StepRunner } from "./engine/StepRunner";
import type { Step } from "./types/steps";

const graph = new Graph();

function App() {
  const [version, setVersion] = useState(0);
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const [queueState, setQueueState] = useState<string[]>([]);

  const refresh = () => setVersion(v => v + 1);

  const onStep = (step: Step) => {
    if (step.type === "visit_node") {
      setHighlighted(prev => new Set(prev).add(step.node));
    }
    if (step.type === "dequeue") {
      setQueueState(step.queue);
    }
  };

  const runBFS = () => {
    const startNode = graph.nodes.keys().next().value;
    if (!startNode) return;

    const runner = new StepRunner(bfsSteps(graph, startNode), onStep);

    runner.start(500);
  };

  return (
    <div>
      <h2>Graph Algorithm Visualizer</h2>
      <button onClick={runBFS}>Run BFS</button>
      <p><strong>Queue:</strong> {queueState.join(", ")}</p>
      <GraphCanvas graph={graph} highlightedNodes={highlighted} refresh={refresh} />
    </div>

  );
}

export default App;
