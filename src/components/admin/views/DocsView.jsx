import Hv from "../../Hv";
import { sx, list } from "../adminRuntime";

// Dokumenter: search, colour-coded folder grid, and a folder view with a
// tree on the left (subfolders can be created) and file cards on the right.
// Renders the view object `v` from src/lib/adminLogic.js (adminDocsVals).
const FOLDER_BACK = "M2 5a3 3 0 0 1 3-3h8.2l3.4 3.4H29a3 3 0 0 1 3 3V23a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5z";
const FOLDER_FRONT = "M2 9.5h30V23a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9.5z";

function FolderIcon({ w, h, color, front, style }) {
  return (
    <svg width={w} height={h} viewBox="0 0 34 28" aria-hidden="true" style={style}>
      <path d={FOLDER_BACK} fill={color} />
      <path d={FOLDER_FRONT} fill={front} />
    </svg>
  );
}

export default function DocsView({ v }) {
  return (
    <div style={sx("border-radius: 26px; background: #ffffff; border: 1px solid rgba(22,36,26,.12); padding: 22px 24px 26px; min-width: 0; box-sizing: border-box")}>
      <label style={sx("position: relative; display: block; max-width: 520px")}>
        <span style={sx("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>{v.tDcSearch}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={sx("position: absolute; left: 16px; top: 13px")}>
          <circle cx="11" cy="11" r="7" fill="none" stroke="#4C5E50" strokeWidth="2" />
          <path d="M20 20l-4-4" stroke="#4C5E50" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={v.dcQ ?? ""}
          onChange={v.onDcQ}
          placeholder={v.tDcSearch}
          className="kza-f7"
          style={sx("width: 100%; box-sizing: border-box; height: 42px; padding: 0 16px 0 42px; border-radius: 12px; border: 1px solid rgba(22,36,26,.12); background: #f4f8f2; font-family: var(--font-body); font-size: 14px; color: #16241a; outline: none")}
        />
      </label>
      <div style={sx("display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px 20px; margin-top: 22px")}>
        <div style={sx("flex: 1; min-width: 220px")}>
          {v.dcInFolder ? (
            <nav aria-label={v.tDcTitle} style={sx("display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-size: 13.5px; font-weight: 600")}>
              <button type="button" onClick={v.dcBack} style={sx("padding: 0; border: 0; background: transparent; color: #1f7a3a; font: inherit; cursor: pointer")}>
                ← {v.tDcTitle}
              </button>
              <span aria-hidden="true" style={sx("color: rgba(22,36,26,.4)")}>›</span>
              <span style={sx("color: rgba(22,36,26,.7)")}>{v.dcFolderName}</span>
            </nav>
          ) : null}
          <h2 style={sx("margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 30px; letter-spacing: -.02em; color: #16241a")}>{v.dcHeading}</h2>
          <div style={sx("margin-top: 4px; font-size: 14px; color: rgba(22,36,26,.62)")}>{v.dcSub}</div>
        </div>
        <label
          className="kza-hf"
          style={sx("position: relative; display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; border-radius: 999px; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer; transition: background .3s")}
        >
          <span aria-hidden="true" style={sx("font-size: 17px; line-height: 1")}>+</span> {v.tDcUpload}
          <input type="file" multiple onChange={v.onDcFiles} style={sx("position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none")} />
        </label>
      </div>

      {v.dcShowGrid ? (
        <div data-rsp-cols="3" style={sx("display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 20px")}>
          {list(v.dcFolders).map((f, i) => (
            <Hv
              as="button"
              key={f.key ?? i}
              type="button"
              onClick={f.open}
              style="display: flex; flex-direction: column; align-items: flex-start; gap: 14px; padding: 20px 20px 18px; border-radius: 18px; border: 1px solid rgba(22,36,26,.1); background: #ffffff; text-align: left; cursor: pointer; font-family: var(--font-body); color: #16241a; box-shadow: 0 1px 2px rgba(22,36,26,.04); transition: border-color .25s, box-shadow .25s, transform .25s"
              hover="border-color: #74cd85; box-shadow: 0 12px 28px rgba(31,122,58,.10); transform: translateY(-2px)"
            >
              <FolderIcon w="34" h="28" color={f.color} front={f.colorFront} />
              <span>
                <b style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 16px")}>{f.name}</b>
                <span style={sx("display: block; margin-top: 3px; font-size: 13px; color: rgba(22,36,26,.6)")}>{f.meta}</span>
              </span>
            </Hv>
          ))}
        </div>
      ) : null}

      {v.dcShowFiles ? (
        <div style={sx("margin-top: 18px; max-height: max(320px, calc(100vh - 420px)); overflow-y: auto; scrollbar-width: thin")}>
          {list(v.dcRows).map((r, i) => (
            <div key={r.key ?? i} style={sx("display: grid; grid-template-columns: 40px minmax(0, 1fr) auto; align-items: center; gap: 12px; padding: 12px 4px; border-bottom: 1px solid rgba(22,36,26,.08)")}>
              <span style={sx(r.iconStyle)}>{r.ext}</span>
              <span style={sx("min-width: 0")}>
                <span style={sx("display: block; font-weight: 600; font-size: 14.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{r.name}</span>
                <span style={sx("display: block; font-size: 12.5px; color: rgba(22,36,26,.62)")}>{r.meta}</span>
              </span>
              <span style={sx("display: flex; align-items: center; gap: 8px")}>
                <span style={sx("padding: 4px 10px; border-radius: 999px; background: #f4f8f2; font-size: 12px; font-weight: 600; white-space: nowrap")}>{r.cat}</span>
                <button
                  type="button"
                  onClick={r.del}
                  aria-label={v.tDelete}
                  className="kza-hv"
                  style={sx("width: 30px; height: 30px; border-radius: 999px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: rgba(22,36,26,.6); cursor: pointer")}
                >
                  ×
                </button>
              </span>
            </div>
          ))}
          {v.dcEmpty ? <div style={sx("padding: 20px 4px; font-size: 14px; color: rgba(22,36,26,.7)")}>{v.tDcEmpty}</div> : null}
        </div>
      ) : null}

      {v.dcShowFolder ? (
        <div data-rsp="stack" style={sx("display: grid; grid-template-columns: minmax(200px, 260px) minmax(0, 1fr); gap: 0; margin-top: 18px; border-top: 1px solid rgba(22,36,26,.08); height: max(360px, calc(100vh - 380px))")}>
          <nav aria-label={v.tDcTitle} style={sx("display: grid; align-content: start; gap: 2px; padding: 14px 14px 14px 0; border-right: 1px solid rgba(22,36,26,.08); overflow-y: auto; scrollbar-width: thin; min-height: 0")}>
            {list(v.dcTree).map((tr, i) => (
              <Hv as="button" key={tr.key ?? i} type="button" onClick={tr.pick} aria-current={tr.on} style={tr.style} hover="background: #f4f8f2">
                <FolderIcon w="22" h="18" color={tr.color} front={tr.colorFront} style={{ flex: "0 0 auto" }} />
                <span style={sx("min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{tr.name}</span>
              </Hv>
            ))}
          </nav>
          <div style={sx("min-width: 0; min-height: 0; overflow-y: auto; scrollbar-width: thin; padding: 16px 0 16px 22px")}>
            <div style={sx("display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px")}>
              <h3 style={sx("flex: 1; min-width: 0; margin: 0; font-family: var(--font-heading); font-weight: 800; font-size: 22px; color: #16241a")}>{v.dcCurName}</h3>
              <span style={sx("font-size: 13.5px; color: rgba(22,36,26,.6)")}>{v.dcCurCount}</span>
              <button
                type="button"
                onClick={v.dcOpenNewSub}
                className="kza-h3"
                style={sx("padding: 7px 14px; border-radius: 999px; border: 1px dashed rgba(31,122,58,.55); background: #ffffff; color: #1f7a3a; font-family: var(--font-heading); font-weight: 800; font-size: 12.5px; cursor: pointer")}
              >
                {v.tDcNewSub}
              </button>
            </div>
            {v.dcNewSubOpen ? (
              <div style={sx("display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; padding: 10px; border-radius: 14px; background: #f4f8f2")}>
                <input
                  type="text"
                  autoFocus
                  value={v.dcNewSubVal ?? ""}
                  onChange={v.onDcNewSub}
                  onKeyDown={v.dcNewSubKey}
                  placeholder={v.tDcSubPh}
                  aria-label={v.tDcSubPh}
                  className="kza-fp"
                  style={sx("flex: 1; min-width: 180px; box-sizing: border-box; padding: 10px 14px; border-radius: 10px; border: 1px solid rgba(22,36,26,.18); background: #ffffff; font-family: var(--font-body); font-size: 14px; color: #16241a; outline: none")}
                />
                <button type="button" onClick={v.dcMakeSub} style={sx("padding: 0 16px; border-radius: 10px; border: 0; background: #16241a; color: #f6f8f3; font-family: var(--font-heading); font-weight: 800; font-size: 13px; cursor: pointer")}>
                  {v.tDcMake}
                </button>
                <button type="button" onClick={v.dcCancelSub} style={sx("padding: 0 14px; border-radius: 10px; border: 1px solid rgba(22,36,26,.16); background: #ffffff; color: #16241a; font-family: var(--font-body); font-size: 13px; cursor: pointer")}>
                  {v.tDcCancel}
                </button>
              </div>
            ) : null}
            {v.dcHasSubs ? (
              <div style={sx("display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-top: 14px")}>
                {list(v.dcSubTiles).map((sb, i) => (
                  <Hv
                    as="button"
                    key={sb.key ?? i}
                    type="button"
                    onClick={sb.open}
                    style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 14px; border: 1px solid rgba(22,36,26,.1); background: #f9fbf8; cursor: pointer; text-align: left; font-family: var(--font-body); color: #16241a; min-width: 0"
                    hover="border-color: #74cd85; background: #ffffff"
                  >
                    <FolderIcon w="28" h="23" color={sb.color} front={sb.colorFront} style={{ flex: "0 0 auto" }} />
                    <span style={sx("min-width: 0")}>
                      <b style={sx("display: block; font-size: 14.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{sb.name}</b>
                      <span style={sx("display: block; font-size: 12.5px; color: rgba(22,36,26,.6)")}>{sb.meta}</span>
                    </span>
                  </Hv>
                ))}
              </div>
            ) : null}
            <div style={sx("display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px; margin-top: 16px")}>
              {list(v.dcCards).map((fc, i) => (
                <Hv
                  key={fc.key ?? i}
                  title={fc.name}
                  style="position: relative; display: flex; align-items: center; gap: 14px; padding: 18px 16px; border-radius: 16px; border: 1px solid rgba(116,205,133,.45); background: #ffffff; min-width: 0; transition: box-shadow .25s, transform .25s"
                  hover="box-shadow: 0 12px 26px rgba(22,36,26,.08); transform: translateY(-2px)"
                >
                  <span aria-hidden="true" style={sx("position: relative; flex: 0 0 auto; width: 46px; height: 52px")}>
                    <svg width="38" height="50" viewBox="0 0 40 50" style={sx("position: absolute; left: 8px; top: 0")}>
                      <path d="M4 0h22l14 14v32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill={fc.tint} />
                      <path d="M26 0l14 14H30a4 4 0 0 1-4-4z" fill={fc.fold} />
                    </svg>
                    <span style={sx(fc.badgeStyle)}>{fc.ext}</span>
                  </span>
                  <span style={sx("min-width: 0; flex: 1")}>
                    <b style={sx("display: block; font-family: var(--font-heading); font-weight: 800; font-size: 15.5px; color: #16241a; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>{fc.base}</b>
                    <span style={sx("display: block; margin-top: 3px; font-size: 13px; color: rgba(22,36,26,.6)")}>{fc.meta}</span>
                  </span>
                  <Hv
                    as="button"
                    type="button"
                    onClick={fc.del}
                    aria-label={v.tDelete}
                    style="position: absolute; top: 8px; right: 8px; width: 24px; height: 24px; border-radius: 999px; border: 0; background: transparent; color: rgba(22,36,26,.45); font-size: 13px; cursor: pointer"
                    hover="background: #fbe9e5; color: #b8240e"
                  >
                    ×
                  </Hv>
                </Hv>
              ))}
            </div>
            {v.dcNoCards ? <div style={sx("margin-top: 16px; font-size: 14px; color: rgba(22,36,26,.65)")}>{v.tDcFolderEmpty}</div> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
