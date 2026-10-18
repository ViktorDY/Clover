import { useState } from "react";
import { useLang } from "../../lib/langContext";
import pick from "../../lib/pick";
import {
  GROUP_CODES,
  MEMBER_CLUBS,
  NOTIF_DEFAULTS,
  NOTIF_FLAGS,
  PAY_HISTORY,
  REGIONS,
  clubName,
  groupsFor,
  kr,
} from "../../lib/memberData";
import { Avatar, CloseButton, Modal, Segmented, Switch } from "./ui";
import { backPill, fieldLabelClass, inputClass, primaryButton, secondaryButton } from "./styles";
import { readPhoto } from "./photo";
import DeleteAccountModal from "./DeleteAccountModal";

/*
  The panels behind the profile's settings boxes, shown in one dialog:
  account, security, group memberships, payment, push notifications and
  calendar settings. Everything is remembered through `profile.save`;
  account actions go through the profile hook (Supabase when signed in).
*/
export default function ProfilePanel({ id, title, profile, initials, onClose, onDeleted }) {
  const { t } = useLang();
  const [deleting, setDeleting] = useState(false);

  const body = {
    account: <AccountPanel profile={profile} initials={initials} onAskDelete={() => setDeleting(true)} />,
    security: <SecurityPanel profile={profile} />,
    groups: <GroupsPanel profile={profile} />,
    payment: <PaymentPanel profile={profile} />,
    push: <PushPanel profile={profile} />,
    calendar: <CalendarPanel profile={profile} />,
  }[id];

  return (
    <>
      <Modal onClose={onClose} label={title} z="z-[90]" className="max-w-[560px]">
        <div className="box-border flex max-h-[min(86vh,760px)] flex-col overflow-hidden rounded-[32px] border border-ink/12 bg-white shadow-[0_36px_90px_rgba(22,36,26,0.3)]">
          <div className="flex items-center gap-3 border-b border-ink/8 px-5 pb-3.5 pt-6 sm:px-7">
            <h2 className="m-0 flex-1 font-heading text-[22px] font-extrabold tracking-[-0.02em]">{title}</h2>
            <CloseButton onClick={onClose} label={t("Lukk", "Close")} />
          </div>
          <div className="kz-scroll min-h-0 flex-auto overflow-y-auto px-5 pb-6 pt-1 sm:px-7">{body}</div>
        </div>
      </Modal>
      {deleting && <DeleteAccountModal profile={profile} onClose={() => setDeleting(false)} onDeleted={onDeleted} />}
    </>
  );
}

/* ---- Shared rows -------------------------------------------------------- */

function Row({ label, children, strong = false, boxed = false }) {
  return (
    <div
      className={
        boxed
          ? "mt-2.5 flex items-center gap-3.5 rounded-[18px] border border-ink/12 bg-white px-4.5 py-3.5"
          : "flex flex-wrap items-center gap-3.5 border-b border-ink/8 py-[13px]"
      }
    >
      <span className={`min-w-0 flex-1 text-[14.5px] ${strong ? "font-heading font-extrabold text-ink" : "text-ink/78"}`}>{label}</span>
      {children}
    </div>
  );
}

function Head({ children, big = false }) {
  return big ? (
    <div className="pt-5 font-heading text-[17px] font-extrabold text-ink">{children}</div>
  ) : (
    <div className="pb-1 pt-5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink/50">{children}</div>
  );
}

function TextRow({ label, value }) {
  return (
    <Row label={label}>
      <span className="text-right font-heading text-[14.5px] font-extrabold">{value}</span>
    </Row>
  );
}

const ok = (text) => (
  <span role="status" className="text-[13.5px] font-semibold text-moss">
    {text}
  </span>
);
const err = (text) => (
  <div role="alert" className="text-[13.5px] font-semibold text-[#c92a14]">
    {text}
  </div>
);

/* ---- Profile and account ------------------------------------------------- */

function AccountPanel({ profile, initials, onAskDelete }) {
  const { t, lang, setLang } = useLang();
  const local = profile.local;
  const [name, setName] = useState(profile.fullName);
  const [birth, setBirth] = useState(local.birth || "");
  const [gender, setGender] = useState(local.gender || "");
  const [region, setRegion] = useState(local.region || "");
  const [photoMenu, setPhotoMenu] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const pickPhoto = (e) => {
    readPhoto(e.target.files && e.target.files[0], (url) => profile.save({ photo: url }));
    e.target.value = "";
    setPhotoMenu(false);
  };

  const menuItem =
    "relative cursor-pointer rounded-2xl border-0 bg-white px-4.5 py-[13px] text-left font-heading text-sm font-extrabold text-ink hover:bg-grass-tint";

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        const result = await profile.saveName(name);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        profile.save({ birth, gender, region });
        setSaved(true);
      }}
      className="grid gap-4 pt-4"
    >
      <div className="flex items-center gap-4">
        <Avatar size={72} fontSize={24} photo={local.photo} initials={initials} />
        <div className="min-w-0 flex-1">
          <button type="button" onClick={() => setPhotoMenu((v) => !v)} className="cursor-pointer rounded-full border border-ink/20 bg-white px-4.5 py-2.5 font-heading text-[13px] font-extrabold text-ink hover:bg-grass-tint">
            {t("Endre bilde", "Change photo")}
          </button>
        </div>
      </div>
      {photoMenu && (
        <div role="menu" className="grid gap-1.5 rounded-[22px] border border-ink/12 bg-mute p-2">
          <label role="menuitem" className={menuItem}>
            {t("Ta bilde", "Take photo")}
            <input type="file" accept="image/*" capture="user" onChange={pickPhoto} aria-label={t("Ta bilde", "Take photo")} className="absolute h-px w-px overflow-hidden opacity-0" />
          </label>
          <label role="menuitem" className={menuItem}>
            {t("Velg eksisterende bilde", "Choose existing photo")}
            <input type="file" accept="image/*" onChange={pickPhoto} aria-label={t("Velg eksisterende bilde", "Choose existing photo")} className="absolute h-px w-px overflow-hidden opacity-0" />
          </label>
          <button type="button" role="menuitem" onClick={() => setPhotoMenu(false)} className={`${menuItem} bg-transparent text-ink/70 hover:bg-ink/6`}>
            {t("Avbryt", "Cancel")}
          </button>
        </div>
      )}

      <label className={fieldLabelClass}>
        {t("Navn", "Name")}
        <input
          type="text"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSaved(false);
          }}
          className={inputClass}
        />
      </label>
      <label className={fieldLabelClass}>
        {t("Fødselsdato", "Date of birth")}
        <input
          type="date"
          value={birth}
          onChange={(e) => {
            setBirth(e.target.value);
            setSaved(false);
          }}
          className={inputClass}
        />
      </label>
      <div className={fieldLabelClass}>
        {t("Kjønn", "Gender")}
        <Segmented
          label={t("Kjønn", "Gender")}
          value={gender}
          onChange={(v) => {
            setGender((g) => (g === v ? "" : v));
            setSaved(false);
          }}
          options={[
            { id: "male", label: t("Mann", "Male") },
            { id: "female", label: t("Kvinne", "Female") },
            { id: "other", label: t("Annet", "Other") },
          ]}
        />
      </div>
      <label className={fieldLabelClass}>
        {t("Region i Norge", "Region in Norway")}
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setSaved(false);
          }}
          className={`${inputClass} appearance-auto`}
        >
          <option value="">{t("Velg region", "Choose region")}</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <div className={fieldLabelClass}>
        {t("Språk", "Language")}
        <Segmented
          label={t("Språk", "Language")}
          value={lang}
          onChange={setLang}
          options={[
            { id: "no", label: "Norsk" },
            { id: "en", label: "English" },
          ]}
        />
      </div>
      {error && err(t(error.no, error.en))}
      <div className="flex items-center gap-3">
        <button type="submit" className={primaryButton}>
          {t("Lagre", "Save")}
        </button>
        {saved && ok(t("Lagret.", "Saved."))}
      </div>

      <div className="my-1 h-px bg-ink/10" />
      <button
        type="button"
        onClick={onAskDelete}
        className="cursor-pointer justify-self-start rounded-full border-[1.5px] border-[#c92a14] bg-white px-5.5 py-3 font-heading text-sm font-extrabold text-[#c92a14] transition-colors duration-300 hover:bg-[#c92a14] hover:text-white"
      >
        {t("Slett konto", "Delete account")}
      </button>
    </form>
  );
}

/* ---- Security --------------------------------------------------------- */

const maskPhone = (p) => {
  const d = String(p || "").replace(/\s+/g, "");
  return d.length > 4 ? `${d.slice(0, 3)} ••• •• ${d.slice(-3)}` : d;
};

function SecurityPanel({ profile }) {
  const { t, isEn } = useLang();
  const local = profile.local;
  const [pwOpen, setPwOpen] = useState(false);
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [rep, setRep] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [pwOk, setPwOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const twoFA = local.twoFA && local.twoFA.on ? local.twoFA : null;
  const [step, setStep] = useState("");
  const [choice, setChoice] = useState("saved");
  const [other, setOther] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [tfErr, setTfErr] = useState("");
  const [tfDone, setTfDone] = useState(false);

  const lastChanged = local.pwChanged
    ? new Date(local.pwChanged).toLocaleDateString(isEn ? "en-GB" : "nb-NO", { day: "numeric", month: "long", year: "numeric" })
    : t("for 3 måneder siden", "3 months ago");

  const changePw = async (e) => {
    e.preventDefault();
    if (!cur) return setPwErr(t("Skriv inn det nåværende passordet.", "Enter your current password."));
    if (next.length < 8) return setPwErr(t("Det nye passordet må være minst 8 tegn.", "The new password must be at least 8 characters."));
    if (next === cur) return setPwErr(t("Det nye passordet må være forskjellig fra det nåværende.", "The new password must be different from the current one."));
    if (next !== rep) return setPwErr(t("De nye passordene er ikke like.", "The new passwords do not match."));
    setBusy(true);
    const result = await profile.changePassword(cur, next);
    setBusy(false);
    if (!result.ok) return setPwErr(t(result.error.no, result.error.en));
    setCur("");
    setNext("");
    setRep("");
    setPwErr("");
    setPwOk(true);
    return undefined;
  };

  const radio = (on) =>
    `flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left font-body text-[14.5px] text-ink transition-colors ${
      on ? "border border-grass bg-grass-tint" : "border border-ink/14 bg-white"
    }`;
  const dot = (on) =>
    `box-border h-[18px] w-[18px] flex-none rounded-full border-2 ${on ? "border-moss bg-[radial-gradient(circle,#1f7a3a_45%,transparent_50%)]" : "border-ink/30 bg-white"}`;

  const sendCode = () => {
    const num = choice === "saved" ? profile.phone : other.trim();
    if (num.replace(/\D/g, "").length < 8) return setTfErr(t("Skriv inn et gyldig telefonnummer.", "Enter a valid phone number."));
    setSentCode(String(Math.floor(100000 + Math.random() * 900000)));
    setTarget(num);
    setCode("");
    setTfErr("");
    setStep("code");
    return undefined;
  };

  const pwInput = (value, set, auto) => (
    <input
      type="password"
      autoComplete={auto}
      value={value}
      onChange={(e) => {
        set(e.target.value);
        setPwErr("");
        setPwOk(false);
      }}
      className={inputClass}
    />
  );

  return (
    <div className="grid gap-[22px] pt-4">
      <div className="flex items-center gap-3.5">
        <div className="min-w-0 flex-1">
          <div className="font-heading text-[17px] font-extrabold">{t("Passord", "Password")}</div>
          <div className="mt-[3px] text-[13px] text-ink/65">
            {t("Sist endret", "Last changed")}: {lastChanged}
          </div>
        </div>
        <button
          type="button"
          aria-expanded={pwOpen}
          onClick={() => {
            setPwOpen((v) => !v);
            setCur("");
            setNext("");
            setRep("");
            setPwErr("");
            setPwOk(false);
            setResetSent(false);
          }}
          className={`flex-none cursor-pointer rounded-full px-5 py-[11px] font-heading text-sm font-extrabold transition-colors duration-300 hover:bg-grass-tint hover:text-ink ${
            pwOpen ? "border border-ink/20 bg-white text-ink" : "border-0 bg-ink text-paper"
          }`}
        >
          {pwOpen ? t("Avbryt", "Cancel") : t("Endre passord", "Change password")}
        </button>
      </div>

      {pwOpen && (
        <form onSubmit={changePw} className="grid gap-3.5">
          <label className={fieldLabelClass}>
            {t("Nåværende passord", "Current password")}
            {pwInput(cur, setCur, "current-password")}
          </label>
          <label className={fieldLabelClass}>
            {t("Nytt passord", "New password")}
            {pwInput(next, setNext, "new-password")}
          </label>
          <label className={fieldLabelClass}>
            {t("Gjenta nytt passord", "Repeat new password")}
            {pwInput(rep, setRep, "new-password")}
          </label>
          {pwErr && err(pwErr)}
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={busy} className={`${primaryButton} disabled:opacity-60`}>
              {t("Endre passord", "Change password")}
            </button>
            {pwOk && ok(t("Passordet er endret.", "Password changed."))}
          </div>
          <div className="text-sm text-ink/78">
            {t("Glemt passordet?", "Forgot your password?")}{" "}
            <button
              type="button"
              onClick={async () => {
                await profile.resetPassword();
                setResetSent(true);
              }}
              className="cursor-pointer border-0 bg-transparent p-0 font-heading text-sm font-extrabold text-moss underline hover:text-ink"
            >
              {t("Tilbakestill", "Reset")}
            </button>
          </div>
          {resetSent && (
            <div role="status" className="rounded-2xl border border-grass/50 bg-grass/20 px-4 py-3 text-[13.5px] text-ink">
              {t("Vi har sendt en lenke for å tilbakestille passordet til ", "We have sent a link to reset your password to ")}
              {profile.email.replace(/^(.).*(@.*)$/, "$1•••$2")}.
            </div>
          )}
        </form>
      )}

      <div className="h-px bg-ink/10" />

      <div className="grid gap-3.5">
        <div className="flex items-center gap-3.5">
          <div className="min-w-0 flex-1">
            <div className="font-heading text-[17px] font-extrabold">{t("Tostegsverifisering", "Two-step verification")}</div>
            <div className="mt-[3px] text-[13px] text-ink/65">
              {twoFA
                ? `${t("På — koder sendes til ", "On — codes are sent to ")}${maskPhone(twoFA.phone)}`
                : t("Av — legg til en kode fra telefonen når du logger inn", "Off — add a code from your phone when you sign in")}
            </div>
          </div>
          <Switch
            on={!!twoFA || step !== ""}
            label={t("Tostegsverifisering", "Two-step verification")}
            onToggle={() => {
              if (twoFA) {
                profile.save({ twoFA: { on: false, phone: "" } });
                setStep("");
                setTfDone(false);
              } else if (step) {
                setStep("");
              } else {
                setStep("phone");
                setChoice("saved");
                setOther("");
                setTfDone(false);
              }
              setTfErr("");
            }}
          />
        </div>

        {twoFA && step === "" && (
          <button
            type="button"
            onClick={() => {
              setStep("phone");
              setChoice("other");
              setTfErr("");
              setTfDone(false);
            }}
            className={`${secondaryButton} justify-self-start`}
          >
            {t("Send koder til et annet nummer", "Send codes to another number")}
          </button>
        )}

        {step === "phone" && (
          <div className="grid gap-3 rounded-[22px] border border-ink/12 bg-mute px-4.5 py-4">
            <div className="text-sm text-ink/78">{t("Hvor skal vi sende koden?", "Where should we send the code?")}</div>
            <div role="radiogroup" aria-label={t("Hvor skal vi sende koden?", "Where should we send the code?")} className="grid gap-2">
              <button type="button" role="radio" aria-checked={choice === "saved"} onClick={() => setChoice("saved")} className={radio(choice === "saved")}>
                <span className={dot(choice === "saved")} />
                {t("Mitt nummer", "My number")}: {profile.phone || "—"}
              </button>
              <button type="button" role="radio" aria-checked={choice === "other"} onClick={() => setChoice("other")} className={radio(choice === "other")}>
                <span className={dot(choice === "other")} />
                {t("Bruk et annet nummer", "Use another number")}
              </button>
            </div>
            {choice === "other" && (
              <label className={fieldLabelClass}>
                {t("Telefonnummer", "Phone number")}
                <input
                  type="tel"
                  value={other}
                  onChange={(e) => {
                    setOther(e.target.value);
                    setTfErr("");
                  }}
                  placeholder="+47 400 00 000"
                  className={inputClass}
                />
              </label>
            )}
            {tfErr && err(tfErr)}
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={sendCode} className={primaryButton}>
                {t("Send kode", "Send code")}
              </button>
              <button type="button" onClick={() => setStep("")} className={secondaryButton}>
                {t("Avbryt", "Cancel")}
              </button>
            </div>
          </div>
        )}

        {step === "code" && (
          <div className="grid gap-3 rounded-[22px] border border-ink/12 bg-mute px-4.5 py-4">
            <div className="text-sm text-ink/78">
              {t("Vi har sendt en 6-sifret kode til", "We sent a 6-digit code to")} <b>{maskPhone(target)}</b>
            </div>
            <div className="rounded-[14px] border border-[#FFD23F] bg-[#FFF3C2] px-3.5 py-2.5 text-[12.5px] text-ink">
              {t("Demo: ingen ekte SMS sendes — koden din er", "Demo: no real SMS is sent — your code is")}{" "}
              <b className="tracking-[0.12em]">{sentCode}</b>
            </div>
            <label className={fieldLabelClass}>
              {t("Skriv inn koden", "Enter code")}
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setTfErr("");
                }}
                placeholder="000000"
                className={`${inputClass} text-lg tracking-[0.3em]`}
              />
            </label>
            {tfErr && err(tfErr)}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  if (code !== sentCode) {
                    setTfErr(t("Koden er ikke riktig. Prøv igjen.", "That code is not correct. Try again."));
                    return;
                  }
                  profile.save({ twoFA: { on: true, phone: target } });
                  setStep("");
                  setCode("");
                  setTfDone(true);
                }}
                className={primaryButton}
              >
                {t("Bekreft og slå på", "Verify and turn on")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setChoice("other");
                  setTfErr("");
                }}
                className={secondaryButton}
              >
                {t("Bruk et annet nummer", "Use another number")}
              </button>
              <button type="button" onClick={() => setStep("")} className={secondaryButton}>
                {t("Avbryt", "Cancel")}
              </button>
            </div>
          </div>
        )}
        {tfDone && ok(t("Tostegsverifisering er slått på.", "Two-step verification is on."))}
      </div>
    </div>
  );
}

/* ---- Group memberships ------------------------------------------------- */

function GroupsPanel({ profile }) {
  const { t, lang } = useLang();
  const mine = profile.local.groups || [];
  const [adding, setAdding] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [added, setAdded] = useState("");

  return (
    <div>
      <div className="grid gap-3 pb-1.5 pt-4">
        {!adding ? (
          <>
            <button
              type="button"
              onClick={() => {
                setAdding(true);
                setCode("");
                setError("");
                setAdded("");
              }}
              className="inline-flex cursor-pointer items-center gap-2.5 justify-self-start rounded-full border-0 bg-moss px-5.5 py-3 font-heading text-sm font-extrabold text-white hover:bg-ink"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                +
              </span>
              {t("Legg til ny gruppe", "Add a new group")}
            </button>
            {added && ok(added)}
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (code.length !== 6) return setError(t("Koden har 6 siffer.", "The code has 6 digits."));
              const group = GROUP_CODES[code];
              if (!group) return setError(t("Koden samsvarer ikke med noen gruppe. Sjekk den og prøv igjen.", "That code does not match any group. Check it and try again."));
              if (mine.some((m) => m.club === group.club && pick(m.name, "no") === group.name.no)) {
                return setError(t("Du er allerede med i denne gruppen.", "You are already in this group."));
              }
              profile.save({ groups: [...mine, group] });
              setAdding(false);
              setCode("");
              setError("");
              setAdded(`${t("Lagt til: ", "Added: ")}${pick(group.name, lang)} · ${clubName(group.club)}`);
              return undefined;
            }}
            className="grid gap-3 rounded-[22px] border border-ink/12 bg-mute px-4.5 py-4"
          >
            <label className="grid gap-2 text-[13.5px] text-ink/78">
              {t("Skriv inn den 6-sifrede koden til gruppens klubb", "Enter the 6-digit code for the group’s club")}
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                autoComplete="off"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setError("");
                }}
                placeholder="000000"
                className={`${inputClass} text-center text-xl tracking-[0.3em]`}
              />
            </label>
            <div className="rounded-[14px] border border-[#FFD23F] bg-[#FFF3C2] px-3.5 py-[9px] text-[12.5px] text-ink">
              {t(
                "Demo-koder: 482913 (IL Fana Fotball), 735201 (Lade Kunstløp), 190466 (Varden BTK)",
                "Demo codes: 482913 (IL Fana Fotball), 735201 (Lade Kunstløp), 190466 (Varden BTK)",
              )}
            </div>
            {error && err(error)}
            <div className="flex gap-2">
              <button type="submit" className={primaryButton}>
                {t("Legg til gruppe", "Add group")}
              </button>
              <button type="button" onClick={() => setAdding(false)} className={secondaryButton}>
                {t("Avbryt", "Cancel")}
              </button>
            </div>
          </form>
        )}
      </div>
      {MEMBER_CLUBS.map((c) => {
        const names = groupsFor(c.slug)
          .map((g) => pick(g.name, lang))
          .concat(mine.filter((m) => m.club === c.slug).map((m) => pick(m.name, lang)));
        return <TextRow key={c.slug} label={c.name} value={names.join(", ") || t("Ingen grupper ennå", "No groups yet")} />;
      })}
    </div>
  );
}

/* ---- Payment ------------------------------------------------------------ */

function PaymentPanel({ profile }) {
  const { t, lang, isEn } = useLang();
  const accounts = profile.local.accounts || [];
  const [view, setView] = useState("menu");
  const [tab, setTab] = useState("paid");
  const [openId, setOpenId] = useState("");
  const [type, setType] = useState("vipps");
  const [fields, setFields] = useState({});
  const [error, setError] = useState("");

  const locale = isEn ? "en-GB" : "nb-NO";
  const payments = PAY_HISTORY.map((p) => ({ ...p, total: p.items.reduce((n, i) => n + i[1], 0), date: new Date(p.at) }));
  const current = payments.find((p) => p.id === openId) || null;
  const list = payments.filter((p) => p.dir === tab).sort((a, b) => b.date - a.date);
  const groups = [];
  list.forEach((p) => {
    const raw = p.date.toLocaleDateString(locale, { month: "long", year: "numeric" });
    const label = raw.charAt(0).toUpperCase() + raw.slice(1);
    let g = groups[groups.length - 1];
    if (!g || g.label !== label) {
      g = { label, items: [] };
      groups.push(g);
    }
    g.items.push(p);
  });

  const formFields = {
    vipps: [["n", t("Vipps-telefonnummer", "Vipps phone number"), "+47 400 00 000", "tel"]],
    card: [
      ["n", t("Kortnummer", "Card number"), "0000 0000 0000 0000", "numeric"],
      ["e", t("Utløp (MM/ÅÅ)", "Expiry (MM/YY)"), "08/28", "numeric"],
      ["c", "CVC", "123", "numeric"],
      ["h", t("Navn på kortet", "Name on card"), "Emma Sunde", "text"],
    ],
    bank: [["n", t("Kontonummer (11 siffer)", "Account number (11 digits)"), "1503 22 48110", "numeric"]],
  }[type];

  const saveAccount = (e) => {
    e.preventDefault();
    const digits = (v) => String(v || "").replace(/\D/g, "");
    const last = (v, n) => digits(v).slice(-n);
    let label;
    if (type === "vipps") {
      if (digits(fields.n).length < 8) return setError(t("Skriv inn et gyldig telefonnummer.", "Enter a valid phone number."));
      label = `Vipps ••• •• ${last(fields.n, 3)}`;
    } else if (type === "card") {
      if (digits(fields.n).length < 15) return setError(t("Skriv inn et gyldig kortnummer.", "Enter a valid card number."));
      if (!/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test((fields.e || "").trim())) return setError(t("Skriv utløpsdato som MM/ÅÅ.", "Enter the expiry date as MM/YY."));
      if (digits(fields.c).length < 3) return setError(t("Skriv inn CVC med 3 siffer.", "Enter the 3-digit CVC."));
      if (!(fields.h || "").trim()) return setError(t("Skriv inn navnet på kortet.", "Enter the name on the card."));
      label = { no: `Kort •••• ${last(fields.n, 4)}`, en: `Card •••• ${last(fields.n, 4)}` };
    } else {
      if (digits(fields.n).length !== 11) return setError(t("Et norsk kontonummer har 11 siffer.", "A Norwegian account number has 11 digits."));
      label = { no: `Bankkonto ••• ${last(fields.n, 4)}`, en: `Bank account ••• ${last(fields.n, 4)}` };
    }
    profile.save({ accounts: [...accounts, { label, type }] });
    setView("menu");
    setFields({});
    setError("");
    return undefined;
  };

  const menuButton =
    "box-border flex w-full cursor-pointer items-center gap-3.5 rounded-[22px] border border-ink/12 bg-white px-5 py-4.5 text-left font-body text-ink transition-colors duration-[250ms] hover:border-grass hover:bg-mute";

  return (
    <div className="grid gap-3.5 pt-4">
      {view === "menu" && (
        <>
          <button type="button" onClick={() => setView("history")} className={menuButton}>
            <span className="min-w-0 flex-1">
              <span className="block font-heading text-base font-extrabold">{t("Betalingshistorikk", "Payment history")}</span>
              <span className="mt-0.5 block text-[13px] text-ink/62">{t("Alt du har betalt og mottatt", "Everything you have paid and received")}</span>
            </span>
            <span aria-hidden="true" className="text-xl text-ink/45">
              ›
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              setView("add");
              setError("");
              setFields({});
            }}
            className={menuButton}
          >
            <span className="min-w-0 flex-1">
              <span className="block font-heading text-base font-extrabold">{t("Legg til betalingskonto", "Add payment account")}</span>
              <span className="mt-0.5 block text-[13px] text-ink/62">{t("Vipps, kort eller bankkonto", "Vipps, card or bank account")}</span>
            </span>
            <span aria-hidden="true" className="text-xl text-ink/45">
              +
            </span>
          </button>
          {accounts.length > 0 && (
            <>
              <div className="pt-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink/50">
                {t("Dine betalingskontoer", "Your payment accounts")}
              </div>
              {accounts.map((a, i) => (
                <div key={`${pick(a.label, "no")}-${i}`} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-mute px-4 py-3">
                  <span className="min-w-0 flex-1 text-[14.5px] font-semibold">{pick(a.label, lang)}</span>
                  <button
                    type="button"
                    onClick={() => profile.save({ accounts: accounts.filter((_, j) => j !== i) })}
                    className="cursor-pointer border-0 bg-transparent font-heading text-[13px] font-extrabold text-[#c92a14] hover:underline"
                  >
                    {t("Fjern", "Remove")}
                  </button>
                </div>
              ))}
            </>
          )}
        </>
      )}

      {view === "add" && (
        <>
          <button type="button" onClick={() => setView("menu")} className={backPill}>
            <span aria-hidden="true">←</span>
            {t("Betaling", "Payment")}
          </button>
          <div className="font-heading text-[17px] font-extrabold">{t("Legg til betalingskonto", "Add payment account")}</div>
          <Segmented
            label={t("Kontotype", "Account type")}
            value={type}
            onChange={(v) => {
              setType(v);
              setFields({});
              setError("");
            }}
            options={[
              { id: "vipps", label: "Vipps" },
              { id: "card", label: t("Kort", "Card") },
              { id: "bank", label: t("Bankkonto", "Bank account") },
            ]}
          />
          <form onSubmit={saveAccount} className="grid gap-3.5">
            {formFields.map(([key, label, placeholder, mode]) => (
              <label key={`${type}-${key}`} className={fieldLabelClass}>
                {label}
                <input
                  type="text"
                  inputMode={mode}
                  autoComplete="off"
                  value={fields[key] || ""}
                  placeholder={placeholder}
                  onChange={(e) => {
                    const v = e.target.value;
                    setFields((prev) => ({ ...prev, [key]: v }));
                    setError("");
                  }}
                  className={inputClass}
                />
              </label>
            ))}
            {error && err(error)}
            <div className="flex gap-2">
              <button type="submit" className={primaryButton}>
                {t("Legg til konto", "Add account")}
              </button>
              <button type="button" onClick={() => setView("menu")} className={secondaryButton}>
                {t("Avbryt", "Cancel")}
              </button>
            </div>
          </form>
        </>
      )}

      {view === "history" && !current && (
        <>
          <button type="button" onClick={() => setView("menu")} className={backPill}>
            <span aria-hidden="true">←</span>
            {t("Betaling", "Payment")}
          </button>
          <div className="font-heading text-[17px] font-extrabold">{t("Betalingshistorikk", "Payment history")}</div>
          <Segmented
            stretch
            size="lg"
            label={t("Betalingshistorikk", "Payment history")}
            value={tab}
            onChange={(v) => {
              setTab(v);
              setOpenId("");
            }}
            options={[
              { id: "paid", label: t("Betalt", "Paid") },
              { id: "recv", label: t("Mottatt", "Received") },
            ]}
          />
          {groups.length === 0 && <div className="py-3 text-sm text-ink/60">{t("Ingen betalinger ennå.", "No payments yet.")}</div>}
          {groups.map((g) => (
            <div key={g.label}>
              <div className="pb-1 pt-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink/50">{g.label}</div>
              <div className="grid gap-2">
                {g.items.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setOpenId(p.id)}
                    className="box-border flex w-full cursor-pointer items-center gap-4 rounded-[18px] border border-ink/10 bg-white px-4 py-3 text-left font-body text-ink transition-colors duration-[250ms] hover:border-grass hover:bg-mute"
                  >
                    <span className="w-11 flex-none text-center">
                      <span className="block font-heading text-xl font-extrabold leading-none">{p.date.getDate()}</span>
                      <span className="mt-[3px] block text-[11px] uppercase tracking-[0.08em] text-ink/55">
                        {p.date.toLocaleDateString(locale, { month: "short" }).replace(".", "")}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-heading text-[14.5px] font-extrabold">{pick(p.title, lang)}</span>
                      <span className="mt-0.5 block text-[12.5px] text-ink/60">
                        {p.dir === "paid" ? t("Betalt til ", "Paid to ") : t("Fra ", "From ")}
                        {clubName(p.club)}
                      </span>
                    </span>
                    <span className={`flex-none font-heading text-[15px] font-extrabold ${p.dir === "recv" ? "text-moss" : ""}`}>
                      {p.dir === "recv" ? "+ " : ""}
                      {kr(p.total)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {view === "history" && current && (
        <>
          <button type="button" onClick={() => setOpenId("")} className={backPill}>
            <span aria-hidden="true">←</span>
            {t("Betalingshistorikk", "Payment history")}
          </button>
          <div>
            <h3 className="m-0 font-heading text-[22px] font-extrabold tracking-[-0.02em]">{pick(current.title, lang)}</h3>
            <div className="mt-1 text-[13.5px] text-ink/62">
              {current.dir === "paid" ? t("Betalt til ", "Paid to ") : t("Mottatt fra ", "Received from ")}
              {clubName(current.club)}
            </div>
          </div>
          <div>
            <div className="pb-1 text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink/50">
              {current.dir === "recv" ? t("Dette fikk du for", "What you received for") : t("Dette har du betalt for", "What you paid for")}
            </div>
            {current.items.map((it, i) => (
              <div key={i} className="flex items-center gap-3 border-b border-ink/8 py-[11px]">
                <span className="min-w-0 flex-1 text-[14.5px]">{pick(it[0], lang)}</span>
                <span className="font-heading text-[14.5px] font-extrabold">{kr(it[1])}</span>
              </div>
            ))}
            <div className="-mt-px flex items-center gap-3 border-t-2 border-ink pb-1 pt-3.5">
              <span className="min-w-0 flex-1 font-heading text-base font-extrabold">
                {current.dir === "paid" ? t("Totalt betalt", "Total amount paid") : t("Totalt mottatt", "Total amount received")}
              </span>
              <span className="font-heading text-xl font-extrabold tracking-[-0.02em]">{kr(current.total)}</span>
            </div>
          </div>
          <div>
            <div className="pb-1 text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink/50">{t("Detaljer", "Details")}</div>
            {[
              [current.dir === "paid" ? t("Betalt til", "Paid to") : t("Mottatt fra", "Received from"), clubName(current.club)],
              [
                t("Dato og tid", "Date and time"),
                `${current.date.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}${t(" kl. ", " at ")}${current.date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}`,
              ],
              [t("Betalingsmåte", "Payment method"), pick(current.method, lang)],
              [t("Betalings-ID", "Payment ID"), `KRZ-${current.ref}`],
            ].map(([label, value]) => (
              <div key={label} className="flex items-baseline gap-3.5 border-b border-ink/8 py-[11px]">
                <span className="flex-[0_0_120px] text-[13.5px] text-ink/62">{label}</span>
                <span className="min-w-0 flex-1 text-right font-heading text-sm font-extrabold [overflow-wrap:anywhere]">{value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---- Push notifications ------------------------------------------------- */

function PushPanel({ profile }) {
  const { t } = useLang();
  const saved = profile.local.notif || {};
  const nf = { ...NOTIF_DEFAULTS, ...saved, clubs: { ...NOTIF_DEFAULTS.clubs, ...(saved.clubs || {}) } };
  const setNf = (patch) => profile.save({ notif: { ...nf, ...patch } });
  const masterOn = NOTIF_FLAGS.some((k) => nf[k]) || MEMBER_CLUBS.some((c) => nf.clubs[c.slug]) || nf.comments !== "none";

  const flag = (key, label) => (
    <Row key={key} label={label}>
      <Switch on={!!nf[key]} label={label} onToggle={() => setNf({ [key]: !nf[key] })} />
    </Row>
  );

  return (
    <div>
      <Row label={t("Alle push-varsler", "All push notifications")} strong>
        <Switch
          on={masterOn}
          label={t("Alle push-varsler", "All push notifications")}
          onToggle={() => {
            const v = !masterOn;
            const all = {};
            NOTIF_FLAGS.forEach((k) => {
              all[k] = v;
            });
            const clubs = {};
            MEMBER_CLUBS.forEach((c) => {
              clubs[c.slug] = v;
            });
            setNf({ ...all, clubs, comments: v ? "all" : "none" });
          }}
        />
      </Row>
      <Head>{t("Klubber", "Clubs")}</Head>
      {MEMBER_CLUBS.map((c) => {
        const label = t(`Varsle meg om ${c.name}`, `Notify me about ${c.name}`);
        return (
          <Row key={c.slug} label={label}>
            <Switch on={!!nf.clubs[c.slug]} label={label} onToggle={() => setNf({ clubs: { ...nf.clubs, [c.slug]: !nf.clubs[c.slug] } })} />
          </Row>
        );
      })}
      <Head>{t("Aktivitet", "Activity")}</Head>
      {flag("board", t("Varsle meg om styremedlemmer", "Notify me about board members"))}
      {flag("invites", t("Varsle meg om invitasjoner til arrangementer", "Notify me about invitations to events"))}
      {flag("posts", t("Varsle meg om nye innlegg og avstemninger", "Notify me about new posts and polls"))}
      <Head>{t("Kommentarer", "Comments")}</Head>
      <Row label={t("Varsle meg om kommentarer", "Notify me about comments")}>
        <Segmented
          size="sm"
          label={t("Varsle meg om kommentarer", "Notify me about comments")}
          value={nf.comments}
          onChange={(v) => setNf({ comments: v })}
          options={[
            { id: "all", label: t("Alle", "All") },
            { id: "mentions", label: t("Kun omtaler", "Mentions only") },
            { id: "none", label: t("Ingen", "None") },
          ]}
        />
      </Row>
      <Head>{t("Svar", "Responses")}</Head>
      {flag("accepts", t("Varsle meg når noen sier ja", "Notify me when someone accepts"))}
      {flag("declines", t("Varsle meg når noen sier nei", "Notify me when someone declines"))}
      <Head>{t("Oppgaver", "Tasks")}</Head>
      {flag("taskAccept", t("Varsle meg når noen tar en oppgave", "Notify me when someone accepts a task"))}
      {flag("taskDecline", t("Varsle meg når noen avslår en oppgave", "Notify me when someone declines a task"))}
      {flag("reminder", t("Varsle meg med forslag om å sende påminnelse", "Notify me with a suggestion to send a reminder"))}
      <Head>{t("Tilgjengelighet", "Availability")}</Head>
      {flag("avail", t("Varsle meg når noen er tilgjengelig", "Notify me when someone is available"))}
      {flag("unavail", t("Varsle meg når noen er utilgjengelig", "Notify me when someone is unavailable"))}
      <Head>{t("Invitasjoner", "Invites")}</Head>
      {flag("pre24", t("Varsle meg 24 timer før invitasjoner sendes ut", "Notify me 24 hours before invites go out"))}
      {flag("invitesOut", t("Varsle meg når invitasjoner sendes ut", "Notify me when invites go out"))}
    </div>
  );
}

/* ---- Calendar ----------------------------------------------------------- */

const CAL_DEFAULTS = { def: "kretz", perm: false, conn: { device: false, google: false }, alert: "30", evAcc: true, evUn: false, avAcc: true, avUn: false };

function CalendarPanel({ profile }) {
  const { t } = useLang();
  const cal = { ...CAL_DEFAULTS, ...(profile.local.cal || {}) };
  const setCal = (patch) => profile.save({ cal: { ...cal, ...patch } });
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const names = { kretz: t("Kretz-kalender", "Kretz calendar"), device: t("Enhetskalender", "Device calendar"), google: "Google Calendar" };

  const toggle = (key, label) => (
    <Row boxed label={<span className="text-ink">{label}</span>}>
      <Switch on={!!cal[key]} label={label} onToggle={() => setCal({ [key]: !cal[key] })} />
    </Row>
  );

  return (
    <div>
      <Row boxed strong label={t("Standardkalender", "Default calendar")}>
        <button
          type="button"
          onClick={() => setSourcesOpen(true)}
          aria-label={t("Standardkalender", "Default calendar")}
          className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-ink/18 bg-mute py-[9px] pl-4 pr-3.5 font-heading text-sm font-extrabold text-ink transition-colors duration-[250ms] hover:bg-grass-tint"
        >
          {names[cal.def] || names.kretz}
          <span aria-hidden="true" className="text-[17px] text-ink/50">
            ›
          </span>
        </button>
      </Row>
      <Row boxed strong label={t("Kalendervarsel", "Calendar alert")}>
        <select
          value={cal.alert}
          onChange={(e) => setCal({ alert: e.target.value })}
          aria-label={t("Kalendervarsel", "Calendar alert")}
          className="max-w-[52%] appearance-auto rounded-full border border-ink/18 bg-mute px-3.5 py-2.5 font-body text-sm text-ink outline-none"
        >
          {[
            ["0", t("Ingen varsel", "No alert")],
            ["at", t("Ved start", "At the time of the event")],
            ["15", t("15 minutter før", "15 minutes before")],
            ["30", t("30 minutter før", "30 minutes before")],
            ["60", t("1 time før", "1 hour before")],
            ["1440", t("1 døgn før", "1 day before")],
          ].map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </Row>
      <Head big>{t("Arrangementer", "Events")}</Head>
      {toggle("evAcc", t("Synkroniser aksepterte", "Synchronise accepted"))}
      {toggle("evUn", t("Synkroniser ubesvarte", "Synchronise unanswered"))}
      <Head big>{t("Tilgjengelighetsforespørsler", "Availability requests")}</Head>
      {toggle("avAcc", t("Synkroniser aksepterte", "Synchronise accepted"))}
      {toggle("avUn", t("Synkroniser ubesvarte", "Synchronise unanswered"))}

      {sourcesOpen && <CalendarSources cal={cal} names={names} setCal={setCal} onClose={() => setSourcesOpen(false)} />}
    </div>
  );
}

/* Choosing the default calendar, after a permission prompt the first time. */
function CalendarSources({ cal, names, setCal, onClose }) {
  const { t } = useLang();
  return (
    <Modal onClose={onClose} label={t("Standardkalender", "Default calendar")} z="z-[105]" scrim="bg-ink/55 backdrop-blur-[8px]" className="max-w-[440px]">
      <div className="box-border max-h-[88vh] overflow-y-auto rounded-[28px] bg-white px-6.5 pb-[22px] pt-6.5 shadow-[0_36px_90px_rgba(22,36,26,0.38)]">
        {!cal.perm ? (
          <>
            <div className="text-center">
              <span aria-hidden="true" className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-[#E3F3DF] text-[#1F6B2E]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </span>
              <h2 className="mb-2 mt-4 font-heading text-xl font-extrabold leading-[1.25]">
                {t("«Kretz» vil ha tilgang til kalenderne dine", "“Kretz” would like to access your calendars")}
              </h2>
              <p className="m-0 text-[14.5px] leading-[1.5] text-ink/70">
                {t(
                  "Kretz bruker kalenderne dine til å legge inn arrangementer og vise når du er opptatt, så du raskere kan svare på invitasjoner.",
                  "Kretz uses your calendars to add events and to show when you are busy, so you can answer invitations faster.",
                )}
              </p>
            </div>
            <div className="mt-5 grid gap-2">
              <button type="button" onClick={() => setCal({ perm: true })} className="cursor-pointer rounded-full border-0 bg-moss px-5 py-3.5 font-heading text-[15px] font-extrabold text-white hover:bg-ink">
                {t("Tillat", "Allow")}
              </button>
              <button type="button" onClick={onClose} className="cursor-pointer rounded-full border border-ink/20 bg-white px-5 py-[13px] font-heading text-[15px] font-extrabold text-ink hover:bg-ink/6">
                {t("Ikke tillat", "Don’t allow")}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="m-0 font-heading text-xl font-extrabold">{t("Standardkalender", "Default calendar")}</h2>
            <p className="mb-3.5 mt-1.5 text-sm leading-[1.5] text-ink/68">
              {t(
                "Velg hvor nye arrangementer legges inn. Koble til enhetskalenderen eller Google Calendar for å bruke dem.",
                "Choose where new events are added. Connect your device calendar or Google Calendar to use them.",
              )}
            </p>
            <div className="grid gap-2.5">
              {["kretz", "device", "google"].map((id) => {
                const connected = id === "kretz" || !!cal.conn[id];
                const isDefault = cal.def === id;
                return (
                  <div
                    key={id}
                    className={`flex items-center gap-3.5 rounded-[18px] border px-4 py-3.5 ${isDefault ? "border-grass bg-grass-tint" : "border-ink/12 bg-white"} ${connected ? "" : "opacity-85"}`}
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={isDefault}
                      aria-label={names[id]}
                      onClick={() => connected && setCal({ def: id })}
                      className={`box-border h-[22px] w-[22px] flex-none rounded-full border-2 p-0 ${
                        isDefault ? "border-moss bg-[radial-gradient(circle,#1f7a3a_45%,transparent_50%)]" : "border-ink/30 bg-white"
                      } ${connected ? "cursor-pointer" : "cursor-not-allowed opacity-40"}`}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-[15px] font-extrabold">{names[id]}</span>
                      <span className="mt-0.5 block text-[12.5px] text-ink/60">
                        {id === "kretz"
                          ? t("Innebygd – alltid tilgjengelig", "Built in — always available")
                          : connected
                            ? t("Tilkoblet", "Connected")
                            : t("Ikke tilkoblet", "Not connected")}
                      </span>
                    </span>
                    {id !== "kretz" && (
                      <button
                        type="button"
                        onClick={() => {
                          const conn = { ...cal.conn, [id]: !cal.conn[id] };
                          setCal({ conn, def: !conn[id] && cal.def === id ? "kretz" : cal.def });
                        }}
                        className={`flex-none cursor-pointer rounded-full px-4 py-2 font-heading text-[13px] font-extrabold ${
                          connected ? "border border-ink/20 bg-white text-ink" : "border-0 bg-moss text-white"
                        }`}
                      >
                        {connected ? t("Koble fra", "Disconnect") : t("Koble til", "Connect")}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <button type="button" onClick={onClose} className="mt-4.5 w-full cursor-pointer rounded-full border-0 bg-ink px-5 py-[13px] font-heading text-[15px] font-extrabold text-paper hover:bg-moss">
              {t("Ferdig", "Done")}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
