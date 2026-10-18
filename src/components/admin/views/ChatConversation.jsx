import { sx, list } from "../adminRuntime";

// Messages and composer of a conversation.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function ChatConversation({ v }) {
  return (
    <div>
      <input
        type="search"
        value={v.cmChatQ ?? ""}
        onChange={v.onCmChatQ}
        placeholder={v.tCmSearchIn}
        style={{
          width: "100%",
          boxSizing: "border-box",
          marginTop: "16px",
          padding: "12px 18px",
          borderRadius: "999px",
          border: "1px solid rgba(22,36,26,.18)",
          background: "#f4f8f2",
          color: "#16241a",
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          outline: "none",
        }}
        className="kza-f7"
      />
      <div style={{ fontSize: "13px", color: "rgba(22,36,26,.55)", marginTop: "8px", minHeight: "18px" }}>
        {v.cmSearchNote}
      </div>
      <div
        data-kza-cmscroll=""
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: "12px",
          marginTop: "10px",
          maxHeight: "420px",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "4px",
        }}
      >
        {list(v.cmMessages).map((m, i0) => (
          <div key={m.key ?? i0} style={sx(m.rowStyle)}>
            <div style={sx(m.bubbleStyle)}>
              <div style={sx(m.fromStyle)}>{m.from}</div>
              {m.hasText ? <div style={{ fontSize: "15px", lineHeight: "1.55" }}>{m.text}</div> : null}
              {m.hasFile ? (
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                  <span
                    style={{
                      width: "34px",
                      height: "34px",
                      flex: "0 0 auto",
                      borderRadius: "12px",
                      background: "rgba(22,36,26,.1)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "15px",
                    }}
                  >
                    {m.fileIcon}
                  </span>
                  <span style={{ flex: "1", minWidth: "0" }}>
                    <span
                      style={{
                        display: "block",
                        fontWeight: "600",
                        fontSize: "14px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.fileName}
                    </span>
                    <span style={{ display: "block", fontSize: "12px", opacity: ".7" }}>{m.fileMeta}</span>
                  </span>
                </div>
              ) : null}
              <div style={sx(m.whenStyle)}>{m.when}</div>
            </div>
          </div>
        ))}
        {v.cmNoMatches ? (
          <div style={{ padding: "16px", fontSize: "14px", color: "rgba(22,36,26,.6)" }}>
            {v.tCmNoMatches}
          </div>
        ) : null}
      </div>
      <form
        onSubmit={v.cmSend}
        style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px", alignItems: "center" }}
      >
        <span style={{ position: "relative", flex: "0 0 auto" }}>
          <button
            type="button"
            onClick={v.cmToggleAttach}
            aria-label={v.tCmAttach}
            title={v.tCmAttach}
            style={sx(v.cmAttachBtnStyle)}
          >
            +
          </button>{" "}
          <span style={sx(v.cmAttachMenuStyle)}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "11px 14px",
                borderRadius: "16px",
                cursor: "pointer",
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
              className="kza-h3"
            >
              <span style={{ fontSize: "16px" }}>🖼</span>
              {v.tCmPhoto}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={v.cmPickImages}
                style={{ display: "none" }}
              />
            </label>{" "}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "11px 14px",
                borderRadius: "16px",
                cursor: "pointer",
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
              className="kza-h3"
            >
              <span style={{ fontSize: "16px" }}>📄</span>
              {v.tCmDoc}
              <input type="file" multiple onChange={v.cmPickDocs} style={{ display: "none" }} />
            </label>
          </span>
        </span>
        <input
          type="text"
          value={v.cmDraft ?? ""}
          onChange={v.onCmDraft}
          placeholder={v.tCmWrite}
          style={{
            flex: "1 1 180px",
            minWidth: "0",
            padding: "14px 20px",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.18)",
            background: "#f4f8f2",
            color: "#16241a",
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            outline: "none",
          }}
          className="kza-f7"
        />
        <button
          type="submit"
          style={{
            padding: "14px 24px",
            borderRadius: "999px",
            border: "0",
            background: "#74cd85",
            color: "#16241a",
            fontFamily: "var(--font-heading)",
            fontWeight: "800",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background .3s, transform .3s cubic-bezier(.2,.7,.2,1)",
          }}
          className="kza-h11"
        >
          {v.tCmSend}
        </button>
      </form>
    </div>
  );
}
