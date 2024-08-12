import axiosPublic from "@/lib/axios";
import { AvailableTrigger } from "@repo/schema";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";
import { useNodeId, useReactFlow } from "@xyflow/react";

const AvailableTriggers = () => {
  const nodeId = useNodeId();
  const { updateNodeData } = useReactFlow();
  const [triggers, setTriggers] = useState<AvailableTrigger[]>([]);

  async function fetchAvailableTriggers() {
    await axiosPublic
      .get("/api/v1/trigger/available")
      .then((res) => setTriggers(res.data.payload));
  }

  const setTriggerData = (trigger: AvailableTrigger) => {
    updateNodeData(nodeId as string, {
      triggerId: trigger.id,
      triggerName: trigger.name,
      triggerImg: trigger.image,
    });
  };

  useEffect(() => {
    fetchAvailableTriggers();
  }, [triggers]);

  return (
    <div className="flex flex-col gap-4">
      {triggers.length > 0 ? (
        <>
          {triggers.map((trigger) => (
            <DialogClose key={trigger.id}>
              <Button
                variant={"link"}
                className="w-full flex items-center justify-start gap-4 border-2 py-6"
                onClick={() => setTriggerData(trigger)}
              >
                <img src={trigger.image} className="w-8 h-8" />
                <h1 className="font-bold">{trigger.name}</h1>
              </Button>
            </DialogClose>
          ))}
        </>
      ) : (
        <h1>No available triggers</h1>
      )}
    </div>
  );
};

export default AvailableTriggers;
