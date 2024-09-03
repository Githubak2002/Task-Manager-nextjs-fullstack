// components/NavBar.js
import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="p-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-xl font-black cursor-pointer logo ">
        Ak
      </Link>

      {/* Menu Items */}
      <div className="space-x-4">
        <Link
          href="#"
          className="cursor-pointer transition-all hover:font-bold"
        >
          Home
        </Link>
        <Link
          href="#"
          className="cursor-pointer transition-all hover:font-bold"
        >
          Contact
        </Link>
        <Link
          href="#"
          className="cursor-pointer transition-all hover:font-bold"
        >
          About
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
