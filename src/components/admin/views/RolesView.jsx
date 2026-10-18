import { sx, list } from "../adminRuntime";
import RoleFilteredBlock from "./RoleFilteredBlock";

export default function RolesView({ v }) {
  return (
    <div
      data-rsp="stack"
      style={sx(
        `margin-top: 4px; display: grid; grid-template-columns: ${v.roleGridCols ?? ""}; gap: 16px; align-items: start`,
      )}
    >
      <div
        style={{
          borderRadius: "26px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          overflow: "hidden",
          minWidth: "0",
          alignSelf: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: "14px",
            padding: "20px 22px 18px",
          }}
        >
          <div style={{ flex: "1 1 200px", minWidth: "0" }}>
            <h2
              style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "20px", margin: "0" }}
            >
              {v.tRolesHeading}
            </h2>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: "13.5px",
                lineHeight: "1.5",
                color: "rgba(22,36,26,.75)",
              }}
            >
              {v.tRolesSub}
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <button
              type="button"
              onClick={v.openAssign}
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
              {v.tAssignBtn2}
            </button>
            <button
              type="button"
              onClick={v.openAddRole}
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
              {v.tAddRole}
            </button>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) 110px 56px",
            alignItems: "center",
            padding: "12px 18px",
            background: "#f4f8f2",
            borderTop: "1px solid rgba(22,36,26,.12)",
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
        {list(v.roleCards).map((rc, i0) => (
          <div key={rc.key ?? i0} onClick={rc.pick} style={sx(rc.style)} className="kza-h6">
            <span style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "0" }}>
              <span style={sx(rc.dotStyle)} />
              <span
                style={{ minWidth: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {rc.name}
              </span>
            </span>
            <span>{rc.num}</span>
            <span style={{ position: "relative", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={rc.menu}
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
              {rc.menuOpen ? (
                <>
                  <div onClick={rc.closeMenu} style={{ position: "fixed", inset: "0", zIndex: "30" }} />
                  <div
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "calc(100% + 4px)",
                      zIndex: "31",
                      minWidth: "190px",
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
                      onClick={rc.show}
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
                      {rc.showLabel}
                    </button>
                    {rc.canRemove ? (
                      <button
                        type="button"
                        onClick={rc.remove}
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
      {v.taOpen ? (
        <div
          data-rsp-modal=""
          onClick={v.closeAssign}
          style={{
            position: "fixed",
            inset: "0",
            zIndex: "97",
            display: "grid",
            placeItems: "center",
            padding: "24px",
            background: "rgba(22,36,26,.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <form
            onClick={v.stopClick}
            onSubmit={v.saveAssign}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "480px",
              maxHeight: "calc(100vh - 48px)",
              overflowY: "auto",
              boxSizing: "border-box",
              borderRadius: "28px",
              background: "#ffffff",
              border: "1px solid rgba(22,36,26,.12)",
              boxShadow: "0 32px 80px rgba(22,36,26,.32)",
              padding: "26px",
              display: "grid",
              gap: "12px",
            }}
          >
            <button
              type="button"
              onClick={v.closeAssign}
              aria-label={v.tClose}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "34px",
                height: "34px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.14)",
                background: "#ffffff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "22px",
                margin: "0 40px 4px 0",
              }}
            >
              {v.tAssignBtn2}
            </h3>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(22,36,26,.65)",
              }}
            >
              {v.tTaPerson}
            </div>
            <input
              type="search"
              value={v.taQ ?? ""}
              onChange={v.onTaQ}
              placeholder={v.tTaSearch}
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
            <div
              style={{
                display: "grid",
                gap: "6px",
                maxHeight: "190px",
                overflowY: "auto",
                paddingRight: "2px",
              }}
            >
              {list(v.taResults).map((p, i0) => (
                <button
                  key={p.key ?? i0}
                  type="button"
                  onClick={p.pick}
                  style={sx(p.style)}
                  className="kza-h3"
                >
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "14px" }}>
                    {p.name}
                  </span>{" "}
                  <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.7)" }}>{p.meta}</span>
                </button>
              ))}
              {v.taNone ? (
                <div style={{ padding: "10px 4px", fontSize: "13.5px", color: "rgba(22,36,26,.7)" }}>
                  {v.tRoleEmpty}
                </div>
              ) : null}
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(22,36,26,.65)",
                marginTop: "4px",
              }}
            >
              {v.tTaClub}
            </div>
            <select value={v.taClub ?? ""} onChange={v.onTaClub} style={sx(v.inputStyle)}>
              {list(v.taClubOpts).map((o, i0) => (
                <option key={o.key ?? i0} value={o.id ?? ""}>
                  {o.name}
                </option>
              ))}
            </select>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(22,36,26,.65)",
                marginTop: "4px",
              }}
            >
              {v.tTaRole}
            </div>
            <select value={v.taRole ?? ""} onChange={v.onTaRole} style={sx(v.inputStyle)}>
              {list(v.roleOpts).map((o, i0) => (
                <option key={o.key ?? i0} value={o.id ?? ""}>
                  {o.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={v.taDisabled}
              style={sx(
                `padding: 14px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 15px; cursor: pointer; opacity: ${v.taBtnOpacity ?? ""}`,
              )}
            >
              {v.tAssignBtn2}
            </button>
          </form>
        </div>
      ) : null}
      {v.roleModal ? (
        <div
          data-rsp-modal=""
          onClick={v.closeRoleModal}
          style={{
            position: "fixed",
            inset: "0",
            zIndex: "97",
            display: "grid",
            placeItems: "center",
            padding: "24px",
            background: "rgba(22,36,26,.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <form
            onClick={v.stopClick}
            onSubmit={v.saveRole}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "420px",
              boxSizing: "border-box",
              borderRadius: "28px",
              background: "#ffffff",
              border: "1px solid rgba(22,36,26,.12)",
              boxShadow: "0 32px 80px rgba(22,36,26,.32)",
              padding: "26px",
              display: "grid",
              gap: "12px",
            }}
          >
            <button
              type="button"
              onClick={v.closeRoleModal}
              aria-label={v.tClose}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "34px",
                height: "34px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.14)",
                background: "#ffffff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "22px",
                margin: "0 40px 4px 0",
              }}
            >
              {v.tAddRole}
            </h3>
            <input
              type="text"
              required
              value={v.roleName ?? ""}
              onChange={v.onRoleName}
              placeholder={v.tRoleName}
              style={sx(v.inputStyle)}
            />
            <button
              type="submit"
              style={{
                padding: "14px 20px",
                borderRadius: "999px",
                border: "0",
                background: "#1f7a3a",
                color: "#ffffff",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              {v.tSave}
            </button>
          </form>
        </div>
      ) : null}
      {v.roleFiltered ? <RoleFilteredBlock v={v} /> : null}
    </div>
  );
}
