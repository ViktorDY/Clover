import { sx, list } from "../adminRuntime";

// Medlemmer og lag › Avdelinger og grupper: department/group tree.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function DeptsView({ v }) {
  return (
    <div
      style={{
        marginTop: "-30px",
        borderRadius: "26px",
        background: "#ffffff",
        border: "1px solid rgba(22,36,26,.12)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: "14px",
          padding: "22px 22px 18px",
        }}
      >
        <div style={{ flex: "1 1 300px", minWidth: "0" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "21px", margin: "0" }}>
            {v.tDeptHeading}
          </h2>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "13.5px",
              lineHeight: "1.5",
              color: "rgba(22,36,26,.75)",
              maxWidth: "56ch",
            }}
          >
            {v.tDeptIntro}
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <button
            type="button"
            onClick={v.openAddDept}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid rgba(22,36,26,.18)",
              background: "#ffffff",
              color: "#16241a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(22,36,26,.1)",
              transition: "background .2s",
            }}
            className="kza-h6"
          >
            {v.tAddDept}
          </button>
          <button
            type="button"
            onClick={v.pickImport}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid rgba(22,36,26,.18)",
              background: "#ffffff",
              color: "#16241a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(22,36,26,.1)",
              transition: "background .2s",
            }}
            className="kza-h6"
          >
            {v.tImportGroup}
          </button>
          <button
            type="button"
            onClick={v.openAddGroup}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid rgba(22,36,26,.18)",
              background: "#ffffff",
              color: "#16241a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(22,36,26,.1)",
              transition: "background .2s",
            }}
            className="kza-h6"
          >
            {v.tAddGroup}
          </button>
          <input
            data-dept-import=""
            type="file"
            accept=".csv,.txt"
            onChange={v.onImportFile}
            style={{ display: "none" }}
          />
        </div>
      </div>
      {v.deptImportMsg ? (
        <div style={{ padding: "0 22px 14px", fontSize: "13px", color: "#1f7a3a", fontWeight: "700" }}>
          {v.deptImportMsg}
        </div>
      ) : null}
      <div style={{ padding: "0 22px 18px" }}>
        <input
          type="search"
          value={v.deptQ ?? ""}
          onChange={v.onDeptQ}
          placeholder={v.tDeptSearch}
          aria-label={v.tDeptSearch}
          style={{
            width: "100%",
            boxSizing: "border-box",
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
      </div>
      <div style={{ overflowX: "auto", borderTop: "1px solid rgba(22,36,26,.12)" }}>
        <div style={{ minWidth: "520px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) 180px 56px",
              alignItems: "center",
              padding: "12px 18px",
              background: "#f4f8f2",
              borderBottom: "1px solid rgba(22,36,26,.12)",
              fontSize: "12.5px",
              fontWeight: "700",
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.7)",
            }}
          >
            <span>{v.tColName}</span>
            <span>{v.tColCount}</span>
            <span />
          </div>
          {v.deptNone ? (
            <div style={{ padding: "18px", fontSize: "14px", color: "rgba(22,36,26,.75)" }}>
              {v.tDeptNone}
            </div>
          ) : null}
          {list(v.deptRows).map((r, i0) => (
            <div
              key={r.key ?? i0}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) 180px 56px",
                alignItems: "center",
                height: "46px",
                boxSizing: "border-box",
                padding: "0 18px",
                borderBottom: "1px solid rgba(22,36,26,.08)",
                fontSize: "14px",
                transition: "background .2s",
              }}
              className="kza-h6"
            >
              <span
                style={sx(
                  `display: flex; align-items: center; gap: 8px; min-width: 0; padding-left: ${r.indent ?? ""}`,
                )}
              >
                {r.hasKids ? (
                  <button
                    type="button"
                    onClick={r.toggle}
                    aria-label={r.name}
                    aria-expanded={r.open}
                    style={{
                      width: "22px",
                      height: "22px",
                      flex: "0 0 auto",
                      padding: "0",
                      border: "0",
                      background: "transparent",
                      cursor: "pointer",
                      display: "grid",
                      placeItems: "center",
                      color: "#1f7a3a",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      style={sx(`transition: transform .2s; transform: ${r.chev ?? ""}`)}
                    >
                      <path
                        d="M2 4l4 4 4-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : null}{" "}
                {r.noKids ? (
                  <span style={{ width: "22px", flex: "0 0 auto", display: "grid", placeItems: "center" }}>
                    <span style={sx(r.dotStyle)} />
                  </span>
                ) : null}{" "}
                <span style={sx(r.nameStyle)}>{r.name}</span>
              </span>
              <span style={sx(r.countStyle)}>{r.count}</span>
              <span style={{ position: "relative", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={r.menu}
                  aria-label={v.tMore}
                  aria-haspopup="true"
                  style={{
                    width: "32px",
                    height: "26px",
                    borderRadius: "6px",
                    border: "1px solid rgba(22,36,26,.14)",
                    background: "#ffffff",
                    cursor: "pointer",
                    color: "#16241a",
                    fontWeight: "800",
                    letterSpacing: ".08em",
                    lineHeight: "1",
                    padding: "0 0 6px",
                  }}
                  className="kza-h3"
                >
                  ...
                </button>{" "}
                {r.menuOpen ? (
                  <>
                    <div onClick={v.closeDeptMenu} style={{ position: "fixed", inset: "0", zIndex: "30" }} />
                    <div
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "calc(100% + 4px)",
                        zIndex: "31",
                        minWidth: "200px",
                        borderRadius: "14px",
                        background: "#ffffff",
                        border: "1px solid rgba(22,36,26,.12)",
                        boxShadow: "0 16px 40px rgba(22,36,26,.22)",
                        padding: "6px",
                        display: "grid",
                        gap: "2px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={r.addHere}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: "10px",
                          border: "0",
                          background: "transparent",
                          cursor: "pointer",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "13.5px",
                          color: "#16241a",
                        }}
                        className="kza-h3"
                      >
                        {v.tAddHere}
                      </button>
                      {r.canRemove ? (
                        <button
                          type="button"
                          onClick={r.remove}
                          style={{
                            textAlign: "left",
                            padding: "10px 12px",
                            borderRadius: "10px",
                            border: "0",
                            background: "transparent",
                            cursor: "pointer",
                            fontFamily: "var(--font-heading)",
                            fontWeight: "800",
                            fontSize: "13.5px",
                            color: "#a3282f",
                          }}
                          className="kza-hd"
                        >
                          {v.tRemove}
                        </button>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
