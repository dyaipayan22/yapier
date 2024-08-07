import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
// import { Label } from "../ui/label";

const ActionNode = ({ data, id }: NodeProps) => {
  const { setNodes } = useReactFlow();

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="w-[326px] p-2.5 border-2 border-dashed border-secondary rounded-md bg-white">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Action</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Available Actions</DialogTitle>
                  <DialogDescription>
                    Choose a trigger to get started
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() =>
                setNodes((prevNodes) =>
                  prevNodes.filter((node) => node.id !== id)
                )
              }
            >
              Delete
            </Button>
          </div>
          {/* <Label>{data.label}</Label> */}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default ActionNode;
