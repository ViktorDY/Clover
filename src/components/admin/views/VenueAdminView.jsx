import { sx, list } from "../adminRuntime";
import ImageSlot from "../ImageSlot";

export default function VenueAdminView({ v }) {
  return (
    <div style={{ marginTop: "0", display: "grid", gap: "10px" }}>
      {v.venSavedShow ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "18px",
            background: "rgba(116,205,133,.22)",
            border: "1px solid rgba(116,205,133,.55)",
            padding: "11px 16px",
            fontSize: "14px",
            color: "#16241a",
          }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: "#1f7a3a" }} />
          {v.venSavedText}{" "}
        </div>
      ) : null}
      <div
        style={{
          position: "relative",
          isolation: "isolate",
          overflow: "hidden",
          borderRadius: "28px",
          background: "linear-gradient(165deg, #16241a, #1d3a24 58%, #16241a)",
          color: "#f6f8f3",
          border: "1px solid rgba(238,243,236,.14)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            zIndex: "-1",
            position: "absolute",
            right: "-90px",
            top: "-90px",
            width: "300px",
            height: "300px",
            borderRadius: "999px",
            background: "radial-gradient(circle, rgba(116,205,133,.4), rgba(116,205,133,0) 70%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />
        <button
          type="button"
          onClick={v.bcToggle}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            textAlign: "left",
            padding: "18px 22px",
            border: "0",
            background: "transparent",
            color: "#f6f8f3",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "999px",
              background: "#74cd85",
              animation: "kza-pulse 2.4s ease-in-out infinite",
            }}
          />{" "}
          <span style={{ flex: "1", minWidth: "0" }}>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "19px",
              }}
            >
              {v.tBookCal}
            </span>{" "}
            <span
              style={{ display: "block", fontSize: "13px", color: "rgba(246,248,243,.72)", marginTop: "2px" }}
            >
              {v.bcBoxSub}
            </span>
          </span>{" "}
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "999px",
              background: "rgba(163,226,174,.22)",
              color: "#a3e2ae",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "12px",
            }}
          >
            {v.bcBoxCount}
          </span>{" "}
          <span
            style={sx(
              `display: inline-block; font-size: 18px; transform: ${v.bcArrow ?? ""}; transition: transform .3s`,
            )}
          >
            ⌄
          </span>
        </button>
        <div style={sx(v.bcBoxStyle)}>
          <div
            data-rsp="stack"
            style={sx(
              `display: grid; grid-template-columns: ${v.bcCols ?? ""}; gap: 14px; align-items: start; padding: 0 22px 22px; color: #16241a`,
            )}
          >
            <div
              style={{
                borderRadius: "22px",
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.12)",
                padding: "14px 14px",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div
                    style={{
                      fontSize: "11.5px",
                      fontWeight: "700",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "rgba(22,36,26,.65)",
                    }}
                  >
                    {v.tBcRevenue}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "24px",
                      lineHeight: "1.1",
                      marginTop: "3px",
                    }}
                  >
                    {v.bcRevenue}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "4px",
                      fontSize: "12px",
                      color: "rgba(22,36,26,.7)",
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <span
                        style={{ width: "8px", height: "8px", borderRadius: "999px", background: "#4f8fe0" }}
                      />
                      {v.bcRevMembers}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <span
                        style={{ width: "8px", height: "8px", borderRadius: "999px", background: "#1f7a3a" }}
                      />
                      {v.bcRevGuests}
                    </span>
                    <span>{v.bcRevCount}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={v.bcPrev}
                  aria-label={v.tPrevMonth}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "999px",
                    border: "1px solid rgba(22,36,26,.2)",
                    background: "#ffffff",
                    color: "#16241a",
                    cursor: "pointer",
                  }}
                >
                  ‹
                </button>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "13px",
                    minWidth: "96px",
                    textAlign: "center",
                  }}
                >
                  {v.bcMonthLabel}
                </span>
                <button
                  type="button"
                  onClick={v.bcNext}
                  aria-label={v.tNextMonth}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "999px",
                    border: "1px solid rgba(22,36,26,.2)",
                    background: "#ffffff",
                    color: "#16241a",
                    cursor: "pointer",
                  }}
                >
                  ›
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "8px",
                  fontSize: "12px",
                  color: "rgba(22,36,26,.7)",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "5px",
                      border: "2px solid #1f7a3a",
                      background: "rgba(116,205,133,.2)",
                    }}
                  />
                  {v.tLegGuest}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "5px",
                      border: "2px solid #4f8fe0",
                      background: "rgba(127,184,255,.16)",
                    }}
                  />
                  {v.tLegMember}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "5px",
                      border: "2px dashed rgba(22,36,26,.3)",
                    }}
                  />
                  {v.tLegClosedDay}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, minmax(0,1fr))",
                  gap: "4px",
                  marginTop: "14px",
                }}
              >
                {list(v.bcDow).map((w, i0) => (
                  <span
                    key={w.key ?? i0}
                    style={{
                      textAlign: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "rgba(22,36,26,.6)",
                    }}
                  >
                    {w.label}
                  </span>
                ))}
                {list(v.bcCells).map((c, i0) => (
                  <button
                    key={c.key ?? i0}
                    type="button"
                    onClick={c.pick}
                    disabled={c.disabled}
                    title={c.tip}
                    style={sx(c.style)}
                  >
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "13px",
                      }}
                    >
                      {c.day}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {v.bcOpen ? (
              <div
                style={{
                  borderRadius: "22px",
                  background: "#ffffff",
                  border: "1px solid rgba(22,36,26,.12)",
                  padding: "14px 14px",
                  animation: "kza-slidein .35s cubic-bezier(.2,.7,.2,1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{ flex: "1", minWidth: "0" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "16px",
                        margin: "0",
                      }}
                    >
                      {v.bcDayTitle}
                    </h2>
                    <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", marginTop: "2px" }}>
                      {v.bcDaySub}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={v.bcClose}
                    aria-label={v.tClose}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "999px",
                      border: "1px solid rgba(22,36,26,.18)",
                      background: "#ffffff",
                      color: "#16241a",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    ×
                  </button>
                </div>
                {v.bcDayClosed ? (
                  <div
                    style={{
                      marginTop: "14px",
                      borderRadius: "16px",
                      background: "rgba(22,36,26,.06)",
                      border: "1px dashed rgba(22,36,26,.3)",
                      padding: "12px 14px",
                      fontSize: "13.5px",
                      color: "rgba(22,36,26,.7)",
                    }}
                  >
                    {v.tDayClosedNote}
                  </div>
                ) : null}
                <div style={{ display: "grid", gap: "6px", marginTop: "12px" }}>
                  {list(v.bcSlots).map((sl, i0) => (
                    <div key={sl.key ?? i0} style={sx(sl.style)}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: "800",
                            fontSize: "14px",
                            minWidth: "96px",
                          }}
                        >
                          {sl.time}
                        </span>
                        <span
                          style={{ flex: "1", minWidth: "0", fontSize: "12.5px", color: "rgba(22,36,26,.7)" }}
                        >
                          {sl.summary}
                        </span>
                      </div>
                      {sl.hasBookings ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
                          {list(sl.bookings).map((bk, i1) => (
                            <span key={bk.key ?? i1} title={bk.tip} style={sx(bk.style)}>
                              <span style={{ fontWeight: "800" }}>{bk.unit}</span>
                              {" · "}
                              {bk.who}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div
        data-rsp="stack"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
          gap: "14px",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            borderRadius: "28px",
            background: "#ffffff",
            border: "1px solid rgba(22,36,26,.12)",
            padding: "20px 22px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "19px",
              margin: "0 0 12px",
            }}
          >
            {v.tVenContent}
          </h2>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.7)",
            }}
          >
            {v.tVenPhoto}
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "170px",
              borderRadius: "20px",
              overflow: "hidden",
              marginTop: "8px",
            }}
          >
            <ImageSlot id={v.venPhotoId} shape="rounded" radius="20" placeholder={v.tVenPhotoPh} />
          </div>
          <div style={{ fontSize: "12.5px", color: "rgba(22,36,26,.6)", marginTop: "6px" }}>
            {v.tVenPhotoNote}
          </div>
          <label style={sx(`${v.nsLabel ?? ""}; margin-top: 12px`)}>
            {v.tVenAbout}
            <textarea
              rows="4"
              value={v.venAbout ?? ""}
              onChange={v.onVenAbout}
              placeholder={v.tVenAboutPh}
              style={sx(v.areaStyle)}
            />
          </label>
          <label style={sx(`${v.nsLabel ?? ""}; margin-top: 10px`)}>
            {v.tVenCancel}{" "}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="number"
                min="0"
                max="72"
                value={v.venCancel ?? ""}
                onChange={v.onVenCancel}
                style={sx(v.inputStyle)}
              />
              <span style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", whiteSpace: "nowrap" }}>
                {v.tVenCancelUnit}
              </span>
            </div>
          </label>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.7)",
              marginTop: "12px",
            }}
          >
            {v.tVenIncludes}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
            {list(v.venIncludes).map((inc, i0) => (
              <button
                key={inc.key ?? i0}
                type="button"
                onClick={inc.remove}
                title={v.tVenRemoveInc}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 12px",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,36,26,.16)",
                  background: "rgba(22,36,26,.06)",
                  color: "#16241a",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
                className="kza-he"
              >
                {inc.label}{" "}
                <span aria-hidden="true" style={{ opacity: ".6" }}>
                  ×
                </span>
              </button>
            ))}
            <form onSubmit={v.venAddInc} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="text"
                value={v.venIncDraft ?? ""}
                onChange={v.onVenIncDraft}
                placeholder={v.tVenIncPh}
                style={{
                  width: "150px",
                  padding: "7px 12px",
                  borderRadius: "999px",
                  border: "1px dashed rgba(22,36,26,.3)",
                  background: "#f7f9f5",
                  color: "#16241a",
                  fontFamily: "var(--font-body)",
                  fontSize: "12.5px",
                  outline: "none",
                }}
                className="kza-f7"
              />
              <button
                type="submit"
                style={{
                  padding: "7px 12px",
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
                {v.tVenIncAdd}
              </button>
            </form>
          </div>
          <div style={{ height: "1px", background: "rgba(22,36,26,.1)", margin: "18px 0 14px" }} />
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "19px",
              margin: "0 0 12px",
            }}
          >
            {v.tVenPrices}
          </h2>
          <div style={{ display: "grid", gap: "10px" }}>
            <label style={sx(v.nsLabel)}>
              {v.tVenPrice}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "14px", color: "rgba(22,36,26,.7)" }}>kr</span>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={v.venPrice ?? ""}
                  onChange={v.onVenPrice}
                  style={sx(v.inputStyle)}
                />
                <span style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", whiteSpace: "nowrap" }}>
                  {v.tPerHour}
                </span>
              </div>
            </label>
            <label style={sx(v.nsLabel)}>
              {v.tVenMemberPrice}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "14px", color: "rgba(22,36,26,.7)" }}>kr</span>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={v.venMemberPrice ?? ""}
                  onChange={v.onVenMemberPrice}
                  style={sx(v.inputStyle)}
                />
                <span style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", whiteSpace: "nowrap" }}>
                  {v.tPerHour}
                </span>
              </div>
            </label>
            <div
              style={{
                borderRadius: "16px",
                background: "rgba(116,205,133,.16)",
                border: "1px solid rgba(116,205,133,.45)",
                padding: "10px 14px",
                fontSize: "13px",
                color: "#16241a",
              }}
            >
              {v.venDiscountNote}
            </div>
          </div>
          <div style={{ height: "1px", background: "rgba(22,36,26,.1)", margin: "18px 0 14px" }} />
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "19px",
              margin: "0 0 12px",
            }}
          >
            {v.tVenRules}
          </h2>
          <div
            data-rsp="stack"
            style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "10px" }}
          >
            <label style={sx(v.nsLabel)}>
              {v.tVenSlot}{" "}
              <select value={v.venSlot ?? ""} onChange={v.onVenSlot} style={sx(v.inputStyle)}>
                <option value="30">30 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
              </select>
            </label>
            <label style={sx(v.nsLabel)}>
              {v.tVenMax}
              <input
                type="number"
                min="1"
                max="8"
                value={v.venMax ?? ""}
                onChange={v.onVenMax}
                style={sx(v.inputStyle)}
              />
            </label>
            <label style={sx(v.nsLabel)}>
              {v.tVenLead}
              <input
                type="number"
                min="1"
                max="365"
                value={v.venLead ?? ""}
                onChange={v.onVenLead}
                style={sx(v.inputStyle)}
              />
            </label>
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "rgba(22,36,26,.7)",
              marginTop: "14px",
            }}
          >
            {v.tVenWho}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
            {list(v.venAudienceOpts).map((ao, i0) => (
              <button key={ao.key ?? i0} type="button" onClick={ao.pick} style={sx(ao.style)}>
                {ao.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: "12.5px", color: "rgba(22,36,26,.65)", marginTop: "6px" }}>
            {v.venAudienceNote}
          </div>
          {v.venShowMemberWindow ? (
            <>
              <div
                data-rsp="stack"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <label style={sx(v.nsLabel)}>
                  {v.tVenMemberFrom}
                  <input
                    type="time"
                    value={v.venMemberFrom ?? ""}
                    onChange={v.onVenMemberFrom}
                    style={sx(v.inputStyle)}
                  />
                </label>
                <label style={sx(v.nsLabel)}>
                  {v.tVenMemberTo}
                  <input
                    type="time"
                    value={v.venMemberTo ?? ""}
                    onChange={v.onVenMemberTo}
                    style={sx(v.inputStyle)}
                  />
                </label>
              </div>
              <div style={{ fontSize: "12.5px", color: "rgba(22,36,26,.65)", marginTop: "6px" }}>
                {v.tVenMemberWindowNote}
              </div>
            </>
          ) : null}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "12px",
              fontSize: "13.5px",
              color: "#16241a",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={!!v.venMemberEarly}
              onChange={v.onVenMemberEarly}
              style={{ width: "16px", height: "16px", accentColor: "#1f7a3a" }}
            />
            {v.tVenMemberEarly}{" "}
          </label>
          <label style={sx(`${v.nsLabel ?? ""}; margin-top: 10px`)}>
            {v.tVenNote}
            <textarea
              rows="2"
              value={v.venNote ?? ""}
              onChange={v.onVenNote}
              placeholder={v.tVenNotePh}
              style={sx(v.areaStyle)}
            />
          </label>
        </div>
        <div style={{ display: "grid", gap: "14px", alignContent: "start" }}>
          <div
            style={{
              borderRadius: "28px",
              background: "#ffffff",
              border: "1px solid rgba(22,36,26,.12)",
              padding: "20px 22px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "19px",
                  margin: "0",
                  flex: "1",
                  minWidth: "0",
                }}
              >
                {v.tManual}
              </h2>
              <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.7)", whiteSpace: "nowrap" }}>
                {v.manualCount}
              </span>
            </div>
            <div style={{ fontSize: "13px", color: "rgba(22,36,26,.7)", marginTop: "4px" }}>
              {v.tManualHint}
            </div>
            <form onSubmit={v.mbSubmit} style={{ display: "grid", gap: "10px", marginTop: "12px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "10px",
                }}
              >
                <label style={sx(`${v.nsLabel ?? ""}; min-width: 0`)}>
                  {v.tMbDate}
                  <input
                    type="date"
                    required
                    value={v.mbDate ?? ""}
                    onChange={v.onMbDate}
                    style={sx(`${v.inputStyle ?? ""}; min-width: 0`)}
                  />
                </label>
                <label style={sx(`${v.nsLabel ?? ""}; min-width: 0`)}>
                  {v.tMbTime}
                  <input
                    type="time"
                    required
                    value={v.mbTime ?? ""}
                    onChange={v.onMbTime}
                    style={sx(`${v.inputStyle ?? ""}; min-width: 0`)}
                  />
                </label>
                <label style={sx(v.nsLabel)}>
                  {v.tMbUnit}{" "}
                  <select value={v.mbUnit ?? ""} onChange={v.onMbUnit} style={sx(v.inputStyle)}>
                    {list(v.mbUnitOpts).map((o, i0) => (
                      <option key={o.key ?? i0} value={o.id ?? ""}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div
                data-rsp="stack"
                style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "10px" }}
              >
                <label style={sx(v.nsLabel)}>
                  {v.tMbName}
                  <input
                    type="text"
                    required
                    value={v.mbName ?? ""}
                    onChange={v.onMbName}
                    placeholder={v.tMbNamePh}
                    style={sx(v.inputStyle)}
                  />
                </label>
                <label style={sx(v.nsLabel)}>
                  {v.tMbNote}
                  <input
                    type="text"
                    value={v.mbNote ?? ""}
                    onChange={v.onMbNote}
                    placeholder={v.tMbNotePh}
                    style={sx(v.inputStyle)}
                  />
                </label>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
                <button
                  type="submit"
                  style={{
                    padding: "11px 20px",
                    borderRadius: "999px",
                    border: "0",
                    background: "#16241a",
                    color: "#f6f8f3",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "13.5px",
                    cursor: "pointer",
                    transition: "background .3s",
                  }}
                  className="kza-hf"
                >
                  {v.tMbAdd}
                </button>
                {v.mbSavedShow ? (
                  <span style={{ fontSize: "13px", color: "#1f7a3a" }}>{v.mbSavedText}</span>
                ) : null}
              </div>
            </form>
            {v.manualHas ? (
              <div
                style={{
                  display: "grid",
                  gap: "6px",
                  marginTop: "14px",
                  maxHeight: "220px",
                  overflowY: "auto",
                  paddingRight: "4px",
                }}
              >
                {list(v.manualList).map((mb, i0) => (
                  <div
                    key={mb.key ?? i0}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "60px minmax(0,1fr) auto",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "16px",
                      background: "#f4f8f2",
                      border: "1px solid rgba(22,36,26,.1)",
                      padding: "9px 12px",
                    }}
                  >
                    <span style={{ textAlign: "center" }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "16px",
                        }}
                      >
                        {mb.day}
                      </span>{" "}
                      <span
                        style={{
                          display: "block",
                          fontSize: "10.5px",
                          letterSpacing: ".06em",
                          textTransform: "uppercase",
                          color: "rgba(22,36,26,.65)",
                        }}
                      >
                        {mb.mon}
                      </span>
                    </span>
                    <span style={{ minWidth: "0" }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "14px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {mb.who}
                      </span>{" "}
                      <span style={{ display: "block", fontSize: "12.5px", color: "rgba(22,36,26,.7)" }}>
                        {mb.meta}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={mb.remove}
                      title={v.tMbRemove}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "999px",
                        border: "1px solid rgba(22,36,26,.18)",
                        background: "#ffffff",
                        color: "#16241a",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div
            style={{
              borderRadius: "28px",
              background: "#ffffff",
              border: "1px solid rgba(22,36,26,.12)",
              padding: "20px 22px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "19px",
                  margin: "0",
                  flex: "1",
                  minWidth: "0",
                }}
              >
                {v.venName}
              </h2>
              <span style={{ fontSize: "13px", color: "rgba(22,36,26,.7)" }}>{v.venMeta}</span>
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(22,36,26,.7)",
                marginTop: "16px",
              }}
            >
              {v.tVenHours}
            </div>
            <div style={{ fontSize: "12.5px", color: "rgba(22,36,26,.65)", marginTop: "4px" }}>
              {v.tVenHoursHint}
            </div>
            <div style={{ display: "grid", gap: "6px", marginTop: "8px" }}>
              {list(v.venDays).map((d, i0) => (
                <div
                  key={d.key ?? i0}
                  style={sx(
                    `display: grid; grid-template-columns: 90px auto minmax(0,1fr) 16px minmax(0,1fr); align-items: center; gap: 6px 8px; padding: 8px 12px; border-radius: 16px; background: ${d.bg ?? ""}`,
                  )}
                >
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "14px" }}>
                    {d.name}
                  </span>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12.5px",
                      color: "rgba(22,36,26,.75)",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!d.open}
                      onChange={d.toggle}
                      style={{ width: "16px", height: "16px", accentColor: "#1f7a3a" }}
                    />
                    {d.openLabel}{" "}
                  </label>
                  <input
                    type="time"
                    value={d.from ?? ""}
                    onChange={d.onFrom}
                    disabled={d.disabled}
                    style={sx(d.inputStyle)}
                  />
                  <span style={{ textAlign: "center", color: "rgba(22,36,26,.6)" }}>–</span>
                  <input
                    type="time"
                    value={d.to ?? ""}
                    onChange={d.onTo}
                    disabled={d.disabled}
                    style={sx(d.inputStyle)}
                  />
                  {d.open ? (
                    <div
                      style={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "6px",
                        paddingTop: "4px",
                      }}
                    >
                      <span style={{ fontSize: "11.5px", color: "rgba(22,36,26,.7)", marginRight: "2px" }}>
                        {d.unitsLabel}
                      </span>
                      {list(d.units).map((u, i1) => (
                        <button
                          key={u.key ?? i1}
                          type="button"
                          onClick={u.toggle}
                          title={u.tip}
                          style={sx(u.style)}
                        >
                          {u.label}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={d.allUnits}
                        style={{
                          marginLeft: "4px",
                          padding: "5px 10px",
                          borderRadius: "999px",
                          border: "1px solid rgba(22,36,26,.18)",
                          background: "transparent",
                          color: "rgba(22,36,26,.72)",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "11px",
                          cursor: "pointer",
                        }}
                        className="kza-h3"
                      >
                        {d.allLabel}
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(22,36,26,.7)",
                marginTop: "18px",
              }}
            >
              {v.tVenClosed}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <input
                type="date"
                value={v.venCloseDate ?? ""}
                onChange={v.onVenCloseDate}
                style={{
                  padding: "9px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,36,26,.2)",
                  background: "#ffffff",
                  color: "#16241a",
                  fontFamily: "var(--font-body)",
                  fontSize: "13.5px",
                }}
              />
              <button
                type="button"
                onClick={v.venAddClosed}
                style={{
                  padding: "9px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,36,26,.2)",
                  background: "#ffffff",
                  color: "#16241a",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "12.5px",
                  cursor: "pointer",
                }}
                className="kza-h3"
              >
                {v.tVenAddClosed}
              </button>
              {list(v.venClosedList).map((c, i0) => (
                <button
                  key={c.key ?? i0}
                  type="button"
                  onClick={c.remove}
                  title={v.tVenRemove}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 12px",
                    borderRadius: "999px",
                    border: "1px solid rgba(236,48,19,.4)",
                    background: "rgba(236,48,19,.08)",
                    color: "#8a1a08",
                    fontSize: "12.5px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {c.label} <span aria-hidden="true">×</span>
                </button>
              ))}
              {v.venNoClosed ? (
                <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.6)" }}>{v.tVenNoClosed}</span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <button type="button" onClick={v.venSave} disabled={v.venClean} style={sx(v.venSaveStyle)}>
          {v.tVenSave}
        </button>
        <button
          type="button"
          onClick={v.venDiscard}
          disabled={v.venClean}
          style={{
            padding: "13px 18px",
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
          {v.tVenDiscard}
        </button>
        <a
          href={`#/booking?klubb=${v.venClubSlug ?? ""}`}
          style={{
            marginLeft: "auto",
            padding: "13px 18px",
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
          {v.tVenPreview}
          {" →"}
        </a>
      </div>
    </div>
  );
}
