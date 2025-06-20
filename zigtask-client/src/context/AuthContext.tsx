import { getCurrentUser } from "@/actions/getCurrentUser";
import type { InitState, User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

const initState: InitState = {
  user: undefined,
  isLoading: false,
  isAuthenticated: false,
  isError: false,
};

const AuthContext = createContext<InitState>(initState);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  return (
    <AuthContext.Provider
      value={{ user: data, isLoading, isAuthenticated: !!data, isError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
