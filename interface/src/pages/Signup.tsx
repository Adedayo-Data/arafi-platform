import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundShader from "../components/ui/BackgroundShader";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [appName, setAppName] = useState("");
  const [email, setEmail] = useState("");
  const [viewState, setViewState] = useState<"signup" | "key">("signup");
  const [generatedKey, setGeneratedKey] = useState("");
  const [keyCopied, setKeyCopied] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const key = signup(appName, email);
    setGeneratedKey(key);
    setIsTransitioning(true);
    setTimeout(() => {
      setViewState("key");
      setIsTransitioning(false);
    }, 200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedKey).catch(() => {});
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  const handleContinue = () => {
    setIsSubmitting(true);
    setTimeout(() => navigate("/dashboard"), 600);
  };

  return (
    <div className="text-on-surface antialiased h-screen w-full flex font-body-md selection:bg-primary/30 selection:text-primary-fixed overflow-hidden">
      <BackgroundShader />

      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-primary/10 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-tertiary/5 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full h-full flex flex-col lg:flex-row relative">
        {/* Left: Value Prop */}
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
            <div className="absolute -inset-4 bg-linear-to-tr from-primary/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
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
                    {`curl https://api.arafi.com/v1/auth \\\n  -H `}
                    <span className="text-tertiary">
                      "Authorization: Bearer sk_live_..."
                    </span>
                    {` \\\n  -d `}
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
            className="glass-card w-full h-full p-8 md:p-12 flex flex-col justify-center gap-8 shadow-2xl relative"
            id="app-card"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>

            {/* State 1: Sign Up Form */}
            {viewState === "signup" && (
              <div
                className={`flex flex-col gap-8 w-full relative z-10 transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
                id="view-signup"
              >
                <header className="flex flex-col gap-3">
                  <div className="font-label-mono text-primary text-[11px] uppercase tracking-widest mb-1">
                    Step 01
                  </div>
                  <h2 className="font-headline-lg text-3xl tracking-tight text-on-surface">
                    Create your app
                  </h2>
                  <p className="font-body-md text-on-surface/50">
                    Configure your environment to generate access credentials.
                  </p>
                </header>

                <form
                  className="flex flex-col gap-6"
                  id="form-signup"
                  onSubmit={handleSignup}
                >
                  <div className="flex flex-col gap-2.5">
                    <label
                      className="font-label-mono text-label-mono text-on-surface/80"
                      htmlFor="app-name"
                    >
                      App Name
                    </label>
                    <input
                      className="bg-surface-container-lowest/50 border border-white/10 rounded-lg p-3.5 font-body-md text-body-md text-on-surface custom-input placeholder:text-on-surface-variant/40"
                      id="app-name"
                      placeholder="e.g. Production Cluster"
                      required
                      type="text"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label
                      className="font-label-mono text-label-mono text-on-surface/80"
                      htmlFor="app-email"
                    >
                      Admin Email
                    </label>
                    <input
                      className="bg-surface-container-lowest/50 border border-white/10 rounded-lg p-3.5 font-body-md text-body-md text-on-surface custom-input placeholder:text-on-surface-variant/40"
                      id="app-email"
                      placeholder="dev@company.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    className="mt-4 w-full glow-button bg-inverse-primary text-on-primary font-label-mono text-label-mono py-4 px-4 rounded-lg transition-all duration-300 border-t border-white/20 shadow-xl shadow-indigo-500/20 hover:scale-[1.02]"
                    type="submit"
                  >
                    Get API key
                  </button>
                </form>

                <div className="flex justify-center pt-2 border-t border-white/10">
                  <a
                    className="font-body-md text-body-md text-on-surface/60 hover:text-on-surface transition-colors"
                    href="/login"
                  >
                    Already have an account? Log in
                  </a>
                </div>
              </div>
            )}

            {/* State 2: API Key Reveal */}
            {viewState === "key" && (
              <div
                className="flex flex-col gap-8 w-full relative z-10 animate-fade"
                id="view-key"
              >
                <header className="flex flex-col gap-3">
                  <div className="font-label-mono text-primary text-[11px] uppercase tracking-widest mb-1">
                    Step 02
                  </div>
                  <h2 className="font-headline-lg text-3xl tracking-tight text-on-surface">
                    Your API key
                  </h2>
                  <p className="font-body-md text-on-surface/50">
                    Here is your live production key. Use it to authenticate
                    your requests.
                  </p>
                </header>

                {/* Warning Banner */}
                <div className="bg-tertiary-container/10 border border-tertiary-container/30 rounded-xl p-4 flex gap-3.5 items-start backdrop-blur-md">
                  <span
                    className="material-symbols-outlined text-tertiary mt-0.5 text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    warning
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-label-mono text-label-mono text-tertiary">
                      Save this now
                    </span>
                    <span className="font-body-md text-[13px] leading-relaxed text-on-surface/60">
                      For your security, this key will never be shown again.
                      Please store it in a secure location.
                    </span>
                  </div>
                </div>

                {/* Monospace Key Block */}
                <div className="flex flex-col gap-2.5">
                  <label className="font-label-mono text-label-mono text-on-surface/80">
                    Production Key
                  </label>
                  <div className="bg-surface-container-lowest/80 border border-white/10 rounded-lg flex items-center justify-between p-1.5 pl-4 group hover:border-white/20 transition-colors">
                    <code className="font-code-sm text-code-sm text-primary-fixed truncate pr-2 select-all">
                      {generatedKey}
                    </code>
                    <button
                      className={`h-10 w-10 flex items-center justify-center rounded-md transition-colors ${
                        keyCopied
                          ? "bg-primary/20 text-primary"
                          : "text-on-surface/60 hover:text-on-surface hover:bg-white/10"
                      }`}
                      id="btn-copy"
                      title="Copy to clipboard"
                      onClick={handleCopy}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {keyCopied ? "check" : "content_copy"}
                      </span>
                    </button>
                  </div>
                </div>

                <button
                  className={`mt-4 w-full font-label-mono text-label-mono py-4 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    !keyCopied && !isSubmitting
                      ? "bg-white/5 border border-white/10 text-on-surface/40 cursor-not-allowed"
                      : "bg-inverse-primary text-on-primary border-t border-white/20 glow-button shadow-xl shadow-indigo-500/20 hover:scale-[1.02]"
                  }`}
                  disabled={!keyCopied}
                  id="btn-continue"
                  onClick={handleContinue}
                >
                  {isSubmitting ? (
                    <span className="material-symbols-outlined animate-spin text-[18px]">
                      progress_activity
                    </span>
                  ) : (
                    "Continue to Dashboard"
                  )}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
