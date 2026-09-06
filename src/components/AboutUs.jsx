import { useState } from "react";

// Each stat is permanently bound to one physical leaf via homeSlot.
// homeSlot never changes — only the flower's rotation changes, which
// in turn changes which homeSlot currently lands in the active position.
// Slot angles: 0 = starts at 9 o'clock (active), 90 = 12 o'clock,
// 180 = 3 o'clock (the one that's always hidden), 270 = 6 o'clock.
const LEAVES = [
  { id: "members", value: "50+", label: "Klubber bruker CLOVER", homeSlot: 0 },
  { id: "active", value: "18k", label: "Aktive medlemer", homeSlot: 90 },
  { id: "setup", value: "5 min", label: "Oppsett tid", homeSlot: 180 },
  { id: "extra", value: "100%", label: "Norsk support", homeSlot: 270 },
];

const SLOT_COUNT = 4;
const SLOT_STEP = 360 / SLOT_COUNT; // 90

export default function AboutUs() {
  // rotation is the ONLY state driving the flower. Everything else
  // (which leaf is active, which is hidden) is derived from it.
  const [rotation, setRotation] = useState(0);

  // A leaf's current visual slot = its fixed homeSlot + current rotation,
  // normalized to 0-359.
  const currentSlot = (homeSlot) =>
    (((homeSlot + rotation) % 360) + 360) % 360;

  const handleLeafClick = (homeSlot) => {
    const slotNow = currentSlot(homeSlot);
    if (slotNow === 0) return; // already active, no-op

    // Move by the smallest number of 90-degree steps to bring this leaf to slot 0.
    // slotNow is one of 90 / 180 / 270 at this point.
    let step;
    if (slotNow === 90) step = -90; // one step clockwise from active -> rotate back
    else if (slotNow === 270) step = 90; // one step counter-clockwise -> rotate forward
    else step = 90; // 180: directly opposite, arbitrary consistent direction

    setRotation((prev) => prev + step);
  };

  return (
    <section
      id="om-oss"
      className="w-full overflow-hidden bg-gradient-to-br from-green-50 via-green-50 to-stone-100 px-6 py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left: text content */}
        <div>
          <span className="text-base font-semibold tracking-wide text-green-500">
            OM OSS
          </span>
          <h2 className="mt-5 text-6xl font-extrabold leading-[1.1] text-green-950">
            Vi er fra
            <br />
            idrettsmiljøet.
            <br />
            Vi kjenner
            <br />
            problemmene.
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-gray-700">
            CLOVER ble til fordi vi som styremedlemmer, trenere og frivillige
            selv opplevde frustrasjonen med å jonglere åtte systemer. Vi
            bestemte oss for å bygge det vi alltid ønsket fantes.
          </p>
        </div>

        {/* Right: rotating clover flower, intentionally bled off the right edge */}
        <div className="relative h-[760px] w-full overflow-visible">
          <div className="absolute left-[72%] top-1/2 h-[760px] w-[760px] -translate-y-1/2">
            <div
              className="absolute inset-0 transition-transform duration-700 ease-in-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {LEAVES.map((leaf) => {
                const slotNow = currentSlot(leaf.homeSlot);
                const isActive = slotNow === 270;
                const isHidden = slotNow === 90; // always the one opposite active

                return (
                  <Leaf
                    key={leaf.id}
                    leaf={leaf}
                    rotation={rotation}
                    isActive={isActive}
                    isHidden={isHidden}
                    onClick={() => handleLeafClick(leaf.homeSlot)}
                  />
                );
              })}
            </div>

            {/* Center circle — purely decorative, never rotates, no text */}
            <div className="absolute left-1/2 top-1/2 h-[195px] w-[195px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-950 shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Leaf({ leaf, rotation, isActive, isHidden, onClick }) {
  // Position is fixed by homeSlot and never changes independently —
  // the whole group rotates together via the parent's transform, so
  // each leaf's own translate() is always relative to its homeSlot.
  const radius = 215;
  const rad = ((leaf.homeSlot - 90) * Math.PI) / 180;
  const x = radius * Math.cos(rad);
  const y = radius * Math.sin(rad);

  return (
    <button
      onClick={onClick}
      disabled={isHidden}
      aria-hidden={isHidden}
      className={`absolute left-1/2 top-1/2 flex h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center transition-[background-color,opacity] duration-700 ${
        isHidden
          ? "pointer-events-none opacity-0"
          : isActive
          ? "cursor-pointer bg-green-600"
          : "cursor-pointer bg-green-600/70 hover:bg-green-600/85"
      }`}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      aria-label={`Vis ${leaf.label}`}
      aria-current={isActive}
    >
      {/* Counter-rotate the text so labels stay upright while the flower spins */}
      <div
        className="transition-transform duration-700 ease-in-out"
        style={{ transform: `rotate(${-rotation}deg)` }}
      >
        <span className="block text-4xl font-extrabold text-white">
          {leaf.value}
        </span>
        <span className="mt-1 block text-base text-green-50">
          {leaf.label}
        </span>
      </div>
    </button>
  );
}