import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../images/logo.png";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-6 md:px-10 flex justify-between items-center relative z-10">
      <div className="flex">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop menu */}
      <div className="hidden md:flex flex-1 justify-center space-x-20">
        <a
          href="#about"
          className="text-white font-medium tracking-widest hover:text-turquoise transition-colors"
        >
          ABOUT
        </a>
        <a
          href="#informasi"
          className="text-white font-medium tracking-widest hover:text-turquoise transition-colors"
        >
          INFORMASI
        </a>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-dark-purple border-t border-purple-900 py-4 md:hidden">
          <div className="flex flex-col space-y-4 px-6">
            <a
              href="#about"
              className="text-white font-medium hover:text-turquoise transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </a>
            <a
              href="#model"
              className="text-white font-medium hover:text-turquoise transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              MODEL
            </a>
            <a
              href="#informasi"
              className="text-white font-medium hover:text-turquoise transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              INFORMASI
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
