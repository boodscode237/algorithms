import React from "react";

// Footer component
const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-6 text-center mt-auto">
      <p>
        &copy; {currentYear} Explorateur d'Algorithmes. Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
