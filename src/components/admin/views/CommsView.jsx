import { sx, list } from "../adminRuntime";
import CmChatOpenBlock from "./CmChatOpenBlock";

export default function CommsView({ v }) {
  return (
    <div
      style={sx(
        `display: grid; grid-template-columns: ${v.cmCols ?? ""}; gap: 16px; align-items: start; overflow: hidden; transition: grid-template-columns .5s cubic-bezier(.2,.7,.2,1)`,
      )}
    >
      <div
        style={{
          borderRadius: "30px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          padding: "20px",
          minWidth: "0",
        }}
      >
        <input
          type="search"
          value={v.cmListQ ?? ""}
          onChange={v.onCmListQ}
          placeholder={v.tCmSearchChats}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.18)",
            background: "#f4f8f2",
            color: "#16241a",
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            outline: "none",
          }}
          className="kza-f7"
        />
        <div
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginTop: "12px" }}
        >
          {list(v.cmFilters).map((f, i0) => (
            <button key={f.key ?? i0} type="button" onClick={f.pick} style={sx(f.style)}>
              {f.label}
              <span style={sx(f.countStyle)}>{f.count}</span>
            </button>
          ))}
          <span style={{ flex: "1" }} />
          <select
            value=""
            onChange={v.onCmNew}
            aria-label={v.tCmNew}
            style={{
              maxWidth: "190px",
              padding: "9px 14px",
              borderRadius: "999px",
              border: "1px solid #16241a",
              background: "#16241a",
              color: "#f6f8f3",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <option value="">{v.tCmNew}</option>
            {list(v.cmToOpts).map((o, i0) => (
              <option key={o.key ?? i0} value={o.id ?? ""}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "8px",
            marginTop: "14px",
            height: "58vh",
            minHeight: "340px",
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            paddingRight: "4px",
          }}
        >
          {list(v.cmChatList).map((c, i0) => (
            <button key={c.key ?? i0} type="button" onClick={c.open} style={sx(c.style)} className="kza-hw">
              <span style={{ display: "inline-flex", alignItems: "center", flex: "0 0 auto" }}>
                {list(c.avatars).map((a, i1) => (
                  <span key={a.key ?? i1} style={sx(a.style)}>
                    {a.initials}
                  </span>
                ))}
              </span>{" "}
              <span style={{ flex: "1", minWidth: "0", textAlign: "left" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "0" }}>
                  <span
                    style={{
                      flex: "1 1 auto",
                      minWidth: "0",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "15px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.name}
                  </span>
                  {c.hasUnread ? <span style={sx(c.badgeStyle)}>{c.unread}</span> : null}
                </span>{" "}
                <span
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                    minWidth: "0",
                    marginTop: "3px",
                  }}
                >
                  <span style={sx(c.previewStyle)}>{c.preview}</span>
                  <span style={{ fontSize: "12px", color: "rgba(22,36,26,.55)", whiteSpace: "nowrap" }}>
                    {c.when}
                  </span>
                </span>
              </span>
            </button>
          ))}
          {v.cmNoChats ? (
            <div style={{ padding: "18px", fontSize: "14px", color: "rgba(22,36,26,.6)" }}>
              {v.tCmNoChats}
            </div>
          ) : null}
        </div>
      </div>
      {v.cmChatOpen ? <CmChatOpenBlock v={v} /> : null}
    </div>
  );
}
