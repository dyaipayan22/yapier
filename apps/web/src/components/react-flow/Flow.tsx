import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  NodeTypes,
  ReactFlowProvider,
  BackgroundVariant,
} from "@xyflow/react";
import { initialEdges, initialNodes } from "./workflow-constants";
import TriggerNode from "./TriggerNode";
import ActionNode from "./ActionNode";
import { Button } from "../ui/button";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

const Flow = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState<number>(0);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const axiosPrivate = useAxiosPrivate();

  async function createZap() {
    try {
      await axiosPrivate.post("/api/v1/zap", {
        availableTriggerId: nodes[0].data.triggerId,
        actions: nodes.slice(1).map((action) => ({
          availableActionId: action.data.actionId,
          actionMetadata: JSON.parse(action.data.metadata as string),
        })),
      });
      toast.success("Your zap has been created");
      navigate("/dashboard");
    } catch {
      toast.error("Something went wrong");
    }
  }

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
        zoomOnScroll={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
