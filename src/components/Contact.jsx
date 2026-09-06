import { useState } from "react";

const SUBJECT_OPTIONS = [
  "Velg emne",
  "Book en demo",
  "Priser og avtaler",
  "Teknisk support",
  "Noe annet",
];

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    clubName: "",
    subject: "",
    message: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend wired up yet — this is where a real submit (API call,
    // email service, etc.) goes once the project has one.
    console.log("Contact form submitted:", form);
  };

  return (
    <section
      id="kontakt"
      className="w-full bg-white px-6 py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        {/* Left: info */}
        <div>
          <span className="text-base font-semibold tracking-wide text-green-500">
            KONTAKT OSS
          </span>
          <h2 className="mt-5 text-5xl font-extrabold leading-[1.1] text-green-950">
            La oss
            <br />
            snakke om
            <br />
            klubben din
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-700">
            Enten du vil ha en demo, har spørsmål, eller er klar til å starte
            - ta kontakt. Vi svarer innen en arbeidsdag.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <InfoRow label="E-post" value="admin@clover.no" href="mailto:admin@clover.no" />
            <InfoRow
              label="Tlf."
              value="+47 12 34 56 78   Man-Fre 09-16"
              href="tel:+4712345678"
            />
            <InfoRow label="Kontor" value="7041 Trondheim" />
          </div>
        </div>

        {/* Right: form */}
        <div className="rounded-3xl border border-gray-200 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-green-950">
            Send oss en melding
          </h3>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Fornavn"
                value={form.firstName}
                onChange={handleChange("firstName")}
                placeholder="Anelia"
              />
              <Field
                label="Etternavn"
                value={form.lastName}
                onChange={handleChange("lastName")}
                placeholder="Yordanova"
              />
            </div>

            <Field
              label="E-post"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="anelia.klubb@klubb.no"
            />

            <Field
              label="Klubbnavn"
              value={form.clubName}
              onChange={handleChange("clubName")}
              placeholder="Anelia BTK"
            />

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Hva kan vi hjelpe med?
              </label>
              <select
                value={form.subject}
                onChange={handleChange("subject")}
                className="rounded-lg border border-[#e3ddc9] bg-[#f1ecdf] px-4 py-3 text-sm text-gray-700 focus:outline-2 focus:outline-green-500"
              >
                {SUBJECT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt === "Velg emne" ? "" : opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Melding
              </label>
              <textarea
                value={form.message}
                onChange={handleChange("message")}
                placeholder="Fortell oss litt om klubben din og hva du leter etter..."
                rows={4}
                className="resize-none rounded-lg border border-[#e3ddc9] bg-[#f1ecdf] px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-2 focus:outline-green-500"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-lg bg-gradient-to-b from-green-500 to-green-600 px-6 py-3.5 text-sm font-semibold tracking-wide text-white hover:from-green-600 hover:to-green-700"
            >
              SEND MELDING --&gt;
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value, href }) {
  const content = (
    <>
      <span className="font-semibold text-gray-900">{label}</span>
      <span className="text-gray-300">|</span>
      <span className="text-gray-500">{value}</span>
    </>
  );

  const className =
    "flex items-center gap-3 rounded-full border border-gray-200 px-6 py-3.5 text-sm";

  return href ? (
    <a href={href} className={`${className} hover:bg-gray-50`}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-lg border border-[#e3ddc9] bg-[#f1ecdf] px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-2 focus:outline-green-500"
      />
    </div>
  );
}
