import { sx, list } from "./adminRuntime";
import TeamFundView from "./views/TeamFundView";
import SponsorsView from "./views/SponsorsView";
import DeptsView from "./views/DeptsView";
import GroupModal from "./views/GroupModal";
import RolesView from "./views/RolesView";
import VenueAdminView from "./views/VenueAdminView";
import ProfileView from "./views/ProfileView";
import ProfileDetail from "./views/ProfileDetail";
import MembersView from "./views/MembersView";
import BoardView from "./views/BoardView";
import MeetingDetailModal from "./views/MeetingDetailModal";
import MeetingFormModal from "./views/MeetingFormModal";
import TimetableView from "./views/TimetableView";
import TimetableEditModal from "./views/TimetableEditModal";
import DemoView from "./views/DemoView";
import SplitView from "./views/SplitView";
import TeamFundView2 from "./views/TeamFundView2";
import SponsorsView2 from "./views/SponsorsView2";
import MemberModal from "./views/MemberModal";
import EventModal from "./views/EventModal";
import ComposeModal from "./views/ComposeModal";
import AdminSidebar from "./AdminSidebar";
import AdminBand from "./AdminBand";

export default function AdminShell({ v }) {
  return (
    <div
      data-kza-root=""
      style={{
        position: "relative",
        isolation: "isolate",
        fontFamily: "var(--font-body)",
        color: "#16241a",
        background: "#ffffff",
        minHeight: "100vh",
        paddingLeft: "240px",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          zIndex: "-2",
          position: "fixed",
          left: "-160px",
          top: "-180px",
          width: "640px",
          height: "640px",
          borderRadius: "999px",
          background: "radial-gradient(circle, rgba(116,205,133,.22), rgba(116,205,133,0) 70%)",
          filter: "blur(44px)",
          pointerEvents: "none",
        }}
      />
      <AdminSidebar v={v} />
      <AdminBand v={v} />
      <main
        data-rsp-wide=""
        data-rsp-pad=""
        style={{ maxWidth: "1160px", margin: "0 auto", padding: "22px 24px 72px" }}
      >
        {v.showSummary ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "0",
              borderRadius: "26px",
              background: "#ffffff",
              border: "1px solid rgba(22,36,26,.12)",
              overflow: "hidden",
              marginBottom: "14px",
            }}
          >
            {list(v.summary).map((s, i0) => (
              <div key={s.key ?? i0} style={sx(s.cellStyle)}>
                <div
                  style={{
                    fontSize: "11.5px",
                    fontWeight: "600",
                    letterSpacing: ".11em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.75)",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "28px",
                    marginTop: "8px",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                  <span style={sx(s.chipStyle)}>{s.chip}</span>
                  <span style={{ fontSize: "12.5px", color: "rgba(22,36,26,.75)" }}>{s.note}</span>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {v.showStats ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px",
            }}
          >
            {list(v.stats).map((s, i0) => (
              <div
                key={s.key ?? i0}
                style={{
                  borderRadius: "26px",
                  background: "#ffffff",
                  border: "1px solid rgba(22,36,26,.12)",
                  padding: "22px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: ".11em",
                    textTransform: "uppercase",
                    color: "rgba(22,36,26,.75)",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "30px",
                    marginTop: "10px",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(22,36,26,.75)", marginTop: "4px" }}>
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {v.showTeamFund ? <TeamFundView v={v} /> : null}
        {v.showSponsorsPage ? <SponsorsView v={v} /> : null}
        {v.confirmInactiveOpen ? (
          <div
            data-rsp-modal=""
            style={{
              position: "fixed",
              inset: "0",
              zIndex: "97",
              display: "grid",
              placeItems: "center",
              padding: "24px",
              background: "rgba(22,36,26,.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              role="alertdialog"
              aria-modal="true"
              style={{
                width: "100%",
                maxWidth: "420px",
                borderRadius: "28px",
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.12)",
                boxShadow: "0 32px 80px rgba(22,36,26,.32)",
                padding: "26px 28px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "999px",
                  background: "rgba(236,48,19,.12)",
                  color: "#b8240e",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "20px",
                }}
              >
                ⊘
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "21px",
                  margin: "14px 0 6px",
                }}
              >
                {v.ciTitle}
              </h3>
              <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "rgba(22,36,26,.8)" }}>
                {v.ciText}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                  gap: "8px",
                  marginTop: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={v.ciNo}
                  style={{
                    padding: "11px 18px",
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
                  {v.tNoCancel}
                </button>
                <button
                  type="button"
                  onClick={v.ciYes}
                  style={{
                    padding: "11px 20px",
                    borderRadius: "999px",
                    border: "0",
                    background: "#b8240e",
                    color: "#ffffff",
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "background .3s",
                  }}
                  className="kza-h9"
                >
                  {v.tYesInactive}
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {v.newSponsorOpen ? (
          <div
            data-rsp-modal=""
            style={{
              position: "fixed",
              inset: "0",
              zIndex: "97",
              display: "grid",
              placeItems: "center",
              padding: "24px",
              background: "rgba(22,36,26,.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <form
              onSubmit={v.saveNewSponsor}
              style={{
                width: "100%",
                maxWidth: "520px",
                maxHeight: "90vh",
                overflowY: "auto",
                borderRadius: "28px",
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.12)",
                boxShadow: "0 32px 80px rgba(22,36,26,.32)",
                padding: "26px 28px",
                boxSizing: "border-box",
                display: "grid",
                gap: "12px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "22px",
                  margin: "0",
                }}
              >
                {v.tNewSponsorTitle}
              </h3>
              <label style={sx(v.nsLabel)}>
                {v.tNsName}
                <input
                  type="text"
                  required
                  value={v.nsName ?? ""}
                  onChange={v.onNsName}
                  style={sx(v.inputStyle)}
                />
              </label>
              <label style={sx(v.nsLabel)}>
                {v.tNsClub}{" "}
                <select value={v.nsClub ?? ""} onChange={v.onNsClub} style={sx(v.inputStyle)}>
                  {list(v.nsClubs).map((o, i0) => (
                    <option key={o.key ?? i0} value={o.id ?? ""}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </label>
              <div
                data-rsp="stack"
                style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "10px" }}
              >
                <label style={sx(v.nsLabel)}>
                  {v.tNsType}
                  <input
                    type="text"
                    value={v.nsType ?? ""}
                    onChange={v.onNsType}
                    placeholder={v.tNsTypePh}
                    style={sx(v.inputStyle)}
                  />
                </label>
                <label style={sx(v.nsLabel)}>
                  {v.tNsAmount}
                  <input
                    type="number"
                    min="0"
                    required
                    value={v.nsAmount ?? ""}
                    onChange={v.onNsAmount}
                    style={sx(v.inputStyle)}
                  />
                </label>
              </div>
              <div
                data-rsp="stack"
                style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "10px" }}
              >
                <label style={sx(v.nsLabel)}>
                  {v.tNsFrom}
                  <input
                    type="date"
                    required
                    value={v.nsFrom ?? ""}
                    onChange={v.onNsFrom}
                    style={sx(v.inputStyle)}
                  />
                </label>
                <label style={sx(v.nsLabel)}>
                  {v.tNsTo}
                  <input
                    type="date"
                    required
                    value={v.nsTo ?? ""}
                    onChange={v.onNsTo}
                    style={sx(v.inputStyle)}
                  />
                </label>
              </div>
              <div
                data-rsp="stack"
                style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "10px" }}
              >
                <label style={sx(v.nsLabel)}>
                  {v.tNsPerson}
                  <input
                    type="text"
                    required
                    value={v.nsPerson ?? ""}
                    onChange={v.onNsPerson}
                    style={sx(v.inputStyle)}
                  />
                </label>
                <label style={sx(v.nsLabel)}>
                  {v.tNsEmail}
                  <input
                    type="email"
                    required
                    value={v.nsEmail ?? ""}
                    onChange={v.onNsEmail}
                    style={sx(v.inputStyle)}
                  />
                </label>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                <button
                  type="submit"
                  style={{
                    padding: "12px 22px",
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
                  {v.tNsSave}
                </button>
                <button
                  type="button"
                  onClick={v.closeNewSponsor}
                  style={{
                    padding: "12px 18px",
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
                  {v.tNoCancel}
                </button>
              </div>
            </form>
          </div>
        ) : null}
        {v.agreeOpen ? (
          <div
            data-rsp-modal=""
            onClick={v.closeAgreementBg}
            style={{
              position: "fixed",
              inset: "0",
              zIndex: "96",
              display: "grid",
              placeItems: "center",
              padding: "24px",
              background: "rgba(22,36,26,.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <article
              style={{
                width: "100%",
                maxWidth: "640px",
                maxHeight: "88vh",
                overflowY: "auto",
                borderRadius: "30px",
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.12)",
                boxShadow: "0 32px 80px rgba(22,36,26,.32)",
                padding: "30px 32px",
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={v.closeAgreement}
                aria-label={v.tClose}
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  width: "36px",
                  height: "36px",
                  borderRadius: "999px",
                  border: "1px solid rgba(22,36,26,.14)",
                  background: "#ffffff",
                  color: "#16241a",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "#1f7a3a",
                }}
              >
                {v.tAgreementKicker}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "26px",
                  margin: "8px 40px 4px 0",
                }}
              >
                {v.agTitle}
              </h3>
              <div style={{ fontSize: "14px", color: "rgba(22,36,26,.75)" }}>{v.agParties}</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "8px",
                  marginTop: "18px",
                }}
              >
                {list(v.agFacts).map((f, i0) => (
                  <div
                    key={f.key ?? i0}
                    style={{
                      borderRadius: "14px",
                      background: "#f4f8f2",
                      border: "1px solid rgba(22,36,26,.1)",
                      padding: "10px 12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        color: "rgba(22,36,26,.7)",
                      }}
                    >
                      {f.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: "800",
                        fontSize: "14.5px",
                        marginTop: "3px",
                      }}
                    >
                      {f.value}
                    </div>
                  </div>
                ))}
              </div>
              {list(v.agSections).map((sec, i0) => (
                <div key={sec.key ?? i0} style={{ marginTop: "18px" }}>
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: "800",
                      fontSize: "16px",
                      margin: "0 0 8px",
                    }}
                  >
                    {sec.title}
                  </h4>
                  <ul
                    style={{
                      margin: "0",
                      paddingLeft: "20px",
                      display: "grid",
                      gap: "5px",
                      fontSize: "14.5px",
                      lineHeight: "1.55",
                      color: "rgba(22,36,26,.85)",
                    }}
                  >
                    {list(sec.items).map((it, i1) => (
                      <li key={it.key ?? i1}>{it.text}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "14px",
                  borderTop: "1px solid rgba(22,36,26,.12)",
                  fontSize: "13.5px",
                  color: "rgba(22,36,26,.8)",
                }}
              >
                {v.agSigned}
              </div>
            </article>
          </div>
        ) : null}
        {v.showDepts ? <DeptsView v={v} /> : null}
        {v.deptModalIsGroup ? <GroupModal v={v} /> : null}
        {v.deptModalIsDept ? (
          <div
            data-rsp-modal=""
            onClick={v.closeDeptModal}
            style={{
              position: "fixed",
              inset: "0",
              zIndex: "97",
              display: "grid",
              placeItems: "center",
              padding: "24px",
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
                maxWidth: "440px",
                boxSizing: "border-box",
                borderRadius: "28px",
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.12)",
                boxShadow: "0 32px 80px rgba(22,36,26,.32)",
                padding: "26px",
                display: "grid",
                gap: "12px",
              }}
            >
              <button
                type="button"
                onClick={v.closeDeptModal}
                aria-label={v.tClose}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
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
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "22px",
                  margin: "0 40px 4px 0",
                }}
              >
                {v.deptModalTitle}
              </h3>
              <select value={v.dmParent ?? ""} onChange={v.onDmParent} style={sx(v.inputStyle)}>
                {list(v.dmParentOptions).map((o, i0) => (
                  <option key={o.key ?? i0} value={o.id ?? ""}>
                    {o.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                required
                value={v.dmName ?? ""}
                onChange={v.onDmName}
                placeholder={v.dmPlaceholder}
                style={sx(v.inputStyle)}
              />
              <button
                type="submit"
                style={{
                  padding: "14px 20px",
                  borderRadius: "999px",
                  border: "0",
                  background: "#1f7a3a",
                  color: "#ffffff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                {v.tSave}
              </button>
            </form>
          </div>
        ) : null}
        {v.showRoles ? <RolesView v={v} /> : null}
        {v.showVenueAdmin ? <VenueAdminView v={v} /> : null}
        {v.showProfile ? <ProfileView v={v} /> : null}
        {v.apDetail ? <ProfileDetail v={v} /> : null}
        {v.showMembers ? <MembersView v={v} /> : null}
        {v.addMemOpen ? (
          <div
            data-rsp-modal=""
            onClick={v.closeAddMember}
            style={{
              position: "fixed",
              inset: "0",
              zIndex: "97",
              display: "grid",
              placeItems: "center",
              padding: "24px",
              background: "rgba(22,36,26,.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <form
              onClick={v.stopClick}
              onSubmit={v.saveMember}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "440px",
                boxSizing: "border-box",
                borderRadius: "28px",
                background: "#ffffff",
                border: "1px solid rgba(22,36,26,.12)",
                boxShadow: "0 32px 80px rgba(22,36,26,.32)",
                padding: "26px",
                display: "grid",
                gap: "12px",
              }}
            >
              <button
                type="button"
                onClick={v.closeAddMember}
                aria-label={v.tClose}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
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
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "22px",
                  margin: "0 40px 4px 0",
                }}
              >
                {v.tAddMember}
              </h3>
              <input
                type="text"
                required
                value={v.amName ?? ""}
                onChange={v.onAmName}
                placeholder={v.tColName}
                style={sx(v.inputStyle)}
              />
              <input
                type="email"
                required
                value={v.amEmail ?? ""}
                onChange={v.onAmEmail}
                placeholder={v.tColEmail}
                style={sx(v.inputStyle)}
              />
              <select value={v.amType ?? ""} onChange={v.onAmType} style={sx(v.inputStyle)}>
                {list(v.amTypes).map((o, i0) => (
                  <option key={o.key ?? i0} value={o.id ?? ""}>
                    {o.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                style={{
                  padding: "14px 20px",
                  borderRadius: "999px",
                  border: "0",
                  background: "#1f7a3a",
                  color: "#ffffff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                {v.tAddMember}
              </button>
            </form>
          </div>
        ) : null}
        {v.showBoard ? <BoardView v={v} /> : null}
        {v.mdOpen ? <MeetingDetailModal v={v} /> : null}
        {v.meetingFormOpen ? <MeetingFormModal v={v} /> : null}
        {v.showTT ? <TimetableView v={v} /> : null}
        {v.ttEditOpen ? <TimetableEditModal v={v} /> : null}
        {v.showDemo ? <DemoView v={v} /> : null}
        {v.showSplit ? <SplitView v={v} /> : null}
      </main>
      {v.showTeamFund ? <TeamFundView2 v={v} /> : null}
      {v.showSponsorsPage ? <SponsorsView2 v={v} /> : null}
      {v.memberOpen ? <MemberModal v={v} /> : null}
      {v.eventOpen ? <EventModal v={v} /> : null}
      {v.guardianOpen ? (
        <div
          data-rsp-modal=""
          style={{
            position: "fixed",
            inset: "0",
            zIndex: "84",
            display: "grid",
            placeItems: "center",
            padding: "24px",
            background: "rgba(22,36,26,.56)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            data-rsp-pad=""
            style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "32px",
              background: "#ffffff",
              border: "1px solid rgba(22,36,26,.12)",
              boxShadow: "0 32px 80px rgba(22,36,26,.32)",
              padding: "28px 30px",
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            <button
              type="button"
              onClick={v.closeGuardian}
              aria-label={v.tClose}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                width: "34px",
                height: "34px",
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
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  width: "44px",
                  height: "44px",
                  flex: "0 0 auto",
                  borderRadius: "999px",
                  background: "#16241a",
                  color: "#f6f8f3",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--font-heading)",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                {v.guardianInitials}
              </span>
              <div style={{ flex: "1", minWidth: "0" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: "800",
                    fontSize: "21px",
                    margin: "0 26px 0 0",
                  }}
                >
                  {v.guardianName}
                </h3>
                <div style={{ fontSize: "13.5px", color: "rgba(22,36,26,.75)", marginTop: "2px" }}>
                  {v.guardianRelation}
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
              {list(v.guardianFields).map((f, i0) => (
                <div
                  key={f.key ?? i0}
                  style={{
                    borderRadius: "20px",
                    background: "#f4f8f2",
                    border: "1px solid rgba(22,36,26,.1)",
                    padding: "13px 16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11.5px",
                      fontWeight: "600",
                      letterSpacing: ".09em",
                      textTransform: "uppercase",
                      color: "rgba(22,36,26,.75)",
                    }}
                  >
                    {f.label}
                  </div>
                  <div style={{ fontSize: "15px", marginTop: "3px" }}>{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {v.composeOpen ? <ComposeModal v={v} /> : null}
    </div>
  );
}
