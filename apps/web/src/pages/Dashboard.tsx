import { Button } from "@/components/ui/button";
import ZapsTable from "@/components/ZapsTable";
import { Link } from "react-router-dom";

const Dashboard = () => {
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
