import { Button } from "@/components/ui/button";
import ZapsTable from "@/components/ZapsTable";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();

  const fetchZap = async () => {
    const res = await axiosPrivate.get("/api/v1/zap/clzmubhif0000eauoc8i0t29h");
    console.log(res.data);
  };
  useEffect(() => {
    fetchZap();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex item-center justify-between">
        <h1 className="text-2xl font-heading font-medium">My Dashboard</h1>
        <Link to={"/zap/create"}>
          <Button variant={"secondary"}>Create</Button>
        </Link>
      </div>
      <ZapsTable />
    </div>
  );
};

export default Dashboard;
