import { logoutUser } from "@/actions/logoutUser";
import { ModeToggle } from "./mode-toggle";
import { useAuthContext } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

function Navbar() {
  const { user, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full justify-around py-3 shadow-sm mb-2">
      <div>
        <span className="font-semibold text-xl">Zigvy Test</span>
        <span> TODO</span>
      </div>
      <div className="flex items-center">
        <span>Hi, </span>
        <span className="font-semibold ">
          {!isLoading && user && user.firstName}
        </span>
        <span className="mx-2">|</span>
        <span className="cursor-pointer" onClick={handleLogout}>
          Logout
        </span>
      </div>

      <ModeToggle />
    </div>
  );
}

export default Navbar;
