import React from "react";

export default function Header() {
  return (
    <>
      <div className="w-100 bg-slate-800 p-5 flex items-baseline justify-around">
        <h1 className="text-3xl text-white font-bold">Pomodorok</h1>
        <ul className="flex gap-5 text-2xl text-white">
          <li>Home</li>
          <li>Statistics</li>
          <li>Settings</li>
        </ul>
      </div>
    </>
  );
}
