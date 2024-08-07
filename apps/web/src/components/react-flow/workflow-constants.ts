import { type Edge, type Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { name: "Select Trigger" },
    type: "trigger",
  },
  {
    id: "2",
    position: { x: 100, y: 300 },
    data: { name: "Select Action" },
    type: "action",
  },
];

export const initialEdges: Edge[] = [
  // {
  //   id: "ed-1",
  //   source: "1",
  //   target: "2",
  //   type: "custom",
  // },
];
