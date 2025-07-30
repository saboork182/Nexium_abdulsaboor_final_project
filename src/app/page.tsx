'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function RecipeMainPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const recipes = [
    {
      name: 'Chicken Curry',
      image: '/images/recipes/curry.jpg',
    },
    {
      name: 'Pasta Alfredo',
      image: '/images/recipes/Alfredo.jpg',
    },
    {
      name: 'Chocolate Cake',
      image: '/images/recipes/chocolate-cake.jpg',
    },
    {
      name: 'Veggie Stir Fry',
      image: '/images/recipes/veggie.jpg',
    },
    {
      name: 'Fruit Salad',
      image: '/images/recipes/salad.jpg',
    },
    {
      name: 'Grilled Sandwich',
      image: '/images/recipes/sandwich.jpg',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white relative">
        <h1 className="text-2xl font-bold">Recipe Generator</h1>

        {/* Menu Button */}
        <div className="relative">
          <button onClick={toggleMenu} className="p-2 rounded hover:bg-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md z-10">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* Categories */}
      <section className="flex justify-center gap-3 py-6 px-4 flex-wrap">
        {['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'].map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full bg-green-100 text-green-800 font-medium hover:bg-green-200"
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Recipe Cards */}
      <main className="flex-1 px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {recipes.map((recipe, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow hover:shadow-md transition border overflow-hidden"
          >
            <div className="relative w-full h-48">
              <Image
                src={recipe.image}
                alt={recipe.name}
                layout="fill" // Important
                objectFit="cover" // Ensures it fills nicely
                priority={i < 3} // Improves loading for first images
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{recipe.name}</h3>
              <p className="text-sm text-gray-600">
                A quick and delicious {recipe.name.toLowerCase()} recipe to try at home.
              </p>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-10 p-4 text-center text-sm text-gray-500 border-t">
        &copy; {new Date().getFullYear()} Recipe Generator. All rights reserved.
      </footer>
    </div>
  );
}