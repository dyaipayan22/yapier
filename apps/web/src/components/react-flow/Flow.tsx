import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  NodeTypes,
  EdgeTypes,
  ReactFlowProvider,
  BackgroundVariant,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "@xyflow/react";
import { initialEdges, initialNodes } from "./workflow-constants";
import TriggerNode from "./TriggerNode";
import ActionNode from "./ActionNode";
import CustomEdge from "./CustomEdge";
import { Button } from "../ui/button";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useCallback, useEffect, useState } from "react";

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const Flow = () => {
  const [clicked, setClicked] = useState<number>(0);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const axiosPrivate = useAxiosPrivate();
  console.log(nodes);
  console.log(edges);

  async function createZap() {
    // await axiosPrivate.post('/api/v1/zap/create')
    console.log("Create Zap");
  }

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  const addNode = async () => {
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: (prevNodes.length + 1).toString(),
        position: {
          x: prevNodes[prevNodes.length - 1].position.x,
          y: prevNodes[prevNodes.length - 1].position.y + 200,
        },
        data: { actionId: "", actionName: "", actionImg: "", metadata: "" },
        type: "action",
      },
    ]);
    setClicked((prev) => prev + 1);
  };

  const addEdge = async () => {
    setEdges((prevEdges) => [
      ...prevEdges,
      {
        id: `ed-${edges.length + 1}`,
        source: prevEdges[prevEdges.length - 1].target.toString(),
        target: nodes[nodes.length - 1].id.toString(),
      },
    ]);
  };

  useEffect(() => {
    if (clicked !== 0) {
      addEdge();
    }
  }, [clicked]);

  return (
    <div className="w-full h-[80vh] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        zoomOnScroll={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
      >
        <Background variant={BackgroundVariant.Lines} gap={10} />
        <div className="flex items-center gap-4 absolute right-4 top-4">
          <Button className="z-10" onClick={addNode}>
            Add Node
          </Button>
          <Button className="z-10" onClick={createZap}>
            Publish
          </Button>
        </div>
      </ReactFlow>
    </div>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
