// [design 17 Nov] Style strings shared by the admin tables.
export const footStyle =
  "display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; padding: 10px 14px; border-top: 1px solid rgba(22,36,26,.1); font-size: 13.5px; color: #16241a";
export const headRow = (cols, pad = "14px") =>
  `display: grid; grid-template-columns: ${cols}; gap: 12px; align-items: center; padding: 10px ${pad}; background: #eaf4e7; border-top: 1px solid rgba(22,36,26,.1); border-bottom: 1px solid rgba(22,36,26,.1); font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(22,36,26,.72)`;
export const filterRow = (cols, pad = "14px") =>
  `display: grid; grid-template-columns: ${cols}; gap: 12px; align-items: center; padding: 6px ${pad}; background: #f6f8f3; border-bottom: 1px solid rgba(22,36,26,.1)`;
export const smallBtn = (primary) =>
  primary
    ? "padding: 5px 12px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-body); font-weight: 700; font-size: 12.5px; cursor: pointer"
    : "padding: 5px 12px; border-radius: 999px; border: 1px solid rgba(22,36,26,.22); background: #ffffff; color: #16241a; font-family: var(--font-body); font-weight: 700; font-size: 12.5px; cursor: pointer";
