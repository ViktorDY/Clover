import { useLang } from "../../lib/langContext";

export default function PaymentsPanel({ scope, dueTotal, payments }) {
  const { t } = useLang();

  return (
    <div className="rounded-panel border border-ink/12 bg-white p-7">
      <h2 className="mb-1.5 mt-0 font-heading text-[22px] font-extrabold">
        {t("Betalinger", "Payments")}
      </h2>
      <p className="mb-4.5 mt-0 text-sm text-ink/65">{scope}</p>

      <div className="rounded-3xl bg-ink p-5.5 text-paper">
        <div className="text-xs uppercase tracking-[0.12em] text-paper/60">
          {t("Å betale nå", "Due now")}
        </div>
        <div className="mt-2 font-heading text-3xl font-extrabold">{dueTotal}</div>
        <button
          type="button"
          className="mt-4 w-full cursor-pointer rounded-full border-0 bg-grass px-5 py-3.5 font-heading text-sm font-extrabold text-ink transition-colors duration-300 hover:bg-grass-soft"
        >
          {t("Betal med Vipps", "Pay with Vipps")}
        </button>
      </div>

      <div className="mt-4 grid gap-2.5">
        {payments.map((payment, i) => (
          <div
            key={`${payment.club}-${i}`}
            className="flex items-center gap-3 border-b border-ink/10 py-3"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-semibold">{payment.title}</div>
              <div className="mt-0.5 text-[13px] text-ink/60">{payment.date}</div>
            </div>
            <div className="whitespace-nowrap font-heading text-[15px] font-extrabold">
              {payment.amount}
            </div>
            <span
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                payment.paid ? "bg-grass/28 text-ink" : "bg-amber/32 text-amber-ink"
              }`}
            >
              {payment.paid ? t("betalt", "paid") : t("ubetalt", "unpaid")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
