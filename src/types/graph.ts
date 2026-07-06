export type NodeId = string;

export interface GraphNode {
  id: NodeId;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  source: NodeId;
  target: NodeId;
  weight?: number;
  directed: boolean;
}
