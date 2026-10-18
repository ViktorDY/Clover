import { sx, list } from "../adminRuntime";
import ChatConversation from "./ChatConversation";

// Open conversation pane.
// Renders the view object `v` from src/lib/adminLogic.js.
export default function ChatPanel({ v }) {
  return (
    <div
      style={{
        borderRadius: "30px",
        background: "#ffffff",
        border: "1px solid rgba(22,36,26,.12)",
        padding: "24px",
        minHeight: "420px",
        minWidth: "0",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
        <button
          type="button"
          onClick={v.cmClose}
          aria-label={v.tBackL}
          style={{
            width: "38px",
            height: "38px",
            flex: "0 0 auto",
            borderRadius: "999px",
            border: "1px solid rgba(22,36,26,.18)",
            background: "#ffffff",
            color: "#16241a",
            fontSize: "16px",
            cursor: "pointer",
          }}
          className="kza-h3"
        >
          ←
        </button>
        <div style={{ flex: "1", minWidth: "160px" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "19px" }}>
            {v.cmChatName}
          </div>
          <div style={{ fontSize: "13px", color: "rgba(22,36,26,.6)" }}>{v.cmChatMeta}</div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button type="button" onClick={v.cmShowChat} style={sx(v.cmTabChatStyle)}>
            {v.tCmChatTab}
          </button>
          <button type="button" onClick={v.cmShowFiles} style={sx(v.cmTabFilesStyle)}>
            {v.tCmFilesTab}
          </button>
        </div>
      </div>
      {v.cmOnChat ? <ChatConversation v={v} /> : null}
      {v.cmOnFiles ? (
        <div
          style={{ display: "grid", gap: "10px", marginTop: "18px", maxHeight: "480px", overflowY: "auto" }}
        >
          {list(v.cmFiles).map((f, i0) => (
            <div
              key={f.key ?? i0}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 16px",
                borderRadius: "22px",
                background: "#f4f8f2",
                border: "1px solid rgba(22,36,26,.1)",
              }}
            >
              <span
                style={{
                  width: "38px",
                  height: "38px",
                  flex: "0 0 auto",
                  borderRadius: "12px",
                  background: "rgba(116,205,133,.3)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {f.icon}
              </span>
              <span style={{ flex: "1", minWidth: "0" }}>
                <span
                  style={{
                    display: "block",
                    fontWeight: "600",
                    fontSize: "14.5px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {f.name}
                </span>
                <span style={{ display: "block", fontSize: "12.5px", color: "rgba(22,36,26,.6)" }}>
                  {f.meta}
                </span>
              </span>
            </div>
          ))}
          {v.cmNoFiles ? (
            <div style={{ fontSize: "14px", color: "rgba(22,36,26,.6)" }}>{v.tCmNoFiles}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
