import { list } from "../adminRuntime";

export default function GroupModal({ v }) {
  return (
    <div
      data-rsp-modal=""
      onClick={v.closeDeptModal}
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "97",
        display: "grid",
        placeItems: "center",
        padding: "20px",
        background: "rgba(22,36,26,.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      <form
        onClick={v.stopClick}
        onSubmit={v.saveDeptModal}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "620px",
          maxHeight: "calc(100vh - 40px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxSizing: "border-box",
          borderRadius: "22px",
          background: "#f6f8f3",
          border: "1px solid rgba(22,36,26,.12)",
          boxShadow: "0 32px 80px rgba(22,36,26,.32)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "20px 26px",
            background: "#ffffff",
            borderBottom: "1px solid rgba(22,36,26,.12)",
          }}
        >
          <h3
            style={{
              flex: "1",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "22px",
              margin: "0",
            }}
          >
            {v.tNewGroup}
          </h3>
          <button
            type="button"
            onClick={v.closeDeptModal}
            aria-label={v.tClose}
            style={{
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
        </div>
        <div style={{ overflowY: "auto", padding: "24px 26px", display: "grid", gap: "22px" }}>
          <div>
            <div style={{ fontSize: "14.5px", color: "#16241a" }}>
              {v.tGmDept}
              <span style={{ color: "#a3282f" }}>{" *"}</span>
            </div>
            <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", margin: "2px 0 8px" }}>
              {v.tGmDeptHelp}
            </div>
            <select
              required
              value={v.dmParent ?? ""}
              onChange={v.onDmParent}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "14.5px",
                outline: "none",
                maxWidth: "360px",
              }}
            >
              <option value="">{v.tSelectList}</option>
              {list(v.dmParentOptions).map((o, i0) => (
                <option key={o.key ?? i0} value={o.id ?? ""}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div style={{ fontSize: "14.5px", color: "#16241a" }}>
              {v.tGmShort}
              <span style={{ color: "#a3282f" }}>{" *"}</span>
            </div>
            <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", margin: "2px 0 8px" }}>
              {v.tGmShortHelp}
            </div>
            <input
              type="text"
              required
              maxLength="30"
              value={v.gmShort ?? ""}
              onChange={v.onGmShort}
              placeholder={v.tGmShortPh}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "14.5px",
                outline: "none",
                maxWidth: "260px",
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: "14.5px", color: "#16241a" }}>
              {v.tGmFull}
              <span style={{ color: "#a3282f" }}>{" *"}</span>
            </div>
            <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", margin: "2px 0 8px" }}>
              {v.tGmFullHelp}
            </div>
            <input
              type="text"
              required
              maxLength="60"
              value={v.gmFull ?? ""}
              onChange={v.onGmFull}
              placeholder={v.tGmFullPh}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "14.5px",
                outline: "none",
                maxWidth: "360px",
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: "14.5px", color: "#16241a" }}>{v.tGmDesc}</div>
            <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", margin: "2px 0 8px" }}>
              {v.tGmDescHelp}
            </div>
            <textarea
              maxLength="250"
              rows="3"
              value={v.gmDesc ?? ""}
              onChange={v.onGmDesc}
              placeholder={v.tOptional}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "14.5px",
                outline: "none",
                maxWidth: "360px",
                resize: "none",
                lineHeight: "1.5",
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: "14.5px", color: "#16241a" }}>
              {v.tGmContact}
              <span style={{ color: "#a3282f" }}>{" *"}</span>
            </div>
            <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", margin: "2px 0 8px" }}>
              {v.tGmContactHelp}
            </div>
            <select
              required
              value={v.gmContact ?? ""}
              onChange={v.onGmContact}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "14.5px",
                outline: "none",
                maxWidth: "360px",
              }}
            >
              <option value="">{v.tSelectList}</option>
              {list(v.gmContactOpts).map((o, i0) => (
                <option key={o.key ?? i0} value={o.name ?? ""}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div style={{ fontSize: "14.5px", color: "#16241a" }}>
              {v.tGmActivity}
              <span style={{ color: "#a3282f" }}>{" *"}</span>
            </div>
            <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", margin: "2px 0 8px" }} />
            <select
              required
              value={v.gmActivity ?? ""}
              onChange={v.onGmActivity}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "14.5px",
                outline: "none",
                maxWidth: "230px",
              }}
            >
              {list(v.gmActivityOpts).map((o, i0) => (
                <option key={o.key ?? i0} value={o.name ?? ""}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div style={{ fontSize: "14.5px", color: "#16241a" }}>
              {v.tGmAge}
              <span style={{ color: "#a3282f" }}>{" *"}</span>
            </div>
            <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", margin: "2px 0 8px" }} />
            <select
              required
              value={v.gmAge ?? ""}
              onChange={v.onGmAge}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-body)",
                fontSize: "14.5px",
                outline: "none",
                maxWidth: "230px",
              }}
            >
              {list(v.gmAgeOpts).map((o, i0) => (
                <option key={o.key ?? i0} value={o.name ?? ""}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            gap: "10px",
            padding: "16px 26px",
            background: "#ffffff",
            borderTop: "1px solid rgba(22,36,26,.12)",
          }}
        >
          <button
            type="button"
            onClick={v.closeDeptModal}
            style={{
              padding: "12px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(22,36,26,.2)",
              background: "#ffffff",
              color: "#16241a",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {v.tCancel}
          </button>
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              border: "0",
              background: "#1f7a3a",
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
            }}
            className="kza-ha"
          >
            {v.tSave}
          </button>
        </div>
      </form>
    </div>
  );
}
