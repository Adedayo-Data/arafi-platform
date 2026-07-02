import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmptyDashboard from "./pages/EmptyDashboard";
import Logs from "./pages/Logs";
import ApiKeys from "./pages/ApiKeys";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/empty" element={<EmptyDashboard />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/apikeys" element={<ApiKeys />} />
      </Routes>
    </Router>
  );
}

export default App;
