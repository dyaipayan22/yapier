import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Handle, Position } from "@xyflow/react";
import { Label } from "../ui/label";

const TriggerNode = () => {
  const [trigger, setTrigger] = useState<string>("");
  return (
    <>
      <div className="w-[326px] p-2.5 border-2 border-dashed border-secondary rounded-md bg-white">
        <div className="flex flex-col gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Trigger</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Available Triggers</DialogTitle>
                <DialogDescription>
                  Choose a trigger to get started
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Label>Select the event that starts your Zap</Label>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default TriggerNode;
