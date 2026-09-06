import { useState } from "react";

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // No auth backend wired up yet — this is a placeholder submit handler.
    console.log("Login attempt:", { email, password });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Logg inn</h2>
          <button
            onClick={onClose}
            aria-label="Lukk"
            className="text-gray-400 hover:text-gray-700"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C9 2 7 4.5 8 7c-2.5-1-5 1-4 3.5S7 13 9 12c-1 2.5.5 5 3 5s4-2.5 3-5c2 1 4.5-.5 5-3s-1.5-4.5-4-3.5c1-2.5-1-5-4-5Z"
              fill="#22A45D"
            />
            <rect x="11" y="14" width="2" height="7" rx="1" fill="#22A45D" />
          </svg>
          <span className="text-lg font-bold text-gray-900">clover</span>
        </div>
        <p className="mt-2 text-center text-sm text-gray-500">
          Logg inn med klubbens konto
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              E-post
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kari@klubben.no"
              className="rounded-lg border border-[#e3ddc9] bg-[#f1ecdf] px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-2 focus:outline-green-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Passord
              </label>
              <a href="#glemt-passord" className="text-xs text-gray-500 hover:text-gray-800">
                Glemt passord?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-lg border border-[#e3ddc9] bg-[#f1ecdf] px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-2 focus:outline-green-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-lg bg-gradient-to-b from-green-400 to-green-500 px-6 py-3.5 text-sm font-semibold text-white hover:from-green-500 hover:to-green-600"
          >
            Logg inn →
          </button>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="h-px flex-1 bg-gray-200" />
            eller
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            className="rounded-lg border border-gray-300 px-6 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Logg inn med Min Idrett
          </button>

          <p className="text-center text-xs text-gray-500">
            Har du ikke konto?{" "}
            <a href="#kom-i-gang" className="font-semibold text-green-600 hover:underline">
              Start gratis prøveperiode
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
