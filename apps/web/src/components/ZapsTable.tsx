import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Zap } from "@repo/schema";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";

// const zaps = [
//   {
//     triggers: ["a", "b"],
//     name: "trigger",
//     lastEdit: "2d",
//     running: true,
//   },
//   {
//     triggers: ["a", "b"],
//     name: "trigger 2",
//     lastEdit: "3d",
//     running: false,
//   },
// ];

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
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Triggers</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Last Edit</TableHead>
            <TableHead>Running</TableHead>
          </TableRow>
        </TableHeader>

        {/* <TableBody>
        {zaps?.map((zap, index) => (
          <TableRow key={index}>
          <TableCell className="flex items-center gap-2">
          {zap.triggers.map((trigger, index) => (
            <div key={index}>{trigger}</div>
            ))}
            </TableCell>
            <TableCell className="capitalize font-bold">{zap.name}</TableCell>
            <TableCell>{zap.lastEdit}</TableCell>
            <TableCell>
            <Switch checked={zap.running} />
            </TableCell>
            </TableRow>
            ))}
            </TableBody> */}
      </Table>
      <span>{zaps.length}</span>
    </>
  );
};

export default ZapsTable;
