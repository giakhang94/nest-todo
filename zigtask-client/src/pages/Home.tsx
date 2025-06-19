import { useAuthContext } from "@/context/AuthContext";
import loading from "@/assets/loading.svg";
import LandingPage from "@/components/ui/LandingPage";
import { ProtectedLayout } from "./dashboard/ProtectedLayout";
import Task from "./dashboard/Task";
import { Navigate } from "react-router-dom";
function Home() {
  const state = useAuthContext();
  const { user, isLoading } = state;
  if (isLoading) {
    return (
      <div className="relative">
        <div className="backdrop-blur-md w-full h-full opacity-25">
          <LandingPage />
        </div>
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <img src={loading} alt="" />
        </div>
      </div>
    );
  } else {
    if (user) {
      return <Navigate to="/dashboard/tasks" />;
    } else {
      return <LandingPage />;
    }
  }
}

export default Home;
