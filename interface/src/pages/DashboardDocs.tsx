import DashboardLayout from "../components/dashboard/DashboardLayout";
import ApiDocumentation from "../components/shared/ApiDocumentation";

export default function DashboardDocs() {
  return (
    <DashboardLayout>
      <div className="-mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <ApiDocumentation />
      </div>
    </DashboardLayout>
  );
}
