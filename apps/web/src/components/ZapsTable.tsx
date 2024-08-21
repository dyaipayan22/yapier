import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { format } from "date-fns";
import { Zap } from "@repo/schema";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";

const ZapsTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const [zaps, setZaps] = useState<Zap[]>([]);

  async function fetchZaps() {
    await axiosPrivate.get("/api/v1/zap").then((res) => {
      setZaps(res.data.payload);
    });
  }
  useEffect(() => {
    fetchZaps();
  }, [zaps]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Trigger</TableHead>
          <TableHead>Actions</TableHead>
          <TableHead>Webhook</TableHead>
          <TableHead>Last Executed</TableHead>
          <TableHead>Created at</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {zaps?.map((zap, index) => (
          <TableRow key={index}>
            <TableCell className="flex items-center gap-2">
              <img src={zap.trigger.type.image} className="w-8 h-8" />
            </TableCell>
            <TableCell className="capitalize font-bold">
              <div className="flex items-center gap-2">
                {zap.actions.map((action) => (
                  <img
                    key={action.id}
                    src={action.type.image}
                    className="w-8 h-8"
                  />
                ))}
              </div>
            </TableCell>
            <TableCell>
              {`${import.meta.env.VITE_HOOKS_SERVER_URL}/hooks/catch/${zap.userId}/${zap.id}`}
            </TableCell>
            <TableCell>{format(zap.createdAt, "do MMM yyyy")}</TableCell>
            <TableCell>{format(zap.createdAt, "do MMM yyyy")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ZapsTable;
