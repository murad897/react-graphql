import React from "react";
import Link from "next/link";
import { navLinks } from "./Navlinks";

const Navigation = () => {
  return (
    <div className="navigation-container">
      <nav>
        {navLinks.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.path}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
