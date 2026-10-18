import { sx, list } from "../adminRuntime";

// Medlemmer og lag › Medlemmer: member register.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function MembersView({ v }) {
  return (
    <div
      style={{
        marginTop: "4px",
        borderRadius: "26px",
        background: "#ffffff",
        border: "1px solid rgba(22,36,26,.12)",
        padding: "22px",
        minWidth: "0",
      }}
    >
      <div
        style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginBottom: "16px" }}
      >
        <div style={{ flex: "1 1 200px", minWidth: "0" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "21px", margin: "0" }}>
            {v.tTblTitle}
          </h2>
          <div style={{ fontSize: "13px", color: "rgba(22,36,26,.72)", marginTop: "2px" }}>{v.tblSub}</div>
        </div>
        <button
          type="button"
          onClick={v.exportMembers}
          style={{
            padding: "11px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.22)",
            background: "#ffffff",
            color: "#16241a",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "13.5px",
            cursor: "pointer",
            transition: "background .25s",
          }}
          className="kza-h3"
        >
          {v.tExportUsers}
        </button>
        <button
          type="button"
          onClick={v.openAddMember}
          style={{
            padding: "11px 18px",
            borderRadius: "999px",
            border: "0",
            background: "#1f7a3a",
            color: "#ffffff",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "13.5px",
            cursor: "pointer",
            transition: "background .25s",
          }}
          className="kza-ha"
        >
          {v.tAddMember}
        </button>
      </div>
      <input
        type="search"
        value={v.memQ ?? ""}
        onChange={v.onMemQ}
        placeholder={v.tSearchMembers}
        style={{
          width: "100%",
          boxSizing: "border-box",
          marginTop: "4px",
          padding: "13px 18px",
          borderRadius: "999px",
          border: "1px solid rgba(22,36,26,.18)",
          background: "#f4f8f2",
          color: "#16241a",
          fontFamily: "var(--font-body)",
          fontSize: "14.5px",
          outline: "none",
        }}
        className="kza-f7"
      />
      {v.showGroupFilter ? (
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginTop: "10px" }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.75)",
              marginRight: "4px",
            }}
          >
            {v.tGroupFilter}
          </span>
          {list(v.groupTabs).map((g, i0) => (
            <button key={g.key ?? i0} type="button" onClick={g.pick} style={sx(g.style)}>
              {g.label}
            </button>
          ))}
        </div>
      ) : null}
      <div style={{ overflowX: "auto", marginTop: "14px" }}>
        <div style={{ minWidth: "660px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "44px minmax(150px,1.3fr) minmax(190px,1.6fr) minmax(140px,1fr) 100px",
              gap: "12px",
              alignItems: "center",
              padding: "0 14px 10px",
              borderBottom: "2px solid rgba(22,36,26,.14)",
              fontSize: "11.5px",
              fontWeight: "700",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.72)",
            }}
          >
            <input
              type="checkbox"
              aria-label={v.tSelectAll}
              checked={!!v.tblAllChecked}
              onChange={v.tblToggleAll}
              style={{
                width: "18px",
                height: "18px",
                margin: "0",
                accentColor: "#1f7a3a",
                cursor: "pointer",
              }}
            />
            <span>{v.tColName}</span>
            <span>{v.tColEmail}</span>
            <span>{v.tColType}</span>
            <span>{v.tColStatus}</span>
          </div>
          <div
            style={{
              maxHeight: "max(450px, calc(100vh - 360px))",
              height: "auto",
              overflowY: "auto",
              overscrollBehavior: "contain",
              scrollbarWidth: "thin",
            }}
          >
            {list(v.tblRows).map((r, i0) => (
              <div key={r.key ?? i0} onClick={r.open} style={sx(r.rowStyle)} className="kza-h6">
                <span onClick={v.stopClick} style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    aria-label={r.name}
                    checked={!!r.checked}
                    onChange={r.toggle}
                    style={{
                      width: "18px",
                      height: "18px",
                      margin: "0",
                      accentColor: "#1f7a3a",
                      cursor: "pointer",
                    }}
                  />
                </span>
                <span
                  style={{
                    minWidth: "0",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.name}
                </span>
                <span
                  style={{
                    minWidth: "0",
                    color: "rgba(22,36,26,.8)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.email}
                </span>
                <span
                  style={{
                    minWidth: "0",
                    color: "rgba(22,36,26,.8)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.type}
                </span>
                <span>
                  <span style={sx(r.statusStyle)}>{r.status}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        {v.tblMulti ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {list(v.tblPages).map((p, i0) => (
                <button key={p.key ?? i0} type="button" onClick={p.go} style={sx(p.style)}>
                  {p.label}
                </button>
              ))}
            </div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "rgba(22,36,26,.8)",
                whiteSpace: "nowrap",
              }}
            >
              {v.tTblPer}{" "}
              <select
                value={v.tblPer ?? ""}
                onChange={v.onTblPer}
                aria-label={v.tTblPer}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(22,36,26,.16)",
                  background: "#ffffff",
                  color: "#16241a",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                {list(v.tblPerOpts).map((o, i0) => (
                  <option key={o.key ?? i0} value={o.v ?? ""}>
                    {o.v}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : null}
      </div>
      {v.tblSelAny ? (
        <div style={{ marginTop: "12px", fontSize: "13px", color: "rgba(22,36,26,.78)" }}>{v.tblSelNote}</div>
      ) : null}
    </div>
  );
}
