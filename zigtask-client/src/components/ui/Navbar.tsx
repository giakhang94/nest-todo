import React from "react";
import { ModeToggle } from "./mode-toggle";

function Navbar() {
  return (
    <div className="flex w-full justify-around py-3 shadow-sm mb-2">
      <div>
        <span className="font-semibold text-xl">Zigvy Test</span>
        <span> TODO</span>
      </div>
      <p>Home</p>
      <ModeToggle />
      <div>name</div>
    </div>
  );
}

export default Navbar;
