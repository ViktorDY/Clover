import { sx, list } from "../adminRuntime";
import ImageSlot from "../ImageSlot";

export default function ComposeModal({ v }) {
  return (
    <div
      data-rsp-modal=""
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "80",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "rgba(22,36,26,.75)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          maxHeight: "88vh",
          overflowY: "auto",
          borderRadius: "34px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          boxShadow: "0 36px 90px rgba(22,36,26,.32)",
          padding: "30px 32px",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <button
          type="button"
          onClick={v.closeCompose}
          aria-label={v.tClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "36px",
            height: "36px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.14)",
            background: "#ffffff",
            color: "#16241a",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background .3s",
          }}
          className="kza-h3"
        >
          ×
        </button>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "26px",
            margin: "0 34px 6px 0",
          }}
        >
          {v.composeTitle}
        </h3>
        <p style={{ margin: "0 0 18px", fontSize: "15px", color: "rgba(22,36,26,.66)" }}>{v.composeNote}</p>
        <form onSubmit={v.submitCompose} style={{ display: "grid", gap: "12px" }}>
          <select value={v.formClub ?? ""} onChange={v.onFormClub} style={sx(v.inputStyle)}>
            {list(v.formClubs).map((c, i0) => (
              <option key={c.key ?? i0} value={c.id ?? ""}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            required
            value={v.formTitle ?? ""}
            onChange={v.onFormTitle}
            placeholder={v.tTitlePh}
            style={sx(v.inputStyle)}
          />
          {v.isActivity ? (
            <>
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.75)",
                    marginBottom: "8px",
                  }}
                >
                  {v.tRecipients}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {list(v.recipientOptions).map((r, i0) => (
                    <button key={r.key ?? i0} type="button" onClick={r.toggle} style={sx(r.style)}>
                      {r.label}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(22,36,26,.75)", marginTop: "8px" }}>
                  {v.recipientNote}
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "160px",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <ImageSlot id={v.eventSlotId} shape="rounded" radius="20" placeholder={v.tDropPhoto} />
              </div>
              <div
                data-rsp="stack"
                style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "12px" }}
              >
                <input
                  type="date"
                  required
                  value={v.formDate ?? ""}
                  onChange={v.onFormDate}
                  style={sx(v.inputStyle)}
                />
                <input
                  type="time"
                  required
                  value={v.formTime ?? ""}
                  onChange={v.onFormTime}
                  style={sx(v.inputStyle)}
                />
              </div>
              <input
                type="text"
                required
                value={v.formPlace ?? ""}
                onChange={v.onFormPlace}
                placeholder={v.tPlacePh}
                style={sx(v.inputStyle)}
              />
              <div
                data-rsp="stack"
                style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "12px" }}
              >
                <input
                  type="text"
                  required
                  value={v.formLeader ?? ""}
                  onChange={v.onFormLeader}
                  placeholder={v.tLeaderPh}
                  style={sx(v.inputStyle)}
                />
                <input
                  type="number"
                  min="1"
                  required
                  value={v.formCap ?? ""}
                  onChange={v.onFormCap}
                  placeholder={v.tCapPh}
                  style={sx(v.inputStyle)}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.75)",
                    marginBottom: "6px",
                  }}
                >
                  {v.tAnswerBy}
                </div>
                <input
                  type="date"
                  required
                  value={v.formDeadline ?? ""}
                  onChange={v.onFormDeadline}
                  style={sx(v.inputStyle)}
                />
              </div>
            </>
          ) : null}
          <textarea
            required
            value={v.formText ?? ""}
            onChange={v.onFormText}
            placeholder={v.tTextPh}
            rows="4"
            style={sx(v.areaStyle)}
          />
          {v.isActivity ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.75)",
                  }}
                >
                  {v.tInternalText}
                </span>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: "rgba(124,77,207,.14)",
                    color: "#5a2fa3",
                    fontSize: "10.5px",
                    fontWeight: "700",
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                  }}
                >
                  {v.tAdminsOnly}
                </span>
              </div>
              <textarea
                value={v.formInternal ?? ""}
                onChange={v.onFormInternal}
                placeholder={v.tInternalPh}
                rows="3"
                style={sx(v.areaStyle)}
              />
            </div>
          ) : null}
          {v.isPost ? (
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "14px",
                color: "rgba(22,36,26,.72)",
              }}
            >
              <input
                type="checkbox"
                checked={!!v.formHigh}
                onChange={v.onFormHigh}
                style={{ width: "18px", height: "18px", accentColor: "#1f7a3a" }}
              />{" "}
              {v.tHighPriority}{" "}
            </label>
          ) : null}
          <div style={{ display: "grid", gap: "6px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "rgba(22,36,26,.72)",
              }}
            >
              {v.tAttachLabel}
            </span>
            {list(v.formFileRows).map((af, i0) => (
              <div
                key={af.key ?? i0}
                style={{
                  display: "grid",
                  gridTemplateColumns: "34px minmax(0,1fr) 28px",
                  alignItems: "center",
                  gap: "10px",
                  padding: "7px 10px",
                  borderRadius: "14px",
                  background: "#f7f9f5",
                  border: "1px solid rgba(22,36,26,.1)",
                }}
              >
                <span style={sx(af.iconStyle)}>{af.ext}</span>
                <span style={{ minWidth: "0" }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {af.name}
                  </span>{" "}
                  <span style={{ display: "block", fontSize: "11.5px", color: "rgba(22,36,26,.7)" }}>
                    {af.meta}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={af.remove}
                  aria-label={v.tRemoveFile}
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
            <label
              style={{
                position: "relative",
                display: "inline-flex",
                justifySelf: "start",
                alignItems: "center",
                gap: "8px",
                padding: "9px 15px",
                borderRadius: "999px",
                border: "1px dashed rgba(31,122,58,.55)",
                background: "#ffffff",
                color: "#1f7a3a",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "12.5px",
                cursor: "pointer",
              }}
              className="kza-h3"
            >
              {" 📎 "}
              {v.tAttachAdd}{" "}
              <input
                type="file"
                multiple
                accept=".pdf,application/pdf,.xls,.xlsx,.csv,.doc,.docx,image/*"
                onChange={v.onFormFiles}
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  opacity: "0",
                  pointerEvents: "none",
                }}
              />
            </label>
            <span style={{ fontSize: "11.5px", color: "rgba(22,36,26,.65)" }}>{v.tAttachTypes}</span>
          </div>
          <button
            type="submit"
            style={{
              marginTop: "4px",
              padding: "15px 26px",
              borderRadius: "999px",
              border: "0",
              background: "#1f7a3a",
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "15px",
              cursor: "pointer",
              transition: "background .3s",
            }}
            className="kza-ha"
          >
            {v.composeCta}
          </button>
          {v.composeDone ? (
            <div
              style={{
                borderRadius: "20px",
                background: "rgba(116,205,133,.22)",
                border: "1px solid rgba(116,205,133,.5)",
                padding: "14px 16px",
                fontSize: "14px",
                color: "#16241a",
              }}
            >
              {v.composeDoneText}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
