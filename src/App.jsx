import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

// Import all page components
import NumericalAlgorithms from "./components/pages/NumericalAlgorithms";
import LinkedLists from "./components/pages/LinkedLists";
import Arrays from "./components/pages/Arrays";
import StacksAndQueues from "./components/pages/StacksAndQueues";
import Sorting from "./components/pages/Sorting";
import Searching from "./components/pages/Searching";
import HashTables from "./components/pages/HashTables";
import Recursion from "./components/pages/Recursion";
import Trees from "./components/pages/Trees";
import BalancedTrees from "./components/pages/BalancedTrees";
import DecisionTrees from "./components/pages/DecisionTrees";
import BasicNetworkAlgorithms from "./components/pages/BasicNetworkAlgorithms";
import MoreNetworkAlgorithms from "./components/pages/MoreNetworkAlgorithms";
import StringAlgorithms from "./components/pages/StringAlgorithms";
import Cryptography from "./components/pages/Cryptography";
import ComplexityTheory from "./components/pages/ComplexityTheory";
import DistributedAlgorithms from "./components/pages/DistributedAlgorithms";

// Main App component that manages state and renders other components
const App = () => {
  // State to manage the currently active section
  const [activeSection, setActiveSection] = useState("home");
  // State to manage the mobile navigation menu visibility (managed in Navbar)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define the list of algorithm categories with useMemo to prevent recreation on each render
  const algorithmCategories = useMemo(
    () => [
      { id: "numerical-algorithms", name: "Algorithmes Numériques" },
      { id: "linked-lists", name: "Listes Chaînées" },
      { id: "arrays", name: "Tableaux" },
      { id: "stacks-and-queues", name: "Piles et Files" },
      { id: "sorting", name: "Tri" },
      { id: "searching", name: "Recherche" },
      { id: "hash-tables", name: "Tables de Hachage" },
      { id: "recursion", name: "Récursion" },
      { id: "trees", name: "Arbres" },
      { id: "balanced-trees", name: "Arbres Équilibrés" },
      { id: "decision-trees", name: "Arbres de Décision" },
      {
        id: "basic-network-algorithms",
        name: "Algorithmes de Réseau Basiques",
      },
      { id: "more-network-algorithms", name: "Plus d'Algorithmes de Réseau" },
      { id: "string-algorithms", name: "Algorithmes de Chaînes de Caractères" },
      { id: "cryptography", name: "Cryptographie" },
      { id: "complexity-theory", name: "Théorie de la Complexité" },
      { id: "distributed-algorithms", name: "Algorithmes Distribués" },
    ],
    []
  );

  // Effect to handle initial URL hash and scroll to section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (
        hash &&
        (algorithmCategories.some((cat) => cat.id === hash) || hash === "home")
      ) {
        setActiveSection(hash);
        // Scroll to the section if it's not the home page on initial load
        if (hash !== "home") {
          document
            .getElementById(hash)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        setActiveSection("home"); // Default to home if hash is invalid or missing
      }
    };

    // Listen for hash changes (e.g., back/forward button)
    window.addEventListener("hashchange", handleHashChange);

    // Initial check on component mount
    handleHashChange();

    // Cleanup listener
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [algorithmCategories]); // Re-run if categories change (though unlikely in this static example)

  // Function to handle navigation link clicks
  const handleNavLinkClick = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false); // Close mobile menu on click
    window.history.pushState(null, "", `#${id}`); // Update URL hash
    // Scroll to the section if it's not the home page
    if (id !== "home") {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col font-sans">
      {/* Navbar component */}
      <Navbar
        algorithmCategories={algorithmCategories}
        activeSection={activeSection}
        handleNavLinkClick={handleNavLinkClick}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main content area */}
      <main className="flex-grow container mx-auto p-8 bg-white shadow-lg rounded-lg my-8">
        {/* Home section */}
        {activeSection === "home" && <Home />}

        {/* Dynamic rendering of algorithm pages */}
        {activeSection === "numerical-algorithms" && <NumericalAlgorithms />}
        {activeSection === "linked-lists" && <LinkedLists />}
        {activeSection === "arrays" && <Arrays />}
        {activeSection === "stacks-and-queues" && <StacksAndQueues />}
        {activeSection === "sorting" && <Sorting />}
        {activeSection === "searching" && <Searching />}
        {activeSection === "hash-tables" && <HashTables />}
        {activeSection === "recursion" && <Recursion />}
        {activeSection === "trees" && <Trees />}
        {activeSection === "balanced-trees" && <BalancedTrees />}
        {activeSection === "decision-trees" && <DecisionTrees />}
        {activeSection === "basic-network-algorithms" && (
          <BasicNetworkAlgorithms />
        )}
        {activeSection === "more-network-algorithms" && (
          <MoreNetworkAlgorithms />
        )}
        {activeSection === "string-algorithms" && <StringAlgorithms />}
        {activeSection === "cryptography" && <Cryptography />}
        {activeSection === "complexity-theory" && <ComplexityTheory />}
        {activeSection === "distributed-algorithms" && (
          <DistributedAlgorithms />
        )}
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default App;
