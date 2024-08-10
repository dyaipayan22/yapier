import axiosPublic from "@/lib/axios";
import { AvailableTrigger } from "@repo/schema";
import { useEffect, useState } from "react";

const AvailableTriggers = () => {
  const [triggers, setTriggers] = useState<AvailableTrigger[]>([]);

  async function fetchAvailableTriggers() {
    await axiosPublic
      .get("/api/v1/trigger/available")
      .then((res) => setTriggers(res.data.payload));
  }

  useEffect(() => {
    fetchAvailableTriggers();
  }, [triggers]);

  return (
    <div className="flex flex-col gap-4">
      {triggers.length > 0 ? (
        <>
          {triggers.map((trigger) => (
            <div
              className="w-full flex items-center gap-4 border rounded-md shadow-sm p-2 cursor-pointer hover:bg-[#f2f2f2] ease-in"
              key={trigger.id}
            >
              <img src={trigger.image} className="w-8 h-8" />
              <h1 className="font-medium font-heading text-lg">
                {trigger.name}
              </h1>
            </div>
          ))}
        </>
      ) : (
        <h1>No available triggers</h1>
      )}
    </div>
  );
};

export default AvailableTriggers;
