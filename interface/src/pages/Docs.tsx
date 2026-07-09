import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundShader from "../components/ui/BackgroundShader";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

type DocSection = "getting-started" | "api-ref" | "sdk" | "escrow" | "products";

export default function Docs() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<DocSection>("getting-started");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="text-on-surface antialiased min-h-screen flex flex-col font-body-md selection:bg-primary/30 selection:text-primary-fixed bg-glow">
      <BackgroundShader />
      <Navbar />

      <main className="grow pt-32 pb-20 max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Menu */}
        <aside className="lg:col-span-3 z-10 flex flex-col gap-2 self-start lg:sticky lg:top-28">
          <h2 className="font-label-mono text-label-mono text-on-surface/40 uppercase tracking-widest text-[11px] mb-4 px-3">
            Navigation Menu
          </h2>
          <button
            onClick={() => setActiveSection("getting-started")}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 border ${
              activeSection === "getting-started"
                ? "bg-primary/10 border-primary/20 text-white font-semibold"
                : "border-transparent text-on-surface/60 hover:bg-on-surface/5 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
            Getting Started
          </button>

          <button
            onClick={() => setActiveSection("api-ref")}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 border ${
              activeSection === "api-ref"
                ? "bg-primary/10 border-primary/20 text-white font-semibold"
                : "border-transparent text-on-surface/60 hover:bg-on-surface/5 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">terminal</span>
            API Reference
          </button>

          <button
            onClick={() => setActiveSection("sdk")}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 border ${
              activeSection === "sdk"
                ? "bg-primary/10 border-primary/20 text-white font-semibold"
                : "border-transparent text-on-surface/60 hover:bg-on-surface/5 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">code</span>
            SDK & Libraries
          </button>

          <button
            onClick={() => setActiveSection("escrow")}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 border ${
              activeSection === "escrow"
                ? "bg-primary/10 border-primary/20 text-white font-semibold"
                : "border-transparent text-on-surface/60 hover:bg-on-surface/5 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">lock</span>
            Milestone Escrow
          </button>

          <button
            onClick={() => setActiveSection("products")}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 border ${
              activeSection === "products"
                ? "bg-primary/10 border-primary/20 text-white font-semibold"
                : "border-transparent text-on-surface/60 hover:bg-on-surface/5 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            Products & Cart
          </button>

          <div className="mt-8 border-t border-on-surface/10 pt-6 px-3">
            <button
              onClick={() => navigate("/login")}
              className="w-full font-label-mono text-label-mono bg-inverse-primary text-on-primary py-3 rounded-xl transition-all hover:scale-[1.02] border-t border-on-surface/20 flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </aside>

        {/* Content Panel */}
        <section className="lg:col-span-9 z-10 glass-card rounded-2xl border border-on-surface/10 p-8 md:p-12 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[120px] -z-10 rounded-full"></div>

          {/* Section: Getting Started */}
          {activeSection === "getting-started" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <header className="border-b border-on-surface/10 pb-6">
                <h1 className="font-headline-lg text-3xl font-bold text-white mb-2">Getting Started</h1>
                <p className="text-on-surface/60 text-lg">Introduction to Arafi, the Payment Logic Layer built for Nomba.</p>
              </header>

              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-primary">
                  <span className="material-symbols-outlined text-[24px]">gavel</span>
                  <h3 className="font-headline-sm font-bold text-white text-lg">Hackathon Judge Credentials</h3>
                </div>
                <p className="text-on-surface/80 text-sm leading-relaxed">
                  Use these pre-configured login details to explore the full dashboard, view ledger histories, create coupons, monitor webhook dispatches, and trigger renewals:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="bg-surface/80 rounded-xl p-4 border border-on-surface/10 relative group">
                    <span className="text-xs text-on-surface/50 uppercase block mb-1">Email Address</span>
                    <span className="text-sm font-mono text-white font-semibold select-all">judge@nomba.com</span>
                    <button
                      onClick={() => handleCopy("judge@nomba.com", "email")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/50 hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {copiedText === "email" ? "done" : "content_copy"}
                      </span>
                    </button>
                  </div>
                  <div className="bg-surface/80 rounded-xl p-4 border border-on-surface/10 relative group">
                    <span className="text-xs text-on-surface/50 uppercase block mb-1">Password</span>
                    <span className="text-sm font-mono text-white font-semibold select-all">nomba2026</span>
                    <button
                      onClick={() => handleCopy("nomba2026", "pass")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/50 hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {copiedText === "pass" ? "done" : "content_copy"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <article className="flex flex-col gap-4 text-on-surface/80 leading-relaxed text-sm">
                <h3 className="font-headline-sm font-bold text-white text-lg mt-4">What is Arafi?</h3>
                <p>
                  Arafi is a <strong>Payment Logic as a Service (PLaaS)</strong> framework. Gateways like Nomba handle money rails, but developers still write thousands of lines of complex billing state machines, double-entry ledger bookkeeping, webhook retries, and dunning engine loops.
                </p>
                <p>
                  Arafi wraps these complex logic flows into a clean REST API. We support two testing environments:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li><strong>Test Mode (Sandbox):</strong> Safely trigger checkouts and simulate transfers using Nomba Sandbox.</li>
                  <li><strong>Live Mode:</strong> Real transactions routed through your custom Nomba Sub-Account credentials.</li>
                </ul>
              </article>
            </div>
          )}

          {/* Section: API Reference */}
          {activeSection === "api-ref" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <header className="border-b border-on-surface/10 pb-6">
                <h1 className="font-headline-lg text-3xl font-bold text-white mb-2">API Reference</h1>
                <p className="text-on-surface/60 text-lg">Integrate Arafi's billing and logic engine into your backend.</p>
              </header>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-headline-sm font-bold text-white text-base mb-2">1. Register a Customer</h3>
                  <p className="text-on-surface/70 text-sm mb-3">Creates a billing customer mapped to your app. Pass their name to create verified virtual accounts.</p>
                  <div className="relative rounded-xl overflow-hidden border border-on-surface/10 bg-surface/90">
                    <div className="flex items-center px-4 py-2 bg-on-surface/5 border-b border-on-surface/10 gap-2">
                      <span className="text-[10px] uppercase font-bold text-primary font-mono">POST</span>
                      <span className="font-mono text-xs text-on-surface/60">/v1/customers</span>
                    </div>
                    <pre className="p-4 text-[13px] font-mono text-on-surface/80 overflow-x-auto">
{`{
  "email": "customer@example.com",
  "name": "Adedayo Olamide",
  "external_ref": "your_app_ref_1001"
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-headline-sm font-bold text-white text-base mb-2">2. Create a Billing Subscription</h3>
                  <p className="text-on-surface/70 text-sm mb-3">Subscribe a customer to a billing plan. Can be CARD or BANK_TRANSFER.</p>
                  <div className="relative rounded-xl overflow-hidden border border-on-surface/10 bg-surface/90">
                    <div className="flex items-center px-4 py-2 bg-on-surface/5 border-b border-on-surface/10 gap-2">
                      <span className="text-[10px] uppercase font-bold text-primary font-mono">POST</span>
                      <span className="font-mono text-xs text-on-surface/60">/v1/subscriptions</span>
                    </div>
                    <pre className="p-4 text-[13px] font-mono text-on-surface/80 overflow-x-auto">
{`{
  "customer_id": "b089e7d1-2258-427c-a929-a3feb8d941f4",
  "plan_id": "dfb4510c-a527-4da1-a137-fd683b9b3c57",
  "payment_method": "BANK_TRANSFER"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: SDK */}
          {activeSection === "sdk" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <header className="border-b border-on-surface/10 pb-6">
                <h1 className="font-headline-lg text-3xl font-bold text-white mb-2">SDK & Client Libraries</h1>
                <p className="text-on-surface/60 text-lg">One line checkout experiences for Javascript, Typescript, and Mobile.</p>
              </header>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-yellow-500">
                  <span className="material-symbols-outlined text-[24px]">construction</span>
                  <h3 className="font-headline-sm font-bold text-white text-lg">Future SDK Blueprint</h3>
                </div>
                <p className="text-on-surface/80 text-sm leading-relaxed">
                  We are developing the Arafi Frontend Drop-In Widget. Our vision is to let developers call checkouts with zero billing routing configurations:
                </p>
                <div className="relative rounded-xl overflow-hidden border border-on-surface/10 bg-surface/90">
                  <div className="flex items-center px-4 py-2 bg-on-surface/5 border-b border-on-surface/10 gap-2">
                    <span className="text-[10px] uppercase font-bold text-yellow-500 font-mono">TYPESCRIPT</span>
                    <span className="font-mono text-xs text-on-surface/60">Checkout Integration Example</span>
                  </div>
                  <pre className="p-4 text-[13px] font-mono text-on-surface/80 overflow-x-auto">
{`import { Arafi } from '@arafi/js';

const arafi = new Arafi({
  publishableKey: "arafi_test_01j7h8..."
});

// Triggers payment modal automatically
arafi.checkout({
  planId: "plan-pro-yearly",
  email: "customer@example.com",
  name: "Adedayo Olamide"
}).then(res => {
  console.log("Subscription status:", res.status);
});`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Section: Escrow */}
          {activeSection === "escrow" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <header className="border-b border-on-surface/10 pb-6">
                <h1 className="font-headline-lg text-3xl font-bold text-white mb-2">Multi-Tenant Escrow</h1>
                <p className="text-on-surface/60 text-lg">Safe operations for P2P delivery platforms and event organizers.</p>
              </header>

              <article className="flex flex-col gap-4 text-on-surface/80 leading-relaxed text-sm">
                <p>
                  Escrow is one of the most requested billing logics. We utilize <strong>Nomba's Sub-Account rails</strong> to lock funds programmatically until confirmation.
                </p>
                <h3 className="font-headline-sm font-bold text-white text-lg mt-4">Proposed Escrow Architecture:</h3>
                <ol className="list-decimal pl-5 flex flex-col gap-3">
                  <li>
                    <strong>Provision Holding Sub-Account:</strong> Arafi programmatically boots an isolated virtual account mapped specifically to an individual escrow transaction ID.
                  </li>
                  <li>
                    <strong>Hold Period:</strong> The customer transfers funds into the virtual holding account. Arafi logs these funds inside our ledger but restricts payouts or dashboard withdrawals.
                  </li>
                  <li>
                    <strong>Release Event:</strong> Once the buyer confirms delivery, or a third-party shipping webhook completes successfully, the developer fires the payout endpoint:
                    <div className="relative rounded-xl overflow-hidden border border-on-surface/10 bg-surface/90 my-2">
                      <div className="flex items-center px-4 py-2 bg-on-surface/5 border-b border-on-surface/10 gap-2">
                        <span className="text-[10px] uppercase font-bold text-primary font-mono">PUT</span>
                        <span className="font-mono text-xs text-on-surface/60">/v1/escrow/release/&#123;escrowId&#125;</span>
                      </div>
                    </div>
                    This automatically routes the funds out of the holding pocket and credits it to the merchant's target withdrawal account.
                  </li>
                </ol>
              </article>
            </div>
          )}

          {/* Section: Products & Cart */}
          {activeSection === "products" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <header className="border-b border-on-surface/10 pb-6">
                <h1 className="font-headline-lg text-3xl font-bold text-white mb-2">Products & Cart Billing</h1>
                <p className="text-on-surface/60 text-lg">Roadmap for e-commerce checkouts and multi-item baskets.</p>
              </header>

              <article className="flex flex-col gap-4 text-on-surface/80 leading-relaxed text-sm">
                <h3 className="font-headline-sm font-bold text-white text-lg">One-Off vs Multi-Item Checkouts:</h3>
                <p>
                  Our MVP includes a <strong>Products</strong> overview intended for single one-off product checkouts (e.g. buying a single license or item). 
                </p>
                <p>
                  In the next version of Arafi, we plan to release the <strong>Cart Intent API</strong>. This will enable developers to pass multiple products, price variables, and tax modifiers to generate a unified checkout page:
                </p>
                <div className="relative rounded-xl overflow-hidden border border-on-surface/10 bg-surface/90 my-2">
                  <div className="flex items-center px-4 py-2 bg-on-surface/5 border-b border-on-surface/10 gap-2">
                    <span className="text-[10px] uppercase font-bold text-primary font-mono">POST</span>
                    <span className="font-mono text-xs text-on-surface/60">/v1/checkout/cart</span>
                  </div>
                  <pre className="p-4 text-[13px] font-mono text-on-surface/80 overflow-x-auto">
{`{
  "customer_id": "cus_123",
  "items": [
    { "product_id": "prod_shirt_01", "quantity": 2 },
    { "product_id": "prod_cap_05", "quantity": 1 }
  ],
  "tax_modifier_kobo": 50000,
  "currency": "NGN"
}`}
                  </pre>
                </div>
              </article>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
