import { sx, list } from "../adminRuntime";

export default function ProfileDetail({ v }) {
  return (
    <div
      data-rsp-modal=""
      onClick={v.apCloseDetail}
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "98",
        display: "grid",
        placeItems: "center",
        padding: "20px",
        background: "rgba(22,36,26,.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={v.apDetailTitle}
        onClick={v.stopClick}
        style={{
          width: "100%",
          maxWidth: "560px",
          maxHeight: "calc(100vh - 40px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: "26px",
          background: "#ffffff",
          boxShadow: "0 32px 80px rgba(22,36,26,.32)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "20px 24px",
            borderBottom: "1px solid rgba(22,36,26,.1)",
          }}
        >
          <h3
            style={{
              flex: "1",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "21px",
              margin: "0",
            }}
          >
            {v.apDetailTitle}
          </h3>
          <button
            type="button"
            onClick={v.apCloseDetail}
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
        <div style={{ overflowY: "auto", padding: "22px 24px", display: "grid", gap: "16px" }}>
          {v.apIsAccount ? (
            <form onSubmit={v.apSaveAccount} style={{ display: "grid", gap: "14px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
                  {v.tFirst}
                  <input
                    type="text"
                    required
                    value={v.apDFirst ?? ""}
                    onChange={v.apOnDFirst}
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
                  {v.tLast}
                  <input
                    type="text"
                    required
                    value={v.apDLast ?? ""}
                    onChange={v.apOnDLast}
                    style={sx(v.apInput)}
                    className="kza-f7"
                  />
                </label>
              </div>
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
                {v.tBirth}
                <input
                  type="date"
                  value={v.apDBirth ?? ""}
                  onChange={v.apOnDBirth}
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
                {v.tRegion}{" "}
                <select value={v.apDRegion ?? ""} onChange={v.apOnDRegion} style={sx(v.apInput)}>
                  {list(v.apRegions).map((r, i0) => (
                    <option key={r.key ?? i0} value={r.v ?? ""}>
                      {r.v}
                    </option>
                  ))}
                </select>
              </label>
              <div style={{ display: "grid", gap: "6px" }}>
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.6)",
                  }}
                >
                  {v.tLanguage}
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  {list(v.apLangOpts).map((o, i0) => (
                    <button key={o.key ?? i0} type="button" onClick={o.pick} style={sx(o.style)}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                  {v.tSaveL}
                </button>
                {v.apAcctSaved ? (
                  <span role="status" style={{ fontSize: "14px", color: "#1f7a3a", fontWeight: "600" }}>
                    {v.tSavedShort}
                  </span>
                ) : null}
              </div>
            </form>
          ) : null}
          {v.apIsSecurity ? (
            <div style={{ display: "grid", gap: "18px" }}>
              <div style={{ display: "grid", gap: "12px" }}>
                <button type="button" onClick={v.apTogglePw} style={sx(v.apPwBtnStyle)}>
                  {v.apPwBtnLabel}
                </button>
                {v.apPwOpen ? (
                  <form onSubmit={v.apSavePw} style={{ display: "grid", gap: "10px" }}>
                    <input
                      type="password"
                      required
                      placeholder={v.tCurPw}
                      value={v.apPwCur ?? ""}
                      onChange={v.apOnPwCur}
                      style={sx(v.apInput)}
                      className="kza-f7"
                    />
                    <input
                      type="password"
                      required
                      placeholder={v.tNewPw}
                      value={v.apPwNew ?? ""}
                      onChange={v.apOnPwNew}
                      style={sx(v.apInput)}
                      className="kza-f7"
                    />
                    <input
                      type="password"
                      required
                      placeholder={v.tRepPw}
                      value={v.apPwRep ?? ""}
                      onChange={v.apOnPwRep}
                      style={sx(v.apInput)}
                      className="kza-f7"
                    />
                    {v.apPwErr ? (
                      <div role="alert" style={{ fontSize: "13.5px", color: "#a3282f" }}>
                        {v.apPwErr}
                      </div>
                    ) : null}
                    <button
                      type="submit"
                      style={{
                        justifySelf: "start",
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
                      {v.tSaveL}
                    </button>
                  </form>
                ) : null}
                {v.apPwDone ? (
                  <div role="status" style={{ fontSize: "14px", color: "#1f7a3a", fontWeight: "600" }}>
                    {v.tPwDone}
                  </div>
                ) : null}
              </div>
              <div style={{ height: "1px", background: "rgba(22,36,26,.1)" }} />
              <div style={{ display: "grid", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ flex: "1", minWidth: "0" }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "16px",
                      }}
                    >
                      {v.tTwoStep}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "13px",
                        color: "rgba(22,36,26,.62)",
                        marginTop: "3px",
                      }}
                    >
                      {v.tTwoStepSub}
                    </span>
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={v.apTwoOn}
                    aria-label={v.tTwoStep}
                    onClick={v.apToggleTwo}
                    style={sx(v.apTwoTrack)}
                  >
                    <span style={sx(v.apTwoKnob)} />
                  </button>
                </div>
                {v.apTwoOn ? (
                  <div style={{ display: "grid", gap: "10px" }}>
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
                      {v.tCodePhone}
                      <input
                        type="tel"
                        value={v.apTwoPhone ?? ""}
                        onChange={v.apOnTwoPhone}
                        style={sx(v.apInput)}
                        className="kza-f7"
                      />
                    </label>
                    <div style={{ fontSize: "13px", color: "rgba(22,36,26,.62)" }}>{v.apTwoNote}</div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          {v.apIsNotifs ? (
            <div style={{ display: "grid", gap: "4px" }}>
              {list(v.apNotifRows).map((n, i0) => (
                <div
                  key={n.key ?? i0}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(22,36,26,.08)",
                  }}
                >
                  <span style={{ flex: "1", minWidth: "0", fontSize: "15px" }}>{n.label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={n.on}
                    aria-label={n.label}
                    onClick={n.toggle}
                    style={sx(n.track)}
                  >
                    <span style={sx(n.knob)} />
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          {v.apIsClubs ? (
            <div style={{ display: "grid", gap: "10px" }}>
              {list(v.apClubList).map((c, i0) => (
                <div
                  key={c.key ?? i0}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 16px",
                    borderRadius: "18px",
                    background: "#f4f8f2",
                    border: "1px solid rgba(22,36,26,.08)",
                  }}
                >
                  <span
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "999px",
                      background: "#CDEFD3",
                      border: "1px solid #74cd85",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "13px",
                    }}
                  >
                    {c.initials}
                  </span>
                  <span style={{ flex: "1", minWidth: "0" }}>
                    <span style={{ display: "block", fontWeight: "600" }}>{c.name}</span>
                    <span style={{ display: "block", fontSize: "12.5px", color: "rgba(22,36,26,.62)" }}>
                      {v.tAdminRole}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          {v.apIsHelp ? (
            <div
              style={{
                display: "grid",
                gap: "12px",
                fontSize: "15px",
                lineHeight: "1.6",
                color: "rgba(22,36,26,.8)",
              }}
            >
              <p style={{ margin: "0" }}>{v.tHelpText}</p>
              <a
                href="mailto:hei@kretz.no"
                style={{
                  justifySelf: "start",
                  padding: "12px 22px",
                  borderRadius: "999px",
                  background: "#74cd85",
                  color: "#16241a",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                hei@kretz.no
              </a>
            </div>
          ) : null}
          {v.apIsPrivacy ? (
            <div
              style={{
                display: "grid",
                gap: "12px",
                fontSize: "15px",
                lineHeight: "1.6",
                color: "rgba(22,36,26,.8)",
              }}
            >
              <p style={{ margin: "0" }}>{v.tPrivacyText}</p>
              <a
                href="#/vilkar"
                style={{
                  justifySelf: "start",
                  padding: "12px 22px",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,36,26,.2)",
                  background: "#ffffff",
                  color: "#16241a",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
                className="kza-h3"
              >
                {v.tTermsLink}
                {" →"}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
