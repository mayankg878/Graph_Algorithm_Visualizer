import type { GraphNode, GraphEdge, NodeId } from "../types/graph";

let nodeCounter = 0;
let edgeCounter = 0;

export class Graph {
  nodes = new Map<NodeId, GraphNode>();
  edges = new Map<string, GraphEdge>();
  adjList = new Map<NodeId, GraphEdge[]>();

  addNode(x: number, y: number) {
    const id = "n" + nodeCounter++;
    const node: GraphNode = { id, x, y };
    this.nodes.set(id, node);
    this.adjList.set(id, []);
  }

  addEdge(source: NodeId, target: NodeId, weight = 1, directed = false) {
    const id = "e" + edgeCounter++;
    const edge: GraphEdge = { id, source, target, weight, directed };

    this.edges.set(id, edge);
    this.adjList.get(source)?.push(edge);

    if (!directed) {
      const reverse: GraphEdge = {
        ...edge,
        id: id + "_rev",
        source: target,
        target: source,
      };
      this.adjList.get(target)?.push(reverse);
    }
  }

  getNeighbors(id: NodeId) {
    return this.adjList.get(id) ?? [];
  }
}
