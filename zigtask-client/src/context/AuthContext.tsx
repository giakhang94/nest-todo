import { getCurrentUser } from "@/actions/getCurrentUser";
import type { InitState, User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

const initState: InitState = {
  user: undefined,
  isLoading: false,
  isAuthenticated: false,
};

const AuthContext = createContext<InitState>(initState);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isLoading } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
  console.log(data);

  return (
    <AuthContext.Provider
      value={{ user: data, isLoading, isAuthenticated: !!data }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
