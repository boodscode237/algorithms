import React, { useState, useEffect, useRef } from "react";

const NumericalAlgorithms = () => {
  // États pour les différentes sections interactives
  const [activeSection, setActiveSection] = useState("lcg");
  const [lcgSeed, setLcgSeed] = useState(12345);
  const [lcgSequence, setLcgSequence] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [randomizedArray, setRandomizedArray] = useState([]);
  const [walkSteps, setWalkSteps] = useState(100);
  const [walkPath, setWalkPath] = useState([]);
  const [isWalking, setIsWalking] = useState(false);
  const [gcdA, setGcdA] = useState(48);
  const [gcdB, setGcdB] = useState(18);
  const [gcdResult, setGcdResult] = useState(null);
  const [expBase, setExpBase] = useState(2);
  const [expExponent, setExpExponent] = useState(10);
  const [expResult, setExpResult] = useState(null);

  const canvasRef = useRef(null);

  // Générateur Congruentiel Linéaire (LCG)
  // Complexité temporelle: O(n) où n est le nombre de valeurs à générer
  // Complexité spatiale: O(n) pour stocker la séquence
  const generateLCGSequence = () => {
    const startTime = performance.now();

    // Paramètres standards du LCG (utilisés par glibc)
    const a = 1664525; // Multiplicateur
    const c = 1013904223; // Incrément
    const m = Math.pow(2, 32); // Module (2^32)
    let x = lcgSeed; // Graine initiale
    const sequence = [];

    // Génération de 20 nombres pseudo-aléatoires
    for (let i = 0; i < 20; i++) {
      x = (a * x + c) % m; // Formule LCG: X(n+1) = (a*X(n) + c) mod m
      sequence.push(x);
    }

    const endTime = performance.now();
    console.log(`LCG généré en ${(endTime - startTime).toFixed(4)}ms`);
    setLcgSequence(sequence);
  };

  // Mélange de tableau (Fisher-Yates)
  // Complexité temporelle: O(n) - chaque élément est visité une seule fois
  // Complexité spatiale: O(1) - mélange en place, pas d'espace supplémentaire
  const melangerTableau = () => {
    const startTime = performance.now();

    // Créer un tableau ordonné de 1 à arraySize
    const tableau = Array.from({ length: arraySize }, (_, i) => i + 1);

    // Algorithme de Fisher-Yates (version moderne)
    for (let i = tableau.length - 1; i > 0; i--) {
      // Choisir un index aléatoire entre 0 et i (inclus)
      const j = Math.floor(Math.random() * (i + 1));

      // Échanger les éléments aux positions i et j
      [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
    }

    const endTime = performance.now();
    console.log(
      `Mélange Fisher-Yates terminé en ${(endTime - startTime).toFixed(4)}ms`
    );
    setRandomizedArray(tableau);
  };

  // Marche aléatoire 2D
  // Complexité temporelle: O(n) où n est le nombre de pas
  // Complexité spatiale: O(n) pour stocker le chemin complet
  const genererMarcheAleatoire = () => {
    const startTime = performance.now();
    setIsWalking(true);

    // Initialiser le chemin avec la position de départ (0,0)
    const chemin = [{ x: 0, y: 0 }];
    let x = 0,
      y = 0;

    // Effectuer walkSteps pas aléatoires
    for (let i = 0; i < walkSteps; i++) {
      // Choisir une direction aléatoire (0=haut, 1=bas, 2=droite, 3=gauche)
      const direction = Math.floor(Math.random() * 4);

      // Mettre à jour la position selon la direction choisie
      switch (direction) {
        case 0:
          y++;
          break; // Haut: augmenter y
        case 1:
          y--;
          break; // Bas: diminuer y
        case 2:
          x++;
          break; // Droite: augmenter x
        case 3:
          x--;
          break; // Gauche: diminuer x
      }

      // Enregistrer la nouvelle position dans le chemin
      chemin.push({ x, y });
    }

    const endTime = performance.now();
    console.log(
      `Marche aléatoire de ${walkSteps} pas générée en ${(
        endTime - startTime
      ).toFixed(4)}ms`
    );

    setWalkPath(chemin);
    setTimeout(() => setIsWalking(false), 500);
  };

  // Dessiner la marche aléatoire
  useEffect(() => {
    if (walkPath.length > 0 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Trouver les limites
      const minX = Math.min(...walkPath.map((p) => p.x));
      const maxX = Math.max(...walkPath.map((p) => p.x));
      const minY = Math.min(...walkPath.map((p) => p.y));
      const maxY = Math.max(...walkPath.map((p) => p.y));

      const scaleX = (width - 40) / Math.max(maxX - minX, 1);
      const scaleY = (height - 40) / Math.max(maxY - minY, 1);
      const scale = Math.min(scaleX, scaleY, 10);

      const offsetX = width / 2 - ((minX + maxX) * scale) / 2;
      const offsetY = height / 2 - ((minY + maxY) * scale) / 2;

      // Dessiner le chemin
      ctx.strokeStyle = "#3B82F6";
      ctx.lineWidth = 2;
      ctx.beginPath();

      walkPath.forEach((point, index) => {
        const x = point.x * scale + offsetX;
        const y = point.y * scale + offsetY;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Marquer le début et la fin
      if (walkPath.length > 0) {
        const start = walkPath[0];
        const end = walkPath[walkPath.length - 1];

        // Point de départ (vert)
        ctx.fillStyle = "#10B981";
        ctx.beginPath();
        ctx.arc(
          start.x * scale + offsetX,
          start.y * scale + offsetY,
          5,
          0,
          2 * Math.PI
        );
        ctx.fill();

        // Point d'arrivée (rouge)
        ctx.fillStyle = "#EF4444";
        ctx.beginPath();
        ctx.arc(
          end.x * scale + offsetX,
          end.y * scale + offsetY,
          5,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }, [walkPath]);

  // Calcul du PGCD (Algorithme d'Euclide)
  // Complexité temporelle: O(log(min(a,b))) - très efficace même pour de grands nombres
  // Complexité spatiale: O(log(min(a,b))) pour stocker les étapes (O(1) sans stockage)
  const calculerPGCD = () => {
    const startTime = performance.now();

    let a = gcdA;
    let b = gcdB;
    const etapes = [];
    let iterations = 0;

    // Algorithme d'Euclide: PGCD(a,b) = PGCD(b, a mod b)
    while (b !== 0) {
      iterations++;
      etapes.push(`Étape ${iterations}: PGCD(${a}, ${b}) → a mod b = ${a % b}`);

      const temp = b;
      b = a % b; // Reste de la division euclidienne
      a = temp; // L'ancien diviseur devient le nouveau dividende
    }

    const endTime = performance.now();
    console.log(
      `PGCD calculé en ${iterations} itérations, temps: ${(
        endTime - startTime
      ).toFixed(4)}ms`
    );

    setGcdResult({ resultat: a, etapes, iterations });
  };

  // Exponentiation rapide (Fast Exponentiation)
  // Complexité temporelle: O(log n) au lieu de O(n) - amélioration exponentielle !
  // Complexité spatiale: O(log n) pour stocker les étapes (O(1) sans stockage)
  const exponentiationRapide = () => {
    const startTime = performance.now();

    let base = expBase;
    let exp = expExponent;
    let resultat = 1;
    const etapes = [];
    let iterations = 0;

    // Algorithme d'exponentiation binaire
    while (exp > 0) {
      iterations++;

      // Si l'exposant est impair, multiplier le résultat par la base actuelle
      if (exp % 2 === 1) {
        resultat *= base;
        etapes.push(
          `Étape ${iterations}: Exposant impair → Résultat = ${resultat}`
        );
      }

      // Élever la base au carré et diviser l'exposant par 2
      base *= base;
      exp = Math.floor(exp / 2);

      if (exp > 0) {
        etapes.push(`Base = ${base}, Exposant restant = ${exp}`);
      }
    }

    const endTime = performance.now();
    console.log(
      `Exponentiation rapide calculée en ${iterations} itérations, temps: ${(
        endTime - startTime
      ).toFixed(4)}ms`
    );

    setExpResult({ resultat, etapes, iterations });
  };

  const sections = [
    { id: "lcg", nom: "Générateur LCG", couleur: "blue" },
    { id: "shuffle", nom: "Mélange de Tableau", couleur: "green" },
    { id: "walk", nom: "Marche Aléatoire", couleur: "purple" },
    { id: "gcd", nom: "PGCD", couleur: "orange" },
    { id: "exp", nom: "Exponentiation", couleur: "red" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Explorateur d'Algorithmes Numériques
      </h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
        <p className="text-lg text-gray-700">
          Découvrez les algorithmes numériques fondamentaux à travers des
          démonstrations interactives. Explorez la génération de nombres
          aléatoires, les marches aléatoires, et les calculs mathématiques
          essentiels.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              activeSection === section.id
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            {section.nom}
          </button>
        ))}
      </div>

      {/* Section LCG */}
      {activeSection === "lcg" && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-200">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Générateur Congruentiel Linéaire (LCG)
          </h2>

          {/* Explication détaillée */}
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              💡 Processus de Réflexion
            </h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-blue-700">
                  1. Le Problème :
                </h4>
                <p>
                  Comment générer des nombres qui semblent aléatoires mais sont
                  reproductibles ? Les vrais nombres aléatoires sont difficiles
                  à obtenir par ordinateur.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700">2. L'Idée :</h4>
                <p>
                  Utiliser une formule mathématique déterministe qui produit une
                  séquence qui "semble" aléatoire. Si on connaît la graine
                  (seed), on peut reproduire la même séquence.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700">3. La Formule :</h4>
                <p>
                  <strong>X(n+1) = (a × X(n) + c) mod m</strong>
                </p>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>
                    <strong>a</strong> = multiplicateur (1664525)
                  </li>
                  <li>
                    <strong>c</strong> = incrément (1013904223)
                  </li>
                  <li>
                    <strong>m</strong> = module (2³²)
                  </li>
                  <li>
                    <strong>X(0)</strong> = graine initiale
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700">
                  4. Pourquoi ça marche :
                </h4>
                <p>
                  L'opération modulo crée un cycle, et les bonnes valeurs de a,
                  c, m garantissent une période longue avant répétition.
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            Le LCG est un algorithme simple pour générer des nombres
            pseudo-aléatoires. Il utilise la formule : X(n+1) = (a × X(n) + c)
            mod m
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graine initiale (seed):
              </label>
              <input
                type="number"
                value={lcgSeed}
                onChange={(e) => setLcgSeed(parseInt(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={generateLCGSequence}
                className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Générer Séquence
              </button>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3">
                Séquence générée:
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                {lcgSequence.length > 0 ? (
                  lcgSequence.map((num, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      X({index + 1}) = {num}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    Cliquez pour générer une séquence
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Mélange */}
      {activeSection === "shuffle" && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-green-200">
          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Mélange de Tableau (Fisher-Yates)
          </h2>

          {/* Explication détaillée */}
          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              💡 Processus de Réflexion
            </h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-green-700">
                  1. Le Problème :
                </h4>
                <p>
                  Comment mélanger un tableau de façon vraiment aléatoire ? Un
                  mélange naïf pourrait créer des biais.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-700">
                  2. L'Intuition :
                </h4>
                <p>
                  Pour chaque position, choisir aléatoirement un élément parmi
                  ceux qui restent à placer.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-700">
                  3. L'Algorithme :
                </h4>
                <div className="bg-white p-4 rounded border-l-4 border-green-400 mt-2">
                  <p className="font-mono text-sm">
                    <strong>Pour i de n-1 à 1 :</strong>
                    <br />
                    &nbsp;&nbsp;j = nombre aléatoire entre 0 et i<br />
                    &nbsp;&nbsp;échanger tableau[i] et tableau[j]
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-green-700">
                  4. Pourquoi ça marche :
                </h4>
                <p>
                  Chaque permutation a exactement la même probabilité (1/n!)
                  d'être générée. C'est mathématiquement prouvé !
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-700">
                  5. Complexité :
                </h4>
                <p>O(n) en temps, O(1) en espace supplémentaire - optimal !</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            L'algorithme de Fisher-Yates permet de mélanger aléatoirement les
            éléments d'un tableau de manière uniforme et efficace.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taille du tableau:
              </label>
              <input
                type="range"
                min="5"
                max="20"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                className="w-full mb-2"
              />
              <div className="text-center text-gray-600 mb-4">
                Taille: {arraySize}
              </div>
              <button
                onClick={melangerTableau}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Mélanger Tableau
              </button>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3">
                Tableau mélangé:
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {randomizedArray.length > 0 ? (
                    randomizedArray.map((num, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {num}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      Cliquez pour mélanger un tableau
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Marche Aléatoire */}
      {activeSection === "walk" && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-200">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            Explorateur de Marche Aléatoire 2D
          </h2>

          {/* Explication détaillée */}
          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              💡 Processus de Réflexion
            </h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-purple-700">
                  1. Le Concept :
                </h4>
                <p>
                  Imaginez une particule qui se déplace aléatoirement dans un
                  plan. À chaque étape, elle choisit une direction au hasard.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700">
                  2. L'Algorithme :
                </h4>
                <div className="bg-white p-4 rounded border-l-4 border-purple-400 mt-2">
                  <p className="font-mono text-sm">
                    <strong>Initialiser :</strong> position = (0, 0)
                    <br />
                    <strong>Pour chaque pas :</strong>
                    <br />
                    &nbsp;&nbsp;direction = aléatoire(0, 1, 2, 3)
                    <br />
                    &nbsp;&nbsp;si direction = 0 : y = y + 1 (haut)
                    <br />
                    &nbsp;&nbsp;si direction = 1 : y = y - 1 (bas)
                    <br />
                    &nbsp;&nbsp;si direction = 2 : x = x + 1 (droite)
                    <br />
                    &nbsp;&nbsp;si direction = 3 : x = x - 1 (gauche)
                    <br />
                    &nbsp;&nbsp;enregistrer nouvelle position
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700">
                  3. Propriétés Fascinantes :
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <strong>Distance moyenne :</strong> √n après n pas
                  </li>
                  <li>
                    <strong>Récurrence :</strong> En 2D, retour à l'origine
                    garanti !
                  </li>
                  <li>
                    <strong>Fractale :</strong> Le chemin a une dimension
                    fractale
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700">
                  4. Applications :
                </h4>
                <p>
                  Diffusion moléculaire, mouvement brownien, modèles financiers,
                  algorithmes de recherche.
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            Une marche aléatoire 2D où chaque pas se fait dans une direction
            aléatoire (haut, bas, gauche, droite). Observez les motifs
            imprévisibles qui émergent !
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de pas: {walkSteps}
              </label>
              <input
                type="range"
                min="10"
                max="500"
                value={walkSteps}
                onChange={(e) => setWalkSteps(parseInt(e.target.value))}
                className="w-full mb-4"
              />
              <button
                onClick={genererMarcheAleatoire}
                disabled={isWalking}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isWalking
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-purple-500 text-white hover:bg-purple-600"
                }`}
              >
                {isWalking ? "Génération..." : "Générer Marche Aléatoire"}
              </button>

              {walkPath.length > 0 && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-2">
                    Statistiques:
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Pas total: {walkPath.length - 1}</div>
                    <div>
                      Position finale: ({walkPath[walkPath.length - 1]?.x},{" "}
                      {walkPath[walkPath.length - 1]?.y})
                    </div>
                    <div>
                      Distance de l'origine:{" "}
                      {walkPath.length > 0
                        ? Math.sqrt(
                            Math.pow(walkPath[walkPath.length - 1].x, 2) +
                              Math.pow(walkPath[walkPath.length - 1].y, 2)
                          ).toFixed(2)
                        : 0}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3">
                Visualisation:
              </h4>
              <canvas
                ref={canvasRef}
                width={400}
                height={300}
                className="border border-gray-300 rounded-lg bg-gray-50 w-full"
              />
              <div className="mt-2 text-xs text-gray-500 flex justify-between">
                <span>🟢 Début</span>
                <span>🔴 Fin</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section PGCD */}
      {activeSection === "gcd" && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-200">
          <h2 className="text-3xl font-bold text-orange-700 mb-6">
            Calcul du PGCD (Algorithme d'Euclide)
          </h2>

          {/* Explication détaillée */}
          <div className="bg-orange-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-orange-800 mb-4">
              💡 Processus de Réflexion
            </h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-orange-700">
                  1. Le Problème :
                </h4>
                <p>
                  Trouver le plus grand nombre qui divise exactement deux
                  nombres donnés. Méthode naïve : tester tous les nombres de 1 à
                  min(a,b) - très lent !
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700">
                  2. L'Insight d'Euclide :
                </h4>
                <p>
                  Si d divise a et b, alors d divise aussi (a - b). Donc
                  PGCD(a,b) = PGCD(b, a mod b).
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700">
                  3. L'Algorithme :
                </h4>
                <div className="bg-white p-4 rounded border-l-4 border-orange-400 mt-2">
                  <p className="font-mono text-sm">
                    <strong>Tant que b ≠ 0 :</strong>
                    <br />
                    &nbsp;&nbsp;temp = b<br />
                    &nbsp;&nbsp;b = a mod b<br />
                    &nbsp;&nbsp;a = temp
                    <br />
                    <strong>Retourner a</strong>
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700">4. Exemple :</h4>
                <p>
                  PGCD(48, 18) → PGCD(18, 12) → PGCD(12, 6) → PGCD(6, 0) = 6
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700">
                  5. Complexité :
                </h4>
                <p>
                  O(log min(a,b)) - extrêmement efficace ! Utilisé depuis
                  l'Antiquité.
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            L'algorithme d'Euclide trouve efficacement le Plus Grand Commun
            Diviseur de deux nombres en utilisant des divisions successives.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Premier nombre (a):
                  </label>
                  <input
                    type="number"
                    value={gcdA}
                    onChange={(e) => setGcdA(parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deuxième nombre (b):
                  </label>
                  <input
                    type="number"
                    value={gcdB}
                    onChange={(e) => setGcdB(parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <button
                  onClick={calculerPGCD}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Calculer PGCD
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3">
                Résultat et étapes:
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                {gcdResult ? (
                  <div>
                    <div className="text-lg font-bold text-orange-700 mb-3">
                      PGCD({gcdA}, {gcdB}) = {gcdResult.resultat}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      {gcdResult.etapes.map((etape, index) => (
                        <div key={index}>{etape}</div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Cliquez pour calculer le PGCD</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Exponentiation */}
      {activeSection === "exp" && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200">
          <h2 className="text-3xl font-bold text-red-700 mb-6">
            Exponentiation Rapide
          </h2>

          {/* Explication détaillée */}
          <div className="bg-red-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-red-800 mb-4">
              💡 Processus de Réflexion
            </h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-red-700">1. Le Problème :</h4>
                <p>
                  Calculer a^n naïvement nécessite n multiplications. Pour de
                  grandes valeurs de n, c'est très lent !
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700">
                  2. L'Insight Clé :
                </h4>
                <p>
                  Si n est pair : a^n = (a^(n/2))^2
                  <br />
                  Si n est impair : a^n = a × a^(n-1)
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700">
                  3. L'Algorithme :
                </h4>
                <div className="bg-white p-4 rounded border-l-4 border-red-400 mt-2">
                  <p className="font-mono text-sm">
                    <strong>résultat = 1</strong>
                    <br />
                    <strong>Tant que n &gt; 0 :</strong>
                    <br />
                    &nbsp;&nbsp;si n est impair : résultat *= base
                    <br />
                    &nbsp;&nbsp;base = base * base
                    <br />
                    &nbsp;&nbsp;n = n / 2<br />
                    <strong>Retourner résultat</strong>
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-red-700">
                  4. Exemple (2^10) :
                </h4>
                <p>
                  2^10 → 4^5 → 4×16^2 → 4×256^1 → 4×256 = 1024
                  <br />
                  Seulement 4 étapes au lieu de 10 !
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700">5. Complexité :</h4>
                <p>O(log n) au lieu de O(n) - amélioration exponentielle !</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            L'exponentiation rapide calcule a^n efficacement en O(log n) en
            utilisant la propriété que a^n = (a^(n/2))^2 quand n est pair.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base (a):
                  </label>
                  <input
                    type="number"
                    value={expBase}
                    onChange={(e) => setExpBase(parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exposant (n):
                  </label>
                  <input
                    type="number"
                    value={expExponent}
                    onChange={(e) =>
                      setExpExponent(parseInt(e.target.value) || 0)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button
                  onClick={exponentiationRapide}
                  className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Calculer {expBase}^{expExponent}
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3">
                Résultat et étapes:
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                {expResult ? (
                  <div>
                    <div className="text-lg font-bold text-red-700 mb-3">
                      {expBase}^{expExponent} = {expResult.resultat}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      {expResult.etapes.map((etape, index) => (
                        <div key={index}>{etape}</div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Cliquez pour calculer l'exponentiation
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumericalAlgorithms;
