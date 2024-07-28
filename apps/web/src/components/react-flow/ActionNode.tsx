import { Handle, Position } from '@xyflow/react';
import { Button } from '../ui/button';

const ActionNode = () => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <Button>Action</Button>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default ActionNode;
