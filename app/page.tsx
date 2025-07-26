"use client";
import React from "react";
import Image from "next/image";
import SuiviModal from "@/components/SuiviModal";
import { useState } from "react";
import SlideUpOnView from "@/components/SlideUpOnView";

type Ebook = { name: string; desc: string; img: string; linkpdf: string };

const freeEbooks: Ebook[] = [
  {
    name: "Le Pouvoir du Positif",
    desc: "Un guide pour développer un état d'esprit positif chez les enfants.",
    img: "/ebooks/free1.jpg",
    linkpdf: "/pdfs/free1.pdf",
  },
  {
    name: "Conseils pour apprendre",
    desc: "Un guide pour des bonnes pratiques d'etude a l'ecole et a la maison.",
    img: "/ebooks/free4.jpg",
    linkpdf: "/pdfs/conseil.docx",
  },
  {
    name: "Histoires du Soir",
    desc: "Des histoires courtes pour endormir les petits rêveurs.",
    img: "/ebooks/free2.jpg",
    linkpdf: "/pdfs/free2.pdf",
  },
  {
    name: "Découverte des Émotions",
    desc: "Apprendre à reconnaître et exprimer ses émotions.",
    img: "/ebooks/free3.jpg",
    linkpdf: "/pdfs/free3.pdf",
  },
];

const paidEbooks: Ebook[] = [
  {
    name: "Réussir à l'École",
    desc: "Stratégies pour aider votre enfant à s'épanouir à l'école.",
    img: "/ebooks/paid1.jpg",
    linkpdf: "/pdfs/paid1.pdf",
  },
  {
    name: "L'Art de la Confiance",
    desc: "Construire la confiance en soi dès le plus jeune âge.",
    img: "/ebooks/paid2.jpg",
    linkpdf: "/pdfs/paid2.pdf",
  },
  {
    name: "Petits Entrepreneurs",
    desc: "Initier les enfants à l'esprit d'entreprise.",
    img: "/ebooks/paid3.jpg",
    linkpdf: "/pdfs/paid3.pdf",
  },
  {
    name: "Mindset Gagnant",
    desc: "Développer un mental de champion chez les jeunes.",
    img: "/ebooks/paid4.jpg",
    linkpdf: "/pdfs/paid4.pdf",
  },
  {
    name: "Histoires Inspirantes",
    desc: "Des récits pour motiver et inspirer les enfants.",
    img: "/ebooks/paid5.jpg",
    linkpdf: "/pdfs/paid5.pdf",
  },
  {
    name: "Business Kids",
    desc: "Premiers pas dans le monde des affaires pour enfants.",
    img: "/ebooks/paid6.jpg",
    linkpdf: "/pdfs/paid6.pdf",
  },
];

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMotif, setModalMotif] = useState<"ebook" | "inscription">(
    "ebook"
  );

  // Ouvre le modal pour un ebook premium
  const handleBuyEbook = (ebookName: string) => {
    setModalTitle(ebookName);
    setModalMotif("ebook");
    setModalOpen(true);
  };

  // Ouvre le modal pour inscription
  const handleInscription = () => {
    setModalTitle("Inscription à la newsletter");
    setModalMotif("inscription");
    setModalOpen(true);
    setOpen(false);
  };

  const handleDownload = async (filename: string) => {
    // Appeler l'API pour signaler
    await fetch("/api/notify-download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename, email: "anonyme" }),
    });
  };

  return (
    <main className="bg-white text-black min-h-screen font-sans">
      {/* Responsive Header/Navbar */}
      <nav className="w-full bg-white/90 backdrop-blur border-b border-gray-200 fixed top-0 left-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo MiniMind"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
            <span className="font-bold text-2xl tracking-tight">MiniMind</span>
          </div>
          {/* Desktop menu */}
          <ul className="hidden md:flex gap-8 text-gray-700">
            <li>
              <a
                href="#free-ebooks"
                className="hover:text-black transition-colors text-lg font-light"
              >
                Ebooks gratuits
              </a>
            </li>
            <li>
              <a
                href="#premium-ebooks"
                className="hover:text-black transition-colors text-lg font-light"
              >
                Ebooks premium
              </a>
            </li>
            <li>
              <a
                href="#newsletter"
                className="hover:text-black transition-colors text-lg font-light"
              >
                Newsletter
              </a>
            </li>
          </ul>
          <button
            className="hidden md:inline-block bg-black text-white px-5 py-2 rounded-md shadow hover:bg-gray-900 transition-colors font-semibold"
            onClick={handleInscription}
          >
            S&apos;inscrire
          </button>
          {/* Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition"
            onClick={() => setOpen(!open)}
            aria-label="Ouvrir le menu"
          >
            <svg
              className="w-7 h-7 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white/95 backdrop-blur border-t border-gray-200 shadow">
            <ul className="flex flex-col items-center gap-6 py-6 text-gray-700 font-medium text-base">
              <li>
                <a
                  href="#free-ebooks"
                  className="hover:text-black transition-colors text-lg font-light"
                  onClick={() => setOpen(false)}
                >
                  Ebooks gratuits
                </a>
              </li>
              <li>
                <a
                  href="#premium-ebooks"
                  className="hover:text-black transition-colors text-lg font-light"
                  onClick={() => setOpen(false)}
                >
                  Ebooks premium
                </a>
              </li>
              <li>
                <a
                  href="#newsletter"
                  className="hover:text-black transition-colors text-lg font-light"
                  onClick={() => setOpen(false)}
                >
                  Newsletter
                </a>
              </li>

              <li>
                <button
                  className="bg-black text-white px-5 py-2 rounded-md shadow hover:bg-gray-900 transition-colors font-semibold"
                  onClick={handleInscription}
                >
                  S&apos;inscrire
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <div className="h-20 md:h-16" /> {/* Spacer for fixed navbar */}
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gray-100">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight uppercase">
          Ebooks : moins de phrases, plus de savoir.
        </h1>
        <p className="text-xl max-w-2xl mb-8 text-gray-700">
          Inspirez-vous, apprenez, divertissez vos enfants : nos ebooks
          éveillent les esprits et ouvrent de nouvelles façons de penser.
        </p>
        <button className="bg-black text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition">
          <a href="#premium-ebooks">Voir les ebooks</a>
        </button>
      </section>
      {/* Image entreprise façon bannière */}
      <section className="flex justify-center py-8">
        <Image
          src="/entreprise.png"
          alt="Image de l'entreprise"
          width={900}
          height={300}
          className="rounded-2xl shadow-xl object-cover"
        />
      </section>
      {/* Grille ebooks gratuits */}
      <section id="free-ebooks" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-12 uppercase tracking-wide">
          Ebooks gratuits à télécharger
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {freeEbooks.map((ebook, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-white border rounded-2xl shadow hover:shadow-2xl hover:scale-105 transition"
            >
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={ebook.img}
                  alt={ebook.name}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{ebook.name}</h3>
              <p className="text-gray-600 mb-4">{ebook.desc}</p>
              <a
                href={ebook.linkpdf}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
                onClick={() => {
                  handleDownload(ebook.name);
                }}
              >
                Télécharger gratuitement
              </a>
            </div>
          ))}
        </div>
      </section>
      {/* Grille ebooks payants */}
      <section id="premium-ebooks" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-12 uppercase tracking-wide">
          Ebooks premium
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {paidEbooks.map((ebook, idx) => (
            <SlideUpOnView key={idx} delay={100 * idx}>
              <div className="flex flex-col items-center text-center p-6 bg-white border rounded-2xl shadow hover:shadow-2xl hover:scale-105 transition">
                <div className="relative w-full h-64 mb-4">
                  <Image
                    src={ebook.img}
                    alt={ebook.name}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{ebook.name}</h3>
                <p className="text-gray-600 mb-4">{ebook.desc}</p>
                <button
                  className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
                  onClick={() => handleBuyEbook(ebook.name)}
                >
                  Acheter l&apos;ebook
                </button>
              </div>
            </SlideUpOnView>
          ))}
        </div>
      </section>
      {/* Call to Action Section */}
      <section id="newsletter" className="bg-gray-100 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 uppercase">
          Rejoignez la communauté MiniMind
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Inscrivez-vous pour recevoir les nouveautés et offres exclusives.
        </p>

        <button
          className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition"
          onClick={handleInscription}
        >
          S&apos;inscrire
        </button>
      </section>
      {/* Modal */}
      <SuiviModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        courseTitle={modalTitle}
        motif={modalMotif}
      />
    </main>
  );
}
