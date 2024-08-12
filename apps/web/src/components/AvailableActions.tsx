import axiosPublic from "@/lib/axios";
import { AvailableAction } from "@repo/schema";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { DialogClose } from "./ui/dialog";

const AvailableActions = () => {
  const nodeId = useNodeId();
  const { updateNodeData } = useReactFlow();
  const [actions, setActions] = useState<AvailableAction[]>([]);

  async function fetchAvailableActions() {
    await axiosPublic
      .get("/api/v1/action/available")
      .then((res) => setActions(res.data.payload));
  }

  const setActionData = (action: AvailableAction) => {
    updateNodeData(nodeId as string, {
      actionId: action.id,
      actionName: action.name,
      actionImg: action.image,
    });
  };

  useEffect(() => {
    fetchAvailableActions();
  }, [actions]);

  return (
    <div className="flex flex-col gap-4">
      {actions.length > 0 ? (
        <>
          {actions.map((action) => (
            <DialogClose key={action.id}>
              <Button
                variant={"link"}
                className="w-full flex items-center justify-start gap-4 border-2 py-6"
                key={action.id}
                onClick={() => setActionData(action)}
              >
                <img src={action.image} className="w-8 h-8" />
                <h1 className="font-bold">{action.name}</h1>
              </Button>
            </DialogClose>
          ))}
        </>
      ) : (
        <h1>No available actions</h1>
      )}
    </div>
  );
};

export default AvailableActions;
