import React from "react";
import { Link } from "react-router-dom";
import landing from "@/assets/undraw_to-do_06xe.svg";

function LandingPage() {
  return (
    <div className="w-full h-screen space-x-10 flex items-center">
      <div className="w-2/4 h-auto">
        <img src={landing} alt="" className="w-full h-auto" />
      </div>
      <div className="w-2/4">
        <span className="tracking[2px] text-3xl text-center block w-full">
          Manage your{" "}
          <span className="text-[#6C63FF] font-bold tracking-[4px]">TASK</span>
        </span>
        <div className="w-full space-x-5 flex justify-center mt-8">
          <Link
            to="/auth/login"
            className="min-w-[150px] bg-[#2F2E41] cursor-pointer py-2 px-5 text-center text-white font-semibold tracking-[1px] rounded-sm"
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="min-w-[150px] bg-[#6c63ff] cursor-pointer py-2 px-5 text-center text-white font-semibold tracking-[1px] rounded-sm"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
