export default function Navbar({ onOpenLogin }) {
  const navLinks = [
    { label: "Slik fungerer det", href: "#slik-fungerer-det" },
    { label: "Om oss", href: "#om-oss" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 lg:px-12">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C9 2 7 4.5 8 7c-2.5-1-5 1-4 3.5S7 13 9 12c-1 2.5.5 5 3 5s4-2.5 3-5c2 1 4.5-.5 5-3s-1.5-4.5-4-3.5c1-2.5-1-5-4-5Z"
              fill="#22A45D"
            />
            <rect x="11" y="14" width="2" height="7" rx="1" fill="#22A45D" />
          </svg>
          <span className="text-2xl font-bold text-gray-900">clover</span>
        </a>

        {/* Center nav links */}
        <nav className="hidden items-center gap-12 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base text-gray-700 hover:text-gray-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={onOpenLogin}
            className="rounded-full border border-gray-300 px-6 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
          >
            Logg inn
          </button>
          <a
            href="#kom-i-gang"
            className="rounded-full bg-gradient-to-b from-green-500 to-green-600 px-6 py-2.5 text-base font-semibold text-white shadow-sm hover:from-green-600 hover:to-green-700"
          >
            Kom i gang
          </a>
        </div>
      </div>
    </header>
  );
}