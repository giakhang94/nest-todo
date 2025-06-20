import { useAuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import Navbar from "@/components/ui/Navbar";
export const ProtectedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isLoading, isError } = useAuthContext();
  if (isLoading) {
    return <Loading />;
  } else {
    if (!user || isError) {
      return <Navigate to="/" />;
    }
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }
};
