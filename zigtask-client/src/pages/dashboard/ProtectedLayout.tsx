import { useAuthContext } from "@/context/AuthContext";
import loading from "@/assets/loading.svg";
import { Navigate } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import Navbar from "@/components/ui/Navbar";
export const ProtectedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isLoading } = useAuthContext();
  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
