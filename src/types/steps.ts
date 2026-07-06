export type Step =
  | { type: "visit_node"; node: string }
  | { type: "enqueue"; node: string }
  | { type: "dequeue"; node: string; queue: string[] };
