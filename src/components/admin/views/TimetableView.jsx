import { sx, list } from "../adminRuntime";

export default function TimetableView({ v }) {
  return (
    <div style={{ marginTop: "-30px", display: "grid", gap: "14px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
        {v.ttHasTabs ? (
          <div role="tablist" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {list(v.ttTabs).map((t, i0) => (
              <button
                key={t.key ?? i0}
                type="button"
                role="tab"
                aria-selected={t.active}
                onClick={t.pick}
                style={sx(t.style)}
              >
                {t.label}
              </button>
            ))}
          </div>
        ) : null}
        <span style={{ flex: "1" }} />
        <button
          type="button"
          onClick={v.ttReset}
          style={{
            padding: "10px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.2)",
            background: "#ffffff",
            color: "#16241a",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "13px",
            cursor: "pointer",
            transition: "background .3s",
          }}
          className="kza-h3"
        >
          {v.tTTReset}
        </button>
        <button
          type="button"
          onClick={v.ttNew}
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
          {v.tTTNew}
        </button>
      </div>
      {v.ttSavedShow ? (
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
          {v.ttSavedText}{" "}
        </div>
      ) : null}
      <div
        style={{
          borderRadius: "28px",
          background: "#ffffff",
          border: "1px solid rgba(22,36,26,.12)",
          padding: "18px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: "800",
              fontSize: "19px",
              margin: "0 8px 0 0",
            }}
          >
            {v.ttClubName}
          </h2>
          {list(v.ttLegend).map((g, i0) => (
            <span key={g.key ?? i0} style={sx(g.style)}>
              {g.name}
            </span>
          ))}
          <form onSubmit={v.ttAddGroup} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input
              type="text"
              value={v.ttGroupDraft ?? ""}
              onChange={v.onTTGroupDraft}
              placeholder={v.tTTGroupPh}
              style={{
                width: "130px",
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
              {v.tTTAddGroup}
            </button>
          </form>
          <span style={{ flex: "1" }} />
          <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.72)" }}>{v.ttCount}</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: "760px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "52px repeat(7, minmax(0,1fr))",
                gap: "0 6px",
                paddingBottom: "6px",
                borderBottom: "2px solid rgba(22,36,26,.14)",
              }}
            >
              <span />
              {list(v.ttDays).map((dn, i0) => (
                <span
                  key={dn.key ?? i0}
                  style={{
                    textAlign: "center",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "13px",
                  }}
                >
                  {dn.name}
                </span>
              ))}
            </div>
            <div
              style={sx(
                `position: relative; display: grid; grid-template-columns: 52px repeat(7, minmax(0,1fr)); gap: 0 6px; height: ${v.ttBodyH ?? ""}`,
              )}
            >
              <div style={{ position: "relative" }}>
                {list(v.ttHours).map((h, i0) => (
                  <span
                    key={h.key ?? i0}
                    style={sx(
                      `position: absolute; right: 8px; top: ${h.top ?? ""}; transform: translateY(-50%); font-size: 11px; color: rgba(22,36,26,.7)`,
                    )}
                  >
                    {h.label}
                  </span>
                ))}
              </div>
              {list(v.ttCols).map((c, i0) => (
                <div
                  key={c.key ?? i0}
                  data-tt-day={c.day}
                  onDoubleClick={c.addHere}
                  title={v.tTTDblHint}
                  style={sx(`position: relative; background: ${c.bg ?? ""}; border-radius: 10px`)}
                >
                  {list(v.ttHours).map((h, i1) => (
                    <div key={h.key ?? i1} style={sx(h.lineStyle)} />
                  ))}
                  {list(c.items).map((it, i1) => (
                    <button
                      key={it.key ?? i1}
                      type="button"
                      onClick={it.edit}
                      onPointerDown={it.down}
                      onPointerMove={v.ttMove}
                      onPointerUp={v.ttUp}
                      onPointerCancel={v.ttCancelDrag}
                      title={it.tip}
                      style={sx(it.style)}
                      className="kza-hk"
                    >
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-heading)",
                          fontWeight: "800",
                          fontSize: "11.5px",
                          lineHeight: "1.2",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {it.group}
                      </span>{" "}
                      <span
                        style={{
                          display: "block",
                          fontSize: "11px",
                          lineHeight: "1.25",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {it.time}
                      </span>{" "}
                      <span
                        style={{
                          display: "block",
                          fontSize: "10.5px",
                          lineHeight: "1.25",
                          opacity: ".8",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {it.place}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ fontSize: "12.5px", color: "rgba(22,36,26,.7)", marginTop: "10px" }}>{v.tTTHelp}</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "10px",
            marginTop: "16px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(22,36,26,.1)",
          }}
        >
          <span style={sx(v.ttDirtyDot)} />
          <span style={{ fontSize: "13.5px", color: "rgba(22,36,26,.8)" }}>{v.ttDirtyText}</span>
          <span style={{ flex: "1" }} />
          {v.ttDirty ? (
            <button
              type="button"
              onClick={v.ttDiscard}
              style={{
                padding: "11px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(22,36,26,.2)",
                background: "#ffffff",
                color: "#16241a",
                fontFamily: "var(--font-heading)",
                fontWeight: "800",
                fontSize: "13.5px",
                cursor: "pointer",
                transition: "background .3s",
              }}
              className="kza-h3"
            >
              {v.tTTDiscard}
            </button>
          ) : null}
          <button type="button" onClick={v.ttPublish} disabled={v.ttClean} style={sx(v.ttSaveStyle)}>
            {v.tTTPublish}
          </button>
        </div>
      </div>
    </div>
  );
}
