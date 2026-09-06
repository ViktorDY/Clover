import { useState } from "react";

// PLACEHOLDER CONTENT — swap these for real club testimonials before launch.
// Structure (avatar initials, quote, name, role) mirrors the reference design.
const TESTIMONIALS = [
  {
    id: 1,
    quote: "Много мъжествен сайт, браво на момчето",
    name: "Роналдо",
    initials: "AB",
  },
  {
    id: 2,
    quote: "Allahuakbar",
    name: "Bin Laden",
    initials: "CD",
  },
  {
    id: 3,
    quote: "[Sett inn ekte tilbakemelding her]",
    name: "[Navn]",
    initials: "EF",
  },
  {
    id: 4,
    quote: "[Sett inn ekte tilbakemelding her]",
    name: "[Navn]",
    initials: "GH",
  },
];

const VISIBLE_COUNT = 3;

export default function Testimonials() {
  // startIndex = index of the leftmost visible card. Prev/next just shift it
  // by 1, wrapping around the list.
  const [startIndex, setStartIndex] = useState(0);

  const goPrev = () =>
    setStartIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  const goNext = () =>
    setStartIndex((prev) => (prev + 1) % TESTIMONIALS.length);

  const visible = Array.from({ length: VISIBLE_COUNT }, (_, i) =>
    TESTIMONIALS[(startIndex + i) % TESTIMONIALS.length]
  );

  return (
    <section className="w-full bg-white px-6 py-28 text-center">
      <span className="text-base font-semibold tracking-wide text-green-500">
        HVA KLUBBENE SIER
      </span>
      <h2 className="mx-auto mt-4 text-5xl font-extrabold text-green-950">
        Ekte Tilbakemeldinger
      </h2>

      <div className="mx-auto mt-16 flex max-w-6xl items-center justify-center gap-6">
        <button
          onClick={goPrev}
          aria-label="Forrige tilbakemelding"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-green-500 hover:text-green-600"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 4l-8 8 8 8V4z" />
          </svg>
        </button>

        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3">
          {visible.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        <button
          onClick={goNext}
          aria-label="Neste tilbakemelding"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-green-500 hover:text-green-600"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 4l8 8-8 8V4z" />
          </svg>
        </button>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="flex flex-col rounded-3xl bg-[#f1ecdf] p-7 text-left">
      <div className="flex gap-1.5 text-green-600">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-green-500" />
        ))}
      </div>
      <p className="mt-6 text-gray-600">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-8 flex items-center gap-3 rounded-xl bg-green-200/60 px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-800 text-xs font-semibold text-white">
          {testimonial.initials}
        </span>
        <span className="text-sm font-medium text-green-900">
          {testimonial.name}
        </span>
      </div>
    </div>
  );
}
