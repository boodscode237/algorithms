import React from "react";

const Recursion = () => {
  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Récursion</h1>
      <div className="bg-yellow-50 border-2 border-yellow-200 p-8 rounded-xl shadow-md">
        <p className="text-xl text-gray-700 mb-6">
          Cette section est en cours de développement.
        </p>
        <div className="inline-flex items-center justify-center gap-3 text-yellow-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-semibold">Contenu à venir prochainement</span>
        </div>
      </div>
    </div>
  );
};

export default Recursion;
