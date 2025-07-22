import React from "react";

// Generic Section component for algorithm pages
const Section = ({ id, title }) => {
  return (
    <section id={id} className="page-section">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-700">Le contenu pour {title} sera ici.</p>
    </section>
  );
};

export default Section;
