import { useState, useCallback, useMemo } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TriggerNode from './react-flow/TriggerNode';
import ActionNode from './react-flow/ActionNode';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Trigger' },
    type: 'trigger',
  },
  {
    id: '2',
    position: { x: 0, y: 100 },
    data: { label: 'Action' },
    type: 'action',
  },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const Flows = () => {
  const nodeTypes = useMemo(
    () => ({ trigger: TriggerNode, action: ActionNode }),
    []
  );
  return (
    <div className="w-[50vw] h-[80vh]">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
      >
        <Background />
        {/* <Controls /> */}
      </ReactFlow>
    </div>
  );
};

export default Flows;
