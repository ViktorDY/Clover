import { useLang } from "../lib/langContext";
import nardo from "../assets/design/club-nardo.png";
import trondheimBtk from "../assets/design/club-trondheim-btk.png";
import rbk from "../assets/design/club-rbk.png";
import skoiteklubb from "../assets/design/club-skoiteklubb.png";
import nca from "../assets/design/club-nca.png";

const CLUBS = [
  { src: nardo, alt: "Nardo FK", h: 78 },
  { src: trondheimBtk, alt: "Trondheim Bordtennisklubb", h: 66 },
  { src: rbk, alt: "Rosenborg BK", h: 50 },
  { src: skoiteklubb, alt: "Trondhjems Skøiteklub", h: 52 },
  { src: nca, alt: "Norwegian Combat Academy", h: 62 },
];

// Club logo strip with a quote from Nardo FK, right under the hero.
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
            {CLUBS.map((club) => (
              <div key={club.alt} className="grid min-w-0 place-items-center">
                <img
                  src={club.src}
                  alt={club.alt}
                  className="block w-auto max-w-full object-contain"
                  style={{ height: club.h }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="border-l border-ink/14 pl-8 max-[760px]:border-l-0 max-[760px]:border-t max-[760px]:pl-0 max-[760px]:pt-5">
          <p className="m-0 text-[17px] leading-[1.6] text-ink [text-wrap:pretty]">
            {t(
              "«Kretz gir oss bedre oversikt og sparer oss for mye administrasjon. Nå kan vi bruke mer tid på spillerne.»",
              "“Kretz gives us a better overview and saves us a lot of administration. Now we can spend more time on the players.”",
            )}
          </p>
          <div className="mt-3 text-[14px] text-[#4C5E50]">– Nardo Fotballklubb</div>
        </div>
      </div>
    </section>
  );
}
