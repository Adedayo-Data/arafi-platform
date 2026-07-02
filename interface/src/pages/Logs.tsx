import { useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import EndpointButton from "../components/ui/EndpointButton";

export default function Logs() {
  const [activeEndpoint, setActiveEndpoint] = useState("/v1/transactions");
  const [showResponse, setShowResponse] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleEndpointClick = (path: string) => {
    setActiveEndpoint(path);
    setShowResponse(false);
    
    // Retrigger slide animation
    setAnimating(false);
    setTimeout(() => setAnimating(true), 10);
  };

  const handleSend = () => {
    setShowResponse(true);
    setAnimating(false);
  };

  return (
    <DashboardLayout fullHeight>
      {/* Header */}
      <header className="h-16 border-b border-tech flex items-center px-6 justify-between bg-surface-container-lowest shrink-0 hidden md:flex">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          API Explorer
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              className="bg-[#0D1220] border-tech rounded-lg pl-10 pr-4 py-1.5 text-sm font-label-mono text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 w-64"
              placeholder="Search endpoints..."
              type="text"
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden flex-col md:flex-row mt-16 md:mt-0">
        {/* Endpoints List */}
        <div className="w-full md:w-80 border-r border-tech bg-surface-container-lowest overflow-y-auto shrink-0 flex flex-col hidden md:flex">
          <div className="p-4 border-b border-tech">
            <h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest text-[11px] mb-3">
              Authentication
            </h3>
            <div className="space-y-2">
              <EndpointButton
                method="POST"
                path="/v1/auth/token"
                description="Generate API access token"
                isActive={activeEndpoint === "/v1/auth/token"}
                onClick={() => handleEndpointClick("/v1/auth/token")}
              />
            </div>
          </div>
          <div className="p-4 border-b border-tech">
            <h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest text-[11px] mb-3">
              Transactions
            </h3>
            <div className="space-y-2">
              <EndpointButton
                method="GET"
                path="/v1/transactions"
                description="List all transactions"
                isActive={activeEndpoint === "/v1/transactions"}
                onClick={() => handleEndpointClick("/v1/transactions")}
              />
              <EndpointButton
                method="POST"
                path="/v1/transactions/process"
                description="Process a new payment"
                isActive={activeEndpoint === "/v1/transactions/process"}
                onClick={() => handleEndpointClick("/v1/transactions/process")}
              />
              <EndpointButton
                method="GET"
                path="/v1/transactions/{id}"
                description="Retrieve transaction details"
                isActive={activeEndpoint === "/v1/transactions/{id}"}
                onClick={() => handleEndpointClick("/v1/transactions/{id}")}
              />
            </div>
          </div>
        </div>

        {/* Request/Response Panel */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0B0F19] relative">
          <div className={`h-full flex flex-col ${animating ? "slide-in" : ""}`}>
            {/* Request Builder */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center bg-[#0D1220] border-tech rounded-lg overflow-hidden w-full md:max-w-2xl">
                  <div className="bg-surface-container-highest px-3 py-2 font-label-mono text-label-mono text-secondary-fixed border-r border-tech">
                    GET
                  </div>
                  <input
                    className="bg-transparent border-none w-full font-label-mono text-label-mono text-on-surface focus:ring-0 px-3 py-2"
                    readOnly
                    type="text"
                    value={`https://api.arafi.dev${activeEndpoint}`}
                  />
                </div>
                <button
                  onClick={handleSend}
                  className="w-full md:w-auto bg-primary text-on-primary hover:bg-primary-container px-6 py-2 rounded-lg font-label-mono text-label-mono transition-colors shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset]"
                >
                  Send Request
                </button>
              </div>

              {/* Headers/Params Tabs */}
              <div className="border border-tech rounded-xl bg-surface-container-lowest overflow-hidden flex flex-col">
                <div className="flex border-b border-tech bg-[#0D1220] overflow-x-auto">
                  <button className="px-4 py-2 font-label-mono text-label-mono text-primary border-b-2 border-primary whitespace-nowrap">
                    Headers (2)
                  </button>
                  <button className="px-4 py-2 font-label-mono text-label-mono text-on-surface-variant hover:text-on-surface whitespace-nowrap">
                    Parameters (0)
                  </button>
                  <button className="px-4 py-2 font-label-mono text-label-mono text-on-surface-variant hover:text-on-surface whitespace-nowrap">
                    Body
                  </button>
                </div>
                <div className="p-4 bg-[#0B0F19] overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[400px]">
                    <thead>
                      <tr className="border-b border-tech">
                        <th className="py-2 px-2 font-label-mono text-[11px] uppercase tracking-widest text-on-surface-variant w-1/3">
                          Key
                        </th>
                        <th className="py-2 px-2 font-label-mono text-[11px] uppercase tracking-widest text-on-surface-variant w-2/3">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="font-code-sm">
                      <tr className="border-b border-tech border-opacity-50">
                        <td className="py-2 px-2 text-secondary-fixed">
                          Authorization
                        </td>
                        <td className="py-2 px-2 text-on-surface">
                          Bearer sk_live_xxxxxxxxxxxxxxxx
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 text-secondary-fixed">
                          Content-Type
                        </td>
                        <td className="py-2 px-2 text-on-surface">
                          application/json
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Response Area */}
            <div className="h-1/2 md:h-1/2 border-t border-tech bg-[#0D1220] flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 border-b border-tech bg-surface-container-lowest">
                <div className="flex items-center gap-4">
                  <span className="font-label-mono text-label-mono text-on-surface">
                    Response
                  </span>
                  {showResponse && (
                    <div className="flex gap-2 animate-fade-up">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-label-mono text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{" "}
                        200 OK
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-mono text-[10px]">
                        124ms
                      </span>
                    </div>
                  )}
                </div>
                <button className="text-on-surface-variant hover:text-on-surface">
                  <span className="material-symbols-outlined text-[18px]">
                    content_copy
                  </span>
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-1 font-code-sm text-code-sm relative">
                {showResponse ? (
                  <pre
                    className="typewriter-content"
                    key={activeEndpoint} // Re-trigger typing animation when activeEndpoint changes, even if response is already shown
                  >
                    <span className="json-string">{`{\n`}</span>
                    {`  `}
                    <span className="json-key">"object"</span>:{" "}
                    <span className="json-string">"list"</span>,<br />
                    {`  `}
                    <span className="json-key">"url"</span>:{" "}
                    <span className="json-string">"{activeEndpoint}"</span>,<br />
                    {`  `}
                    <span className="json-key">"has_more"</span>:{" "}
                    <span className="json-number">false</span>,<br />
                    {`  `}
                    <span className="json-key">"data"</span>: [
                    <br />
                    {`    {\n`}
                    {`      `}
                    <span className="json-key">"id"</span>:{" "}
                    <span className="json-string">
                      "txn_1N9bZj2eZvKYlo2C4H3b..."
                    </span>
                    ,<br />
                    {`      `}
                    <span className="json-key">"object"</span>:{" "}
                    <span className="json-string">"transaction"</span>,<br />
                    {`      `}
                    <span className="json-key">"amount"</span>:{" "}
                    <span className="json-number">4500</span>,<br />
                    {`      `}
                    <span className="json-key">"currency"</span>:{" "}
                    <span className="json-string">"usd"</span>,<br />
                    {`      `}
                    <span className="json-key">"status"</span>:{" "}
                    <span className="json-string">"succeeded"</span>,<br />
                    {`      `}
                    <span className="json-key">"created"</span>:{" "}
                    <span className="json-number">1689254300</span>
                    <br />
                    {`    }\n`}
                    {`  ]\n`}
                    <span className="json-string">{`}`}</span>
                  </pre>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant flex-col gap-2">
                    <span className="material-symbols-outlined text-[32px] opacity-50">
                      code_blocks
                    </span>
                    <p className="font-label-mono text-sm">
                      Hit Send to execute request
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
