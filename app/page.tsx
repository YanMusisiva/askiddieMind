"use client";
import React, { useState } from "react";
import Image from "next/image";

type City = "Paris" | "Lyon" | "Marseille" | "Lille";
type Product = { name: string; desc: string; img: string };

const productsByCity: Record<City, Product[]> = {
  Paris: [
    { name: "Nike Air Paris 1", desc: "Confort et style pour Paris.", img: "/paris1.jpg" },
    { name: "Nike Air Paris 2", desc: "Performance urbaine.", img: "/paris2.jpg" },
    { name: "Nike Air Paris 3", desc: "Design moderne.", img: "/paris3.jpg" },
    { name: "Nike Air Paris 4", desc: "Légèreté et élégance.", img: "/paris4.jpg" },
    { name: "Nike Air Paris 5", desc: "Pour tous les jours.", img: "/paris5.jpg" },
    { name: "Nike Air Paris 6", desc: "Édition limitée.", img: "/paris6.jpg" },
  ],
  Lyon: [
    { name: "Nike Air Lyon 1", desc: "Confort et style pour Lyon.", img: "/lyon1.jpg" },
    { name: "Nike Air Lyon 2", desc: "Performance urbaine.", img: "/lyon2.jpg" },
    { name: "Nike Air Lyon 3", desc: "Design moderne.", img: "/lyon3.jpg" },
    { name: "Nike Air Lyon 4", desc: "Légèreté et élégance.", img: "/lyon4.jpg" },
    { name: "Nike Air Lyon 5", desc: "Pour tous les jours.", img: "/lyon5.jpg" },
    { name: "Nike Air Lyon 6", desc: "Édition limitée.", img: "/lyon6.jpg" },
  ],
  Marseille: [
    { name: "Nike Air Marseille 1", desc: "Confort et style pour Marseille.", img: "/marseille1.jpg" },
    { name: "Nike Air Marseille 2", desc: "Performance urbaine.", img: "/marseille2.jpg" },
    { name: "Nike Air Marseille 3", desc: "Design moderne.", img: "/marseille3.jpg" },
    { name: "Nike Air Marseille 4", desc: "Légèreté et élégance.", img: "/marseille4.jpg" },
    { name: "Nike Air Marseille 5", desc: "Pour tous les jours.", img: "/marseille5.jpg" },
    { name: "Nike Air Marseille 6", desc: "Édition limitée.", img: "/marseille6.jpg" },
  ],
  Lille: [
    { name: "Nike Air Lille 1", desc: "Confort et style pour Lille.", img: "/lille1.jpg" },
    { name: "Nike Air Lille 2", desc: "Performance urbaine.", img: "/lille2.jpg" },
    { name: "Nike Air Lille 3", desc: "Design moderne.", img: "/lille3.jpg" },
    { name: "Nike Air Lille 4", desc: "Légèreté et élégance.", img: "/lille4.jpg" },
    { name: "Nike Air Lille 5", desc: "Pour tous les jours.", img: "/lille5.jpg" },
    { name: "Nike Air Lille 6", desc: "Édition limitée.", img: "/lille6.jpg" },
  ],
};

export default function Home() {
  const [city, setCity] = useState<City>("Paris");
  const products = productsByCity[city];

  return (
    <main className="bg-white text-black min-h-screen font-sans">
      {/* Header façon Nike */}
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo entreprise"
            width={60}
            height={60}
            className="object-contain"
            priority
          />
          <span className="font-bold text-2xl tracking-tight">NIKE</span>
        </div>
        <nav>
          <select
            value={city}
            onChange={e => setCity(e.target.value as City)}
            className="border rounded-full px-4 py-2 text-lg text-black bg-white shadow focus:outline-none focus:ring-2 focus:ring-black transition"
          >
            <option value="Paris">Paris</option>
            <option value="Lyon">Lyon</option>
            <option value="Marseille">Marseille</option>
            <option value="Lille">Lille</option>
          </select>
        </nav>
      </header>

      {/* Hero Section façon Nike */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gray-100">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight uppercase">Just Do It.</h1>
        <p className="text-xl max-w-2xl mb-8 text-gray-700">
          Découvrez la nouvelle collection Nike, pensée pour la performance et le style dans votre ville.
        </p>
        <button className="bg-black text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition">
          Acheter maintenant
        </button>
      </section>

      {/* Image entreprise façon bannière */}
      <section className="flex justify-center py-8">
        <Image
          src="/entreprise.jpg"
          alt="Image de l'entreprise"
          width={900}
          height={300}
          className="rounded-2xl shadow-xl object-cover"
        />
      </section>

      {/* Produit vedette */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-12 py-12 px-4 max-w-6xl mx-auto">
        <div className="w-full md:w-1/2">
          <Image
            src={products[0].img}
            alt="Produit vedette"
            width={700}
            height={500}
            className="rounded-2xl shadow-xl"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-4xl font-bold">{products[0].name}</h2>
          <p className="text-gray-700 text-lg">{products[0].desc}</p>
          <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition w-max">
            Découvrir
          </button>
        </div>
      </section>

      {/* Grille produits */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-12 uppercase tracking-wide">Notre sélection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-white border rounded-2xl shadow hover:shadow-2xl hover:scale-105 transition"
            >
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.desc}</p>
              <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition">
                Voir le produit
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-100 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 uppercase">Rejoignez la communauté Nike</h2>
        <p className="text-lg text-gray-700 mb-6">
          Inscrivez-vous pour recevoir les nouveautés et offres exclusives.
        </p>
        <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition">
          S'inscrire
        </button>
      </section>
    </main>
  );
}