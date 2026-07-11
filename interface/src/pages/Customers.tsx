import DashboardLayout from "../components/dashboard/DashboardLayout";
import CustomerTable from "../components/dashboard/CustomerTable";
import PageHeader from "../components/ui/PageHeader";

export default function Customers() {
  return (
    <DashboardLayout>
      <div className="animate-fade-up delay-0">
        <PageHeader 
          title="Customers" 
          description="Manage your customers and their stored payment methods." 
        />
      </div>
      
      <div className="flex flex-col gap-gutter animate-fade-up delay-60">
        <CustomerTable />
      </div>
    </DashboardLayout>
  );
}
