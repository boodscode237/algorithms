import React from "react";

// Navbar component
const Navbar = ({
  algorithmCategories,
  activeSection,
  handleNavLinkClick,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Header with logo and mobile menu button */}
        <div className="flex items-center justify-between py-4">
          <a
            href="#home"
            onClick={() => handleNavLinkClick("home")}
            className="text-white text-2xl md:text-3xl font-bold rounded-md px-3 py-2 transition duration-300 hover:bg-blue-500"
          >
            Explorateur d'Algorithmes
          </a>
          {/* Mobile menu button */}
          <button
            id="menu-button"
            className="text-white xl:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-4 6h4"
                }
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation links container */}
        <div
          id="nav-links"
          className={`${isMenuOpen ? "block" : "hidden"} xl:block pb-4 xl:pb-0`}
        >
          <div className="flex flex-col xl:flex-row xl:flex-wrap xl:gap-2 space-y-2 xl:space-y-0">
            {algorithmCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                onClick={() => handleNavLinkClick(category.id)}
                className={`nav-link text-white hover:bg-blue-500 px-3 py-2 rounded-md transition duration-300 text-sm xl:text-base whitespace-nowrap ${
                  activeSection === category.id ? "bg-blue-700 text-white" : ""
                }`}
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
