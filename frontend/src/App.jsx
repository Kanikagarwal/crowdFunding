import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy-loaded pages
const Home = lazy(() => import("./Pages/Home"));
const Landing = lazy(() => import("./Pages/Landing"));
const Login = lazy(() => import("./Pages/Login"));
const OrganiserLogin = lazy(() => import("./Pages/OrganiserLogin"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Campaigns = lazy(() => import("./components/Campaigns"));
const AllCampaigns = lazy(() => import("./Pages/AllCampaigns"));
const CampaignIndividual = lazy(() => import("./Pages/CampaignIndividual"));
const History = lazy(() => import("./Pages/History"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#16171d]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-[#1A9E83]"></div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  const { showLogin } = useContext(AppContext);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/all-campaigns" element={<AllCampaigns />} />
          <Route path="/campaign/:id" element={<CampaignIndividual />} />
          <Route path="/organiser/login" element={<OrganiserLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
