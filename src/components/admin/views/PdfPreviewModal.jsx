import Hv from "../../Hv";
import { sx } from "../adminRuntime";

// Invoice PDF preview (member payment requests and supplier invoices), with a
// "Download PDF" button. Renders `v` from adminInvVals (pdf* keys).
const LBL = sx("font-size: 10.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: #6b766d");
const COLS = "display: grid; grid-template-columns: minmax(0,1fr) 54px 84px 92px; gap: 8px; ";

export default function PdfPreviewModal({ v }) {
  return (
    <div
      data-rsp-modal=""
      onClick={v.closePdf}
      style={sx("position: fixed; inset: 0; z-index: 99; display: grid; place-items: center; padding: 20px; background: rgba(22,36,26,.62); backdrop-filter: blur(8px)")}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={v.pdfFileName}
        onClick={(e) => e.stopPropagation()}
        style={sx("width: 100%; max-width: 720px; max-height: calc(100vh - 40px); display: flex; flex-direction: column; overflow: hidden; border-radius: 22px; background: #e9ece6; box-shadow: 0 32px 80px rgba(0,0,0,.4)")}
      >
        <div style={sx("display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; padding: 14px 20px; background: #ffffff; border-bottom: 1px solid rgba(22,36,26,.1)")}>
          <span aria-hidden="true" style={sx("width: 34px; height: 34px; border-radius: 10px; background: #fbe9e5; color: #a3280e; display: grid; place-items: center; font-family: var(--font-heading); font-weight: 800; font-size: 11px")}>PDF</span>
          <div style={sx("flex: 1; min-width: 160px")}>
            <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px; overflow-wrap: anywhere")}>{v.pdfFileName}</div>
            <div style={sx("font-size: 12.5px; color: rgba(22,36,26,.6)")}>{v.pdfMeta}</div>
          </div>
          <Hv
            as="button"
            type="button"
            onClick={v.downloadPdf}
            style="display: inline-flex; align-items: center; gap: 8px; padding: 11px 20px; border-radius: 999px; border: 0; background: #1f7a3a; color: #ffffff; font-family: var(--font-heading); font-weight: 800; font-size: 14px; cursor: pointer; transition: background .3s"
            hover="background: #16241a"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12" />
              <path d="M7 11l5 5 5-5" />
              <path d="M4 21h16" />
            </svg>
            {v.tPdfDownload}
          </Hv>
          <button
            type="button"
            onClick={v.closePdf}
            aria-label={v.tClose}
            style={sx("width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(22,36,26,.14); background: #ffffff; font-size: 16px; cursor: pointer")}
          >
            ×
          </button>
        </div>
        <div style={sx("flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: thin; padding: 22px")}>
          <div style={sx("background: #ffffff; color: #16241a; max-width: 560px; margin: 0 auto; padding: 38px 40px 44px; box-shadow: 0 6px 28px rgba(22,36,26,.18); border-radius: 3px; font-family: var(--font-body); font-size: 13px; line-height: 1.5")}>
            <div style={sx("display: flex; justify-content: space-between; gap: 20px; align-items: flex-start")}>
              <div>
                <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 30px; letter-spacing: -.02em")}>{v.tPdfInvoice}</div>
                <div style={sx("color: #6b766d; margin-top: 2px")}>{v.pdfNumber}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={sx("font-family: var(--font-heading); font-weight: 800; font-size: 16px")}>{v.pdfClub}</div>
                <div style={{ color: "#6b766d" }}>{v.pdfAcctName}</div>
              </div>
            </div>
            <div style={sx("height: 3px; width: 56px; background: #74cd85; margin: 18px 0 20px")} />
            <div style={sx("display: grid; grid-template-columns: 1fr 1fr; gap: 16px 20px")}>
              <div>
                <div style={LBL}>{v.tPdfTo}</div>
                <div style={sx("font-weight: 700; margin-top: 3px")}>{v.pdfTo}</div>
              </div>
              <div>
                <div style={LBL}>{v.tPdfDate}</div>
                <div style={{ marginTop: "3px" }}>{v.pdfDate}</div>
              </div>
              <div>
                <div style={LBL}>{v.tPdfType}</div>
                <div style={{ marginTop: "3px" }}>{v.pdfType}</div>
              </div>
              <div>
                <div style={LBL}>{v.tPdfDue}</div>
                <div style={sx("margin-top: 3px; font-weight: 700")}>{v.pdfDue}</div>
              </div>
            </div>
            <div style={sx("margin-top: 24px; border-top: 1px solid #16241a; border-bottom: 1px solid rgba(22,36,26,.2)")}>
              <div style={sx(COLS + "padding: 8px 0; background: #f4f8f2; font-size: 10.5px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: #6b766d")}>
                <span style={{ paddingLeft: "6px" }}>{v.tPdfDesc}</span>
                <span style={{ textAlign: "right" }}>{v.tPdfQty}</span>
                <span style={{ textAlign: "right" }}>{v.tPdfPrice}</span>
                <span style={sx("text-align: right; padding-right: 6px")}>{v.tPdfSum}</span>
              </div>
              <div style={sx(COLS + "padding: 12px 0")}>
                <span style={sx("padding-left: 6px; overflow-wrap: anywhere")}>{v.pdfDesc}</span>
                <span style={{ textAlign: "right" }}>{v.pdfQty}</span>
                <span style={{ textAlign: "right" }}>{v.pdfPrice}</span>
                <span style={sx("text-align: right; padding-right: 6px")}>{v.pdfSum}</span>
              </div>
            </div>
            <div style={sx("display: flex; justify-content: flex-end; margin-top: 12px")}>
              <div style={sx("min-width: 220px; display: grid; gap: 4px")}>
                <div style={sx("display: flex; justify-content: space-between; color: #6b766d")}>
                  <span>{v.tPdfVat}</span>
                  <span>kr 0</span>
                </div>
                <div style={sx("display: flex; justify-content: space-between; font-family: var(--font-heading); font-weight: 800; font-size: 17px; padding-top: 6px; border-top: 1px solid #16241a")}>
                  <span>{v.tPdfTotal}</span>
                  <span>{v.pdfTotal}</span>
                </div>
              </div>
            </div>
            <div style={sx("margin-top: 28px; border-radius: 10px; background: #f4f8f2; padding: 14px 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px 16px")}>
              <div>
                <div style={LBL}>{v.tPdfAcct}</div>
                <div style={sx("margin-top: 3px; font-weight: 700")}>{v.pdfAcct}</div>
              </div>
              <div>
                <div style={LBL}>{v.tPdfKid}</div>
                <div style={sx("margin-top: 3px; font-weight: 700")}>{v.pdfKid}</div>
              </div>
            </div>
            <div style={sx("margin-top: 18px; color: #6b766d; font-size: 12px")}>{v.pdfFooter}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
