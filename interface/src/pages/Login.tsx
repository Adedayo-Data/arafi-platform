import { useState } from "react";
import BackgroundShader from "../components/ui/BackgroundShader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [viewState, setViewState] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API Call & Transition
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setViewState("success");
        setIsSubmitting(false);
        setIsTransitioning(false);
      }, 300);
    }, 1200);
  };

  const resetForm = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setViewState("form");
      setEmail("");
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="text-on-surface antialiased h-screen w-full flex font-body-md selection:bg-primary/30 selection:text-primary-fixed overflow-hidden">
      <BackgroundShader />

      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-tertiary/5 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full h-full flex flex-col lg:flex-row relative">
        {/* Left: Value Prop / Visualization */}
        <div className="hidden lg:flex flex-1 flex-col justify-center gap-8 animate-fade-scale p-12 lg:p-24 max-w-4xl">
          <a
            className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2 mb-4"
            href="/"
          >
            <span className="flex items-center gap-2">
              <img src="/logo.svg" alt="logo" />
              <p> Arafi</p>
            </span>
          </a>
          <h1 className="font-headline-xl text-headline-xl tracking-tight text-on-surface">
            Abstracting the complexity of modern payments.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface/60 leading-relaxed max-w-2xl">
            Create your workspace to access environment-specific API keys and
            define your orchestration rules.
          </p>
          <div className="relative group mt-4 max-w-2xl">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-3xl bg-white/5 shadow-2xl">
              <div className="flex items-center px-4 py-2.5 bg-white/5 border-b border-white/10 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                </div>
                <span className="ml-2 font-code-sm text-[11px] text-on-surface/40 uppercase tracking-widest">
                  auth_flow.sh
                </span>
              </div>
              <div className="p-5 font-code-sm text-[13px] leading-relaxed text-secondary-fixed/80 overflow-x-auto">
                <pre>
                  <code>
                    {`curl https://api.arafi.com/v1/auth \\
  -H `}
                    <span className="text-tertiary">
                      "Authorization: Bearer sk_live_..."
                    </span>
                    {` \\
  -d `}
                    <span className="text-tertiary">
                      {`'{ "app_name": "Production" }'`}
                    </span>
                    <span className="inline-block w-1.5 h-4 bg-primary ml-1 align-middle cursor-blink"></span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Auth Drawer */}
        <div
          className="w-full lg:w-175 lg:ml-20 h-full flex shrink-0 animate-fade-scale"
          style={{ animationDelay: "100ms" }}
        >
          <main
            className="glass-card w-full h-full p-8 md:p-12 flex flex-col justify-center shadow-2xl relative"
            id="app-card"
          >
            {/* Subtle card inner glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>

            <div className="relative w-full flex-1 flex flex-col justify-center">
              {/* View 1: Login Form */}
              <div
                className={`flex flex-col gap-8 w-full transition-all duration-300 relative z-10 ${
                  viewState === "form" && !isTransitioning
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none absolute"
                }`}
              >
                <header className="flex flex-col gap-3">
                  <h2 className="font-headline-lg text-3xl tracking-tight text-on-surface">
                    Log in to Arafi
                  </h2>
                  <p className="font-body-md text-on-surface/50">
                    Enter your email to receive a secure login link.
                  </p>
                </header>

                <form className="flex flex-col gap-6" onSubmit={handleLogin}>
                  <div className="flex flex-col gap-2.5">
                    <label
                      className="font-label-mono text-label-mono text-on-surface/80"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="bg-surface-container-lowest/50 border border-white/10 rounded-lg p-3.5 font-body-md text-body-md text-on-surface custom-input placeholder:text-on-surface-variant/40"
                      id="email"
                      name="email"
                      placeholder="name@company.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    className={`mt-4 w-full glow-button bg-inverse-primary text-on-primary font-label-mono text-label-mono py-4 px-4 rounded-lg transition-all duration-300 border-t border-white/20 shadow-xl shadow-indigo-500/20 flex justify-center items-center gap-2 relative overflow-hidden group ${
                      isSubmitting
                        ? "opacity-80 cursor-not-allowed"
                        : "hover:scale-[1.02]"
                    }`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "Sending..." : "Send login link"}
                    </span>
                    {isSubmitting && (
                      <span className="material-symbols-outlined text-[18px] animate-spin-custom relative z-10">
                        progress_activity
                      </span>
                    )}
                  </button>
                </form>

                <div className="flex justify-center pt-2 border-t border-white/10">
                  <p className="font-body-md text-body-md text-on-surface/60">
                    Don't have an account?
                    <a
                      className="text-primary hover:text-primary-fixed transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary ml-1"
                      href="/signup"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>

              {/* View 2: Success State */}
              <div
                className={`flex flex-col items-center justify-center transition-all duration-300 absolute inset-0 ${
                  viewState === "success" && !isTransitioning
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-secondary-fixed/10 border border-white/10 flex items-center justify-center mb-6 shadow-lg backdrop-blur-sm ${
                    viewState === "success" && !isTransitioning
                      ? "animate-bounce-check"
                      : "opacity-0"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-primary text-[32px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-3 text-center">
                  Check your email
                </h2>
                <p className="font-body-md text-body-md text-on-surface/60 text-center max-w-[280px]">
                  We sent a secure magic link to <br />
                  <span className="text-on-surface font-medium mt-1 inline-block">
                    {email}
                  </span>
                </p>
                <button
                  className="mt-8 font-label-mono text-label-mono text-on-surface/60 hover:text-on-surface transition-colors flex items-center gap-1"
                  onClick={resetForm}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_back
                  </span>
                  Back to login
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
