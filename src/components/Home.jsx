import React from "react";

// Home page content component
const Home = () => {
  return (
    <section id="home" className="page-section">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6 text-center">
        Bienvenue sur l'Explorateur d'Algorithmes !
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed text-center">
        Explorez un large éventail d'algorithmes, des structures de données
        fondamentales aux concepts avancés de réseau et de cryptographie.
        Utilisez la barre de navigation ci-dessus pour plonger dans des sujets
        spécifiques.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-blue-800 mb-3">
            Apprendre et Comprendre
          </h3>
          <p className="text-gray-600">
            Plongez en profondeur dans la logique et les principes derrière
            chaque algorithme.
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-purple-800 mb-3">
            Visualiser les Concepts
          </h3>
          <p className="text-gray-600">
            Voyez comment les algorithmes fonctionnent étape par étape avec des
            explications claires.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-green-800 mb-3">
            Maîtriser les Structures de Données
          </h3>
          <p className="text-gray-600">
            Renforcez vos bases en listes chaînées, tableaux, arbres, et plus
            encore.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
