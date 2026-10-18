import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";
import { clubName, clubShort, initialsOf, nok } from "../../lib/memberData";
import { CloseButton, Modal } from "./ui";

/*
  A person's contact card — an activity's leader or an invoice's contact
  person — with a shortcut to message them.
*/
export function LeaderModal({ person, onMessage, onClose }) {
  const { t, lang } = useLang();
  const name = pick(person.name, lang);
  return (
    <Modal onClose={onClose} label={name} z="z-[93]" scrim="bg-ink/44 backdrop-blur-[8px]" className="max-w-[420px]">
      <div className="box-border max-h-[88vh] overflow-y-auto rounded-[32px] border border-ink/12 bg-white px-7 pb-7 pt-8 shadow-[0_36px_90px_rgba(22,36,26,0.3)]">
        <CloseButton onClick={onClose} label={t("Lukk", "Close")} variant="soft" className="absolute right-4 top-4" />
        <div className="flex items-center gap-4">
          <div className="grid h-[68px] w-[68px] flex-none place-items-center rounded-full border border-grass bg-[#CDEFD3] font-heading text-2xl font-extrabold text-ink">
            {initialsOf(name.replace(/^(Trener|Coach)\s+/i, ""))}
          </div>
          <div className="min-w-0">
            <div className="font-heading text-2xl font-extrabold leading-[1.1] tracking-[-0.02em]">{name}</div>
            <div className="mt-1 text-sm text-ink/65">{pick(person.role, lang)}</div>
          </div>
        </div>
        <div className="mt-[26px] grid gap-4">
          <Field label={t("Klubb", "Club")}>{clubName(person.club)}</Field>
          <Field label={t("Telefon", "Phone")}>
            <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="text-ink">
              {person.phone}
            </a>
          </Field>
          <Field label={t("E-post", "Email")}>
            <a href={`mailto:${person.email}`} className="text-ink [overflow-wrap:anywhere]">
              {person.email}
            </a>
          </Field>
        </div>
        <button
          type="button"
          onClick={onMessage}
          className="mt-[26px] w-full cursor-pointer rounded-full border-0 bg-grass px-5 py-3.5 font-heading text-[15px] font-extrabold text-ink transition-colors hover:bg-[#5fbe73]"
        >
          {t("Send melding", "Send message")}
        </button>
      </div>
    </Modal>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.12em] text-ink/55">{label}</div>
      <div className="mt-1 font-heading text-base font-extrabold">{children}</div>
    </div>
  );
}

/*
  An invoice: status, amount, what it is for, a way to pay it while it is
  unpaid, and the details — ending in the contact person.
*/
export function PayInfoModal({ payment, onPay, onOpenContact, onClose }) {
  const { t, lang, isEn } = useLang();
  const info = payment.info;
  const rows = [
    [t("Klubb", "Club"), clubShort(payment.club)],
    [t("Gjelder", "Regards"), info.child],
    [t("Krav sendt", "Request sent"), pick(info.sent, lang)],
    [t("Forfallsdato", "Due date"), pick(info.dueOn, lang)],
    [t("Telefon", "Phone"), info.phone],
    [t("Referanse", "Reference"), info.ref],
  ];
  return (
    <Modal onClose={onClose} label={pick(payment.title, lang)} z="z-[92]" className="max-w-[520px]">
      <div className="box-border max-h-[88vh] overflow-y-auto rounded-[32px] border border-ink/12 bg-white px-7 pb-6.5 pt-[30px] shadow-[0_36px_90px_rgba(22,36,26,0.3)]">
        <CloseButton onClick={onClose} label={t("Lukk", "Close")} variant="soft" className="absolute right-4 top-4" />
        <span
          className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${
            payment.paid ? "bg-grass/28 text-ink" : "bg-amber/32 text-amber-ink"
          }`}
        >
          {payment.paid ? t("Betalt", "Paid") : t("Ubetalt", "Unpaid")}
        </span>
        <h2 className="mb-1 ml-0 mr-10 mt-3.5 font-heading text-[25px] font-extrabold tracking-[-0.02em]">
          {pick(payment.title, lang)}
        </h2>
        <div className="font-heading text-[32px] font-extrabold text-moss">{nok(payment.amount, isEn)}</div>
        <p className="mb-0 mt-3.5 text-[15.5px] leading-[1.6] text-ink/80">{pick(info.text, lang)}</p>

        {!payment.paid && (
          <div className="mt-4.5 rounded-[22px] border border-ink/10 bg-mute p-4">
            <div className="mb-3 font-heading text-[15px] font-extrabold">{t("Betal dette kravet", "Pay this request")}</div>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => onPay("vipps")}
                className="flex-[1_1_140px] cursor-pointer rounded-full border-0 bg-[#FF5B24] px-5 py-3.5 font-heading text-[15px] font-extrabold text-white"
              >
                {t("Betal med Vipps", "Pay with Vipps")}
              </button>
              <button
                type="button"
                onClick={() => onPay("card")}
                className="flex-[1_1_140px] cursor-pointer rounded-full border-2 border-ink bg-white px-5 py-3.5 font-heading text-[15px] font-extrabold text-ink"
              >
                {t("Betal med kort", "Pay by card")}
              </button>
            </div>
          </div>
        )}

        <div className="mt-4.5 grid border-t border-ink/10">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3.5 border-b border-ink/10 py-3">
              <span className="text-[13px] text-ink/60">{k}</span>
              <span className="text-right text-[15px] font-semibold">{v}</span>
            </div>
          ))}
          <div className="flex items-center justify-between gap-3.5 border-b border-ink/10 py-3">
            <span className="text-[13px] text-ink/60">{t("Kontaktperson", "Contact person")}</span>
            <button
              type="button"
              onClick={onOpenContact}
              className="cursor-pointer border-0 bg-transparent p-0 text-right font-heading text-[15px] font-extrabold text-ink underline decoration-grass decoration-2 underline-offset-4 hover:text-moss"
            >
              {info.who} · {pick(info.role, lang)} →
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
