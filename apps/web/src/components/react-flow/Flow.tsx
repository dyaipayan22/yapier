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
} from "@xyflow/react";
import { initialEdges, initialNodes } from "./workflow-constants";
import TriggerNode from "./TriggerNode";
import ActionNode from "./ActionNode";
import CustomEdge from "./CustomEdge";

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const Flow = () => {
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[80vh] relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          zoomOnScroll={false}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <Background variant={BackgroundVariant.Lines} gap={10} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;
