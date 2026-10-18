import { sx, list } from "../adminRuntime";

export default function RoleFilteredBlock({ v }) {
  return (
    <div
      style={{
        borderRadius: "28px",
        background: "#ffffff",
        border: "1px solid rgba(22,36,26,.12)",
        padding: "20px 22px",
        minWidth: "0",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "20px",
            margin: "0",
            flex: "1",
            minWidth: "0",
          }}
        >
          {v.tRolePeople}
        </h2>
        {v.roleFiltered ? (
          <button
            type="button"
            onClick={v.clearRoleFilter}
            style={{
              padding: "7px 13px",
              borderRadius: "999px",
              border: "1px solid rgba(22,36,26,.2)",
              background: "#ffffff",
              color: "#16241a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {v.roleFilterLabel}
            {" ×"}
          </button>
        ) : null}
      </div>
      <input
        type="search"
        value={v.roleQ ?? ""}
        onChange={v.onRoleQ}
        placeholder={v.tRoleSearch}
        style={{
          width: "100%",
          boxSizing: "border-box",
          marginTop: "12px",
          padding: "12px 18px",
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
          gap: "8px",
          marginTop: "12px",
          maxHeight: "420px",
          overflowY: "auto",
          paddingRight: "4px",
        }}
      >
        {list(v.roleRows).map((rr, i0) => (
          <div
            key={rr.key ?? i0}
            style={{
              display: "grid",
              gridTemplateColumns: "36px minmax(0,1fr) auto 30px",
              alignItems: "center",
              gap: "10px",
              borderRadius: "18px",
              background: "#f4f8f2",
              border: "1px solid rgba(22,36,26,.1)",
              padding: "10px 12px",
            }}
          >
            <span
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "999px",
                background: "#16241a",
                color: "#f6f8f3",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "12px",
              }}
            >
              {rr.initials}
            </span>
            <span style={{ minWidth: "0" }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "14.5px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {rr.name}
              </span>{" "}
              <span
                style={{
                  display: "block",
                  fontSize: "12.5px",
                  color: "rgba(22,36,26,.72)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {rr.meta}
              </span>
            </span>
            <span style={sx(rr.roleStyle)}>{rr.role}</span>
            <button
              type="button"
              onClick={rr.remove}
              aria-label={v.tRemoveRole}
              title={v.tRemoveRole}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.16)",
                background: "#ffffff",
                color: "rgba(22,36,26,.7)",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        ))}
        {v.roleEmpty ? (
          <div style={{ fontSize: "13.5px", color: "rgba(22,36,26,.72)" }}>{v.tRoleEmpty}</div>
        ) : null}
      </div>
      <form
        onSubmit={v.addRole}
        style={{
          display: "grid",
          gap: "10px",
          marginTop: "16px",
          paddingTop: "14px",
          borderTop: "1px solid rgba(22,36,26,.1)",
        }}
      >
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "15px" }}>
          {v.tAssignRole}
        </div>
        <div
          data-rsp="stack"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr)",
            gap: "8px",
          }}
        >
          <input
            type="text"
            required
            value={v.raName ?? ""}
            onChange={v.onRaName}
            placeholder={v.tRaNamePh}
            list="kza-people"
            style={sx(v.inputStyle)}
          />
          <select value={v.raRole ?? ""} onChange={v.onRaRole} style={sx(v.inputStyle)}>
            {list(v.roleOpts).map((o, i0) => (
              <option key={o.key ?? i0} value={o.id ?? ""}>
                {o.name}
              </option>
            ))}
          </select>
          <select value={v.raClub ?? ""} onChange={v.onRaClub} style={sx(v.inputStyle)}>
            {list(v.nsClubs).map((o, i0) => (
              <option key={o.key ?? i0} value={o.id ?? ""}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <datalist id="kza-people">
          {list(v.peopleOpts).map((o, i0) => (
            <option key={o.key ?? i0} value={o.name ?? ""} />
          ))}
        </datalist>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "11px 20px",
              borderRadius: "999px",
              border: "0",
              background: "#1f7a3a",
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "13.5px",
              cursor: "pointer",
              transition: "background .3s",
            }}
            className="kza-ha"
          >
            {v.tAssignBtn}
          </button>
          <span style={{ fontSize: "13px", color: "#1f7a3a" }}>{v.raMsg}</span>
        </div>
      </form>
    </div>
  );
}
