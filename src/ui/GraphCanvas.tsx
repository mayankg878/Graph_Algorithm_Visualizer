import { Graph } from "../core/Graph";
import { useState } from "react";

interface Props {
  graph: Graph;
  highlightedNodes: Set<string>;
  refresh: () => void;
}

export const GraphCanvas = ({ graph, highlightedNodes, refresh }: Props) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    graph.addNode(x, y);
    refresh();
  };

  const handleNodeClick = (id: string) => {
    if (!selectedNode) {
      setSelectedNode(id);
    } else {
      graph.addEdge(selectedNode, id);
      setSelectedNode(null);
      refresh();
    }
  };

  return (
    <svg width="800" height="600" onClick={handleCanvasClick}>
      {[...graph.edges.values()].map(edge => {
        const s = graph.nodes.get(edge.source)!;
        const t = graph.nodes.get(edge.target)!;
        return (
          <line key={edge.id} x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke="gray" />
        );
      })}

      {[...graph.nodes.values()].map(node => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={15}
          fill={
            highlightedNodes.has(node.id)
                ? "orange"
                : node.id === selectedNode
                ? "red"
                : "lightblue"
            }

          onClick={(e) => {
            e.stopPropagation();
            handleNodeClick(node.id);
          }}
        />
      ))}
    </svg>
  );
};
