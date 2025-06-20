import React from "react";
import loading from "@/assets/loading.svg";
function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img src={loading} alt="" />
    </div>
  );
}

export default Loading;
