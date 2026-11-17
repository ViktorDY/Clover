import { useLang } from "../lib/langContext";

/*
  Club strip right under the hero. The design (17 Nov) took out the five club
  logos and the Nardo FK quote and left neutral placeholders in their place:
  five green dots and a green block where the quote stood. Both are aria-hidden.
*/
const SLOTS = [0, 1, 2, 3, 4];

export default function Customers() {
  const { t } = useLang();

  return (
    <section className="kz-pad kz-pad-m relative pt-[72px]">
      <div
        data-reveal
        className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center gap-8 max-[760px]:grid-cols-[minmax(0,1fr)] min-[1680px]:max-w-[1440px]"
      >
        <div>
          <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#3E8A48]">
            {t("Kan brukes av klubber i hele Norge", "Can be used by clubs across Norway")}
          </div>
          <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] items-center gap-[22px]">
            {SLOTS.map((i) => (
              <div key={i} className="grid min-w-0 place-items-center">
                <span aria-hidden="true" className="block h-16 w-16 rounded-full bg-[#74cd85]" />
              </div>
            ))}
          </div>
        </div>
        <div className="border-l border-ink/14 pl-8 max-[760px]:border-l-0 max-[760px]:border-t max-[760px]:pl-0 max-[760px]:pt-5">
          <div aria-hidden="true" className="h-[120px] rounded-2xl bg-[#74cd85]" />
        </div>
      </div>
    </section>
  );
}
