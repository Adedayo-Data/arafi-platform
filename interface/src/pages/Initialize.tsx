import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import CreateAppModal from "../components/ui/CreateAppModal";
import { useNavigate } from "react-router-dom";

export default function Initialize() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle mouse-parallax glow on the glass panel
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <DashboardLayout>
      {/* Background faded network visualization */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.1))",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.1))",
          opacity: 0.18,
        }}
      >
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDKUSnRpoT_U65cAkWIv1B4tpR9u1eTi0L_BHfYdq0_Aq-RKwLHk3gPrkNu0sG_5yMLUadDhtfAQgCUifW0rex9bJ-wOlBGHYhDEkIime3Fs7B40hRxhg69zfyhFPNYb4qZ7gi3b7W2eCOXvwCqUN52uFjJmkCmqa0_l5UJVyc-vC5RWWYkhWxa_HpLqaGRRayNqLgznw0TF518trgU2EDsBBNdAFTTjhR8Q3xxEJkCBYqkETB_ANCLQwZMQILNR_XmUZJzcU90scOK')`,
          }}
        />
      </div>

      {/* Atmospheric glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] pointer-events-none rounded-full z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] pointer-events-none rounded-full z-0" />

      {/* Centered Content */}
      <section className="flex-1 flex items-center justify-center p-8 z-10 min-h-[calc(100vh-4rem)]">
        <div className="max-w-2xl w-full text-center space-y-8 animate-float">

          {/* Glass Card */}
          <div
            ref={cardRef}
            className="relative p-12 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(31, 31, 39, 0.4)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(144, 143, 160, 0.1)",
              boxShadow: "0 0 40px 5px rgba(99, 102, 241, 0.15)",
            }}
          >
            {/* Top shimmer line */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-on-surface/20 to-transparent" />

            {/* Icon */}
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-highest border border-outline-variant relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
              <span
                className="material-symbols-outlined text-[40px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 200" }}
              >
                dynamic_form
              </span>
            </div>

            {/* Copy */}
            <div className="space-y-4">
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
                Initialize Your Payment Logic
              </h2>
              <p className="text-on-surface-variant font-body-lg text-body-lg max-w-md mx-auto">
                Arafi is ready to orchestrate your payment flows. Create a workspace to generate your API keys and start building scalable, secure payment logic.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <button
                id="btn-create-first-workspace"
                onClick={() => setShowModal(true)}
                className="group relative px-8 py-3.5 bg-primary text-on-primary font-label-mono text-label-mono rounded-lg hover:shadow-[0_0_20px_rgba(192,193,255,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-2 mx-auto"
              >
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                Create Your First Workspace
              </button>
            </div>

            {/* Footer links */}
            <div className="mt-12 pt-8 border-t border-outline-variant/30 flex justify-center gap-8">
              <a
                href="#"
                className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-mono text-[12px]"
              >
                <span className="material-symbols-outlined text-[16px] text-outline">menu_book</span>
                <span>Quick Start Docs</span>
                <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                  arrow_forward
                </span>
              </a>
              <a
                href="#"
                className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-mono text-[12px]"
              >
                <span className="material-symbols-outlined text-[16px] text-outline">api</span>
                <span>Explore API</span>
                <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-center gap-6 text-[11px] font-label-mono text-outline uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Systems Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>AES-256 Encryption Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Create Workspace Modal */}
      {showModal && (
        <CreateAppModal
          onSuccess={() => navigate("/dashboard")}
          onDismiss={() => setShowModal(false)}
        />
      )}
    </DashboardLayout>
  );
}
