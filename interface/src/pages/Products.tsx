import { useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";

interface Product {
  id: string;
  name: string;
  price: string;
  sku: string;
  status: "ACTIVE" | "ARCHIVED";
}

export default function Products() {
  const [products] = useState<Product[]>([
    { id: "1", name: "Premium SaaS API License", price: "₦15,000", sku: "LIC-PRO-API", status: "ACTIVE" },
    { id: "2", name: "Custom E-Commerce Theme (One-off)", price: "₦25,000", sku: "TEM-ECO-ONEOFF", status: "ACTIVE" },
    { id: "3", name: "Developer Consultation Hour", price: "₦50,000", sku: "SRV-DEV-HOUR", status: "ACTIVE" }
  ]);

  return (
    <DashboardLayout>
      <header className="mb-10">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white drop-shadow-md">
          Products & One-Off Payments
        </h2>
        <p className="text-secondary-fixed-dim mt-2 max-w-2xl text-lg">
          Manage items for one-time checkout billing links. For this MVP version, checkouts are restricted to one product at a time.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Products List Panel */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="glass-card rounded-2xl border border-on-surface/10 p-6 shadow-2xl">
            <h3 className="font-headline-sm font-bold text-white text-base mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">inventory_2</span>
              Product Inventory (Sandbox Mode)
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-on-surface/10 text-on-surface/50 text-xs font-label-mono uppercase tracking-wider">
                    <th className="pb-3 pl-2">Product Name</th>
                    <th className="pb-3">SKU</th>
                    <th className="pb-3 text-right">Price</th>
                    <th className="pb-3 text-right pr-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-on-surface/5 hover:bg-on-surface/5 transition-colors">
                      <td className="py-4 pl-2 font-semibold text-white">{product.name}</td>
                      <td className="py-4 font-mono text-xs text-on-surface/60">{product.sku}</td>
                      <td className="py-4 text-right font-mono text-white">{product.price}</td>
                      <td className="py-4 text-right pr-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Future Blueprint Panel */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="glass-card rounded-2xl border border-on-surface/10 p-6 shadow-2xl bg-linear-to-b from-primary/10 to-transparent">
            <h3 className="font-headline-sm font-bold text-white text-base mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">construction</span>
              Roadmap: Cart Intent API
            </h3>
            <p className="text-on-surface/70 text-sm leading-relaxed mb-4">
              We are building the <strong>Cart Intent API</strong> to allow developers to push multi-item shopping baskets with varied product SKU prices and auto-calculate aggregate totals:
            </p>
            <div className="rounded-xl border border-on-surface/10 bg-surface/90 overflow-hidden relative group mb-4">
              <div className="flex items-center px-4 py-2 bg-on-surface/5 border-b border-on-surface/10 gap-2">
                <span className="text-[10px] uppercase font-bold text-primary font-mono">POST</span>
                <span className="font-mono text-xs text-on-surface/40">/v1/checkout/cart</span>
              </div>
              <pre className="p-3 text-[11px] font-mono text-on-surface/80 overflow-x-auto leading-relaxed">
{`{
  "customer_id": "cus_123",
  "items": [
    { "product_id": "prod_shirt_01", "qty": 2 },
    { "product_id": "prod_cap_05", "qty": 1 }
  ]
}`}
              </pre>
            </div>
            <p className="text-xs text-on-surface/50 leading-relaxed">
              This API will bundle all items, calculate total pricing, and auto-route split percentages to various Nomba Sub-Accounts for platform commissions.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
