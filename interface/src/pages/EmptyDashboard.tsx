import DashboardLayout from "../components/dashboard/DashboardLayout";
import EmptyStateCard from "../components/ui/EmptyStateCard";

export default function EmptyDashboard() {
  return (
    <DashboardLayout>
      <header className="mb-10">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white drop-shadow-md">
          Dashboard Overview
        </h2>
        <p className="text-secondary-fixed-dim mt-2 max-w-2xl text-lg">
          Your environment is fully initialized. Start integrating via our REST
          API or configure your webhook listeners below.
        </p>
      </header>

      {/* Bento Grid for Empty States */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <EmptyStateCard
          icon="account_balance"
          title="No Virtual Accounts yet"
          description="Programmatically provision sub-accounts to segregate funds and track ledger entries."
          buttonText="Create Virtual Account"
          curlCommand="https://api.arafi.com/v1/accounts"
        />

        <EmptyStateCard
          icon="autorenew"
          title="No Subscriptions yet"
          description="Set up recurring billing schedules, define pricing tiers, and automate invoicing."
          buttonText="Initialize Subscription"
          curlCommand="https://api.arafi.com/v1/subscriptions"
        />

        <EmptyStateCard
          icon="receipt_long"
          title="No Transactions yet"
          description="Execute money movement APIs to process inbound payments and outbound transfers."
          buttonText="Process Transaction"
          curlCommand="https://api.arafi.com/v1/transactions"
        />

        <EmptyStateCard
          icon="webhook"
          title="No Webhook Endpoints yet"
          description="Listen for asynchronous events like state changes, clearing statuses, and lifecycle updates."
          buttonText="Register Endpoint"
          curlCommand="https://api.arafi.com/v1/webhooks"
        />
      </div>
    </DashboardLayout>
  );
}
