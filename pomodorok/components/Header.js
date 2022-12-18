import React from "react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState("hidden");

  function handleClick() {
    if (menuOpen === "hidden") {
      setMenuOpen("visible");
    }
    if (menuOpen === "visible") {
      setMenuOpen("hidden");
    }
  }

  return (
    <>
      <div>
        <div className="w-100 bg-slate-800 p-5 md:flex items-baseline justify-around">
          <button
            className="text-red-700 text-2xl md:hidden absolute right-0 mr-4 mt-1"
            onClick={handleClick}
          >
            X
          </button>
          <h1 className="text-3xl text-white font-bold">Pomodorok</h1>
          <ul className={`md:flex gap-10 text-2xl text-white mt-4 ${menuOpen}`}>
            <li className="mt-2">Home</li>
            <li className="mt-2">Statistics</li>
            <li className="mt-2">Settings</li>
          </ul>
        </div>
      </div>
    </>
  );
}
