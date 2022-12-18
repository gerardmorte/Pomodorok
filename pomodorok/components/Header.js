import React from "react";
import { Navbar } from "flowbite-react";

export default function Header() {
  return (
    <Navbar className="bg-slate-800">
      <Navbar.Brand href="#">
        <h1 className="text-4xl text-white font-bold">Pomodorok</h1>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" active={true} className="text-2xl text-white">
          <h2>Home</h2>
        </Navbar.Link>
        <Navbar.Link href="#" className="text-2xl text-white">
          <h2>Statistics</h2>
        </Navbar.Link>
        <Navbar.Link href="#" className="text-2xl text-white">
          <h2>Settings</h2>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
