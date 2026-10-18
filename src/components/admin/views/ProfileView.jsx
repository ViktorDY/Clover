import { sx, list } from "../adminRuntime";

export default function ProfileView({ v }) {
  return (
    <div style={{ marginTop: "4px", display: "grid", gap: "16px", maxWidth: "760px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "22px",
          borderRadius: "26px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          padding: "24px 26px",
        }}
      >
        <div style={{ position: "relative", flex: "0 0 auto" }}>
          <span style={sx(v.apAvatar112)}>{v.apAvatarText}</span>
          <label
            title={v.tChangePhoto}
            style={{
              position: "absolute",
              right: "-2px",
              bottom: "-2px",
              width: "38px",
              height: "38px",
              borderRadius: "999px",
              background: "#16241a",
              color: "#f6f8f3",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              border: "3px solid #ffffff",
              transition: "background .3s",
            }}
            className="kza-hf"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <input
              type="file"
              accept="image/*"
              onChange={v.apOnPhoto}
              aria-label={v.tChangePhoto}
              style={{ position: "absolute", width: "1px", height: "1px", opacity: "0", overflow: "hidden" }}
            />
          </label>
        </div>
        <div style={{ flex: "1", minWidth: "200px" }}>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "clamp(24px, 3.4vw, 34px)",
              letterSpacing: "-.03em",
              lineHeight: "1.05",
            }}
          >
            {v.apFullName}
          </div>
          <div style={{ fontSize: "14px", color: "rgba(22,36,26,.62)", marginTop: "6px" }}>
            {v.apRoleLine}
          </div>
          {v.apHasPhoto ? (
            <button
              type="button"
              onClick={v.apRemovePhoto}
              style={{
                marginTop: "12px",
                padding: "8px 16px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.14)",
                background: "transparent",
                color: "rgba(22,36,26,.7)",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "13px",
                cursor: "pointer",
              }}
              className="kza-hg"
            >
              {v.tRemovePhoto}
            </button>
          ) : null}
        </div>
      </div>
      <div
        style={{
          borderRadius: "26px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          padding: "22px 26px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "19px",
              margin: "0",
              flex: "1",
            }}
          >
            {v.tContactInfo}
          </h2>
          {v.apNotEditing ? (
            <button
              type="button"
              onClick={v.apStartEdit}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "13px",
                cursor: "pointer",
              }}
              className="kza-h3"
            >
              {v.tEdit}
            </button>
          ) : null}
        </div>
        {v.apNotEditing ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
                marginTop: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "11.5px",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.55)",
                  }}
                >
                  {v.tEmailL}
                </div>
                <div style={{ fontSize: "16px", marginTop: "4px", wordBreak: "break-all" }}>{v.apEmail}</div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11.5px",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.55)",
                  }}
                >
                  {v.tPhoneL}
                </div>
                <div style={{ fontSize: "16px", marginTop: "4px" }}>{v.apPhone}</div>
              </div>
            </div>
            {v.apContactSaved ? (
              <div
                role="status"
                style={{ marginTop: "12px", fontSize: "14px", color: "#1f7a3a", fontWeight: "600" }}
              >
                {v.tContactSaved}
              </div>
            ) : null}
          </>
        ) : null}
        {v.apEditing ? (
          <form onSubmit={v.apSaveContact} style={{ display: "grid", gap: "12px", marginTop: "16px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "12px",
              }}
            >
              <label
                style={{
                  display: "grid",
                  gap: "6px",
                  fontSize: "11.5px",
                  fontWeight: "600",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "rgba(22,36,26,.6)",
                }}
              >
                {v.tEmailL}
                <input
                  type="email"
                  required
                  value={v.apDraftEmail ?? ""}
                  onChange={v.apOnDraftEmail}
                  style={sx(v.apInput)}
                  className="kza-f7"
                />
              </label>
              <label
                style={{
                  display: "grid",
                  gap: "6px",
                  fontSize: "11.5px",
                  fontWeight: "600",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "rgba(22,36,26,.6)",
                }}
              >
                {v.tPhoneL}
                <input
                  type="tel"
                  required
                  value={v.apDraftPhone ?? ""}
                  onChange={v.apOnDraftPhone}
                  style={sx(v.apInput)}
                  className="kza-f7"
                />
              </label>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="submit"
                style={{
                  padding: "11px 22px",
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
                {v.tSaveL}
              </button>
              <button
                type="button"
                onClick={v.apCancelEdit}
                style={{
                  padding: "11px 20px",
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
                {v.tCancelL}
              </button>
            </div>
          </form>
        ) : null}
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}
      >
        {list(v.apBoxes).map((b, i0) => (
          <button
            key={b.key ?? i0}
            type="button"
            onClick={b.open}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textAlign: "left",
              cursor: "pointer",
              padding: "18px 20px",
              borderRadius: "22px",
              background: "#ffffff",
              border: "1px solid rgba(22,36,26,.12)",
              fontFamily: "var(--font-body)",
              color: "#16241a",
              transition: "transform .25s, box-shadow .25s, border-color .25s",
            }}
            className="kza-hh"
          >
            <span style={{ flex: "1", minWidth: "0" }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "16px",
                }}
              >
                {b.title}
              </span>
              <span
                style={{ display: "block", fontSize: "13px", color: "rgba(22,36,26,.62)", marginTop: "3px" }}
              >
                {b.sub}
              </span>
            </span>{" "}
            <span aria-hidden="true" style={{ color: "rgba(22,36,26,.4)", fontSize: "18px" }}>
              ›
            </span>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <button
          type="button"
          onClick={v.toggleLang}
          style={{
            padding: "12px 22px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.2)",
            background: "#ffffff",
            color: "#16241a",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "14px",
            cursor: "pointer",
          }}
          className="kza-h3"
        >
          {v.tLangBtn}
        </button>
        <button
          type="button"
          onClick={v.onExit}
          style={{
            padding: "12px 22px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.2)",
            background: "#ffffff",
            color: "#16241a",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "14px",
            cursor: "pointer",
          }}
          className="kza-h3"
        >
          {v.tBackToSite}
        </button>
        <a
          href="#/"
          onClick={v.onLogOut}
          style={{
            padding: "12px 22px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.2)",
            background: "#ffffff",
            color: "#16241a",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "14px",
          }}
        >
          {v.tLogout}
        </a>
      </div>
    </div>
  );
}
