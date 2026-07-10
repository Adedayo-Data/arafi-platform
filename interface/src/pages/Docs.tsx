import BackgroundShader from "../components/ui/BackgroundShader";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import ApiDocumentation from "../components/shared/ApiDocumentation";

export default function Docs() {
  return (
    <div className="text-on-surface antialiased min-h-screen flex flex-col font-body-md selection:bg-primary/30 selection:text-primary-fixed bg-glow">
      <BackgroundShader />
      <Navbar />

      {/* Main Container */}
      <div className="grow pt-28 flex flex-col w-full">
        <ApiDocumentation />
      </div>

      <Footer />
    </div>
  );
}
