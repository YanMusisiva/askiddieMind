"use client";
import { useState, useEffect } from "react";

interface SuiviModalProps {
  open: boolean;
  onClose: () => void;
  courseTitle: string;
  motif?: "ebook" | "inscription";
  onSuccess?: () => void;
}

export default function SuiviModal({
  open,
  onClose,
  courseTitle,
  motif = "ebook",
  onSuccess,
}: SuiviModalProps) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSent(false);
      setEmail("");
      setError(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      setError("Email invalide.");
      setSending(false);
      return;
    }
    try {
      // Envoi à ton backend (à adapter selon ton API)
      const res = await fetch("/api/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          course: courseTitle,
          motif,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      setSent(true);
      setEmail("");
      if (onSuccess) onSuccess();
    } catch {
      setError("Impossible d'envoyer la demande.");
    }
    setSending(false);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white text-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-300 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-gray-800"
          aria-label="Fermer"
        >
          ×
        </button>
        <h3 className="text-3xl font-bold mb-4  ">
          {motif === "inscription"
            ? "Inscription à la newsletter"
            : `Achat ebook : ${courseTitle}`}
        </h3>
        {sent ? (
          <div className="text-green-500 font-semibold text-center">
            Merci, vous recevrez bientôt nos informations !
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Votre email"
              className="bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-800 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={sending}
              autoFocus
            />
            <button
              type="submit"
              disabled={sending}
              className="  hover:border-white bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              {sending
                ? "Envoi..."
                : motif === "inscription"
                ? "S'inscrire"
                : "Acheter / Demander"}
            </button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
