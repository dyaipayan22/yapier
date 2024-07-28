import { Handle, Position } from '@xyflow/react';
import { Button } from '../ui/button';

const TriggerNode = () => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="grid gap-2 p-2.5 w-[326px] rounded-md bg-white/45 shadow-md">
        <div className="flex items-center justify-between">
          <Button variant={'outline'}>Trigger</Button>
        </div>
        <span>Select trigger</span>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default TriggerNode;
