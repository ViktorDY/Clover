import { sx, list } from "../adminRuntime";

export default function DailySide({ v }) {
  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <div
        style={{
          borderRadius: "30px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          padding: "24px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "20px",
            margin: "0 0 4px",
          }}
        >
          {v.tNewActivity}
        </h2>
        <div style={{ fontSize: "13px", color: "rgba(22,36,26,.75)" }}>{v.tNewActivityNote}</div>
        <form onSubmit={v.quickActivity} style={{ display: "grid", gap: "10px", marginTop: "16px" }}>
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
          <div
            data-rsp="stack"
            style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "10px" }}
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
            style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "10px" }}
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
          <button
            type="submit"
            style={{
              padding: "13px 22px",
              borderRadius: "999px",
              border: "0",
              background: "#1f7a3a",
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background .3s",
            }}
            className="kza-ha"
          >
            {v.tPublishActivity}
          </button>
          {v.actDone ? (
            <div
              style={{
                borderRadius: "18px",
                background: "rgba(116,205,133,.22)",
                border: "1px solid rgba(116,205,133,.5)",
                padding: "12px 14px",
                fontSize: "13.5px",
              }}
            >
              {v.tActDone}
            </div>
          ) : null}
        </form>
      </div>
      <div
        style={{
          borderRadius: "30px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          padding: "24px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "20px",
            margin: "0 0 4px",
          }}
        >
          {v.tNewPostBox}
        </h2>
        <div style={{ fontSize: "13px", color: "rgba(22,36,26,.75)" }}>{v.tNewPostNote}</div>
        <form onSubmit={v.quickPost} style={{ display: "grid", gap: "10px", marginTop: "16px" }}>
          <select value={v.postTo ?? ""} onChange={v.onPostTo} style={sx(v.inputStyle)}>
            {list(v.postTargets).map((o, i0) => (
              <option key={o.key ?? i0} value={o.id ?? ""}>
                {o.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            required
            value={v.formTitle2 ?? ""}
            onChange={v.onFormTitle2}
            placeholder={v.tTitlePh}
            style={sx(v.inputStyle)}
          />
          <textarea
            required
            value={v.formText ?? ""}
            onChange={v.onFormText}
            placeholder={v.tTextPh}
            rows="3"
            style={sx(v.areaStyle)}
          />
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
              color: "rgba(22,36,26,.78)",
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
          <button
            type="submit"
            style={{
              padding: "13px 22px",
              borderRadius: "999px",
              border: "0",
              background: "#1f7a3a",
              color: "#ffffff",
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background .3s",
            }}
            className="kza-ha"
          >
            {v.tPublishPost}
          </button>
          {v.postDone ? (
            <div
              style={{
                borderRadius: "18px",
                background: "rgba(116,205,133,.22)",
                border: "1px solid rgba(116,205,133,.5)",
                padding: "12px 14px",
                fontSize: "13.5px",
              }}
            >
              {v.tPostDone}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
