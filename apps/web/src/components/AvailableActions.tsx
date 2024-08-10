import axiosPublic from "@/lib/axios";
import { AvailableAction } from "@repo/schema";
import { useEffect, useState } from "react";

const AvailableActions = () => {
  const [actions, setActions] = useState<AvailableAction[]>([]);

  async function fetchAvailableActions() {
    await axiosPublic
      .get("/api/v1/action/available")
      .then((res) => setActions(res.data.payload));
  }

  useEffect(() => {
    fetchAvailableActions();
  }, [actions]);

  return (
    <div className="flex flex-col gap-4">
      {actions.length > 0 ? (
        <>
          {actions.map((action) => (
            <div
              className="w-full flex items-center gap-4 border rounded-md shadow-sm p-2 cursor-pointer hover:bg-[#f2f2f2] ease-in"
              key={action.id}
            >
              <img src={action.image} className="w-8 h-8" />
              <h1 className="font-medium font-heading text-lg">
                {action.name}
              </h1>
            </div>
          ))}
        </>
      ) : (
        <h1>No available actions</h1>
      )}
    </div>
  );
};

export default AvailableActions;
