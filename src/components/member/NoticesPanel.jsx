const DOT_TONE = {
  green: "bg-grass",
  amber: "bg-amber",
  grey: "bg-ink/25",
};

export default function NoticesPanel({ title, notices }) {
  return (
    <div className="rounded-panel border border-ink/12 bg-white p-7">
      <h2 className="mb-4.5 mt-0 font-heading text-[22px] font-extrabold">{title}</h2>
      <div className="grid gap-3.5">
        {notices.map((notice, i) => (
          <div key={`${notice.club}-${i}`} className="flex items-start gap-3">
            <span
              className={`mt-1.5 h-[9px] w-[9px] shrink-0 rounded-full ${
                DOT_TONE[notice.tone] || DOT_TONE.grey
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-semibold leading-[1.35]">{notice.text}</div>
              <div className="mt-0.5 text-[13px] text-ink/55">{notice.when}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
