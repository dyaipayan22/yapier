import { TrashIcon } from "@radix-ui/react-icons";
import AvailableActions from "../AvailableActions";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useNodeId,
  useReactFlow,
} from "@xyflow/react";
import { Label } from "../ui/label";
import SelectActionEvent from "../SelectActionEvent";
import { useState } from "react";

export type Action = Node<
  { actionId: string; actionName: string; actionImg: string; metadata: string },
  "action"
>;

const ActionNode = ({ data }: NodeProps<Action>) => {
  const [clicked, setClicked] = useState<number>(0);
  const nodeId = useNodeId();
  const { setNodes, setEdges } = useReactFlow();

  const deleteNode = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="w-[326px] p-2.5 border-2 border-dashed border-secondary rounded-md bg-white">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  {data.actionId.length === 0 ? (
                    <Button variant="outline">Action</Button>
                  ) : (
                    <div className="flex items-center gap-2 flex-1">
                      <img src={data.actionImg} className="w-6 h-6" />
                      <Label className="text-base font-bold">
                        {data.actionName}
                      </Label>
                    </div>
                  )}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Available Actions</DialogTitle>
                    <DialogDescription>
                      Choose an action for your trigger
                    </DialogDescription>
                  </DialogHeader>
                  <AvailableActions />
                </DialogContent>
              </Dialog>
              <TrashIcon
                className="h-5 w-5 cursor-pointer text-destructive"
                onClick={deleteNode}
              />
            </div>
            <SelectActionEvent />
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default ActionNode;
