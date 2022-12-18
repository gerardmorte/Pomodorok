import React from "react";
import { useState } from "react";
import Hamburger from "hamburger-react";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div>
        <div className="w-100 bg-slate-800 p-5 md:flex items-center justify-around">
          <div className="md:hidden absolute right-0 mr-4">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>

          <h1 className="text-3xl text-white font-bold mt-1">Pomodorok</h1>
          <ul
            className={`md:flex gap-10 text-2xl text-white ${
              isOpen === false ? "hidden" : "visible"
            }`}
          >
            <li className="mt-2">Home</li>
            <li className="mt-2">Statistics</li>
            <li className="mt-2">Settings</li>
          </ul>
        </div>
      </div>
    </>
  );
}
