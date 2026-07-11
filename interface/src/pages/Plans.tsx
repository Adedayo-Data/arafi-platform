import DashboardLayout from "../components/dashboard/DashboardLayout";
import PlanTable from "../components/dashboard/PlanTable";
import PageHeader from "../components/ui/PageHeader";

export default function Plans() {
  return (
    <DashboardLayout>
      <div className="animate-fade-up delay-0">
        <PageHeader 
          title="Subscription Plans" 
          description="Create and manage recurring billing plans for your customers." 
        />
      </div>
      
      <div className="flex flex-col gap-gutter animate-fade-up delay-60">
        <PlanTable />
      </div>
    </DashboardLayout>
  );
}
