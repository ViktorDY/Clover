import { useCallback, useEffect, useMemo, useState } from "react";
import { forgetJoined } from "../../lib/memberJoin";
import { siteUrl, supabase } from "../../lib/supabase";

/*
  The member's own profile: who they are and their settings.

  Two sources. A real Supabase account supplies name, email and phone from
  the `profiles` table, and the account actions (change password, reset it,
  change email, delete the account) go to Supabase. Everything the database
  has no column for yet — photo, birthday, notification and calendar
  settings, saved payment accounts — is kept in localStorage, one copy per
  account, under the canvas's key `kretz.member.profile`.

  Signed in with the demo login there is no account, so the canvas's
  "Emma Sunde" stands in and every action is simulated.
*/

const BASE_KEY = "kretz.member.profile";
const SAVED_EMAIL_KEY = "kretz.login.email";

export const DEMO_NAME = "Emma Sunde";
const DEMO_EMAIL = "emma.sunde@example.no";
const DEMO_PHONE = "+47 400 12 345";

function storageKey(userId) {
  return userId ? `${BASE_KEY}.${userId}` : BASE_KEY;
}

function readLocal(userId) {
  try {
    const data = JSON.parse(window.localStorage.getItem(storageKey(userId)) || "{}");
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function writeLocal(userId, data) {
  try {
    window.localStorage.setItem(storageKey(userId), JSON.stringify(data));
  } catch {
    // Settings still apply for this visit; they just won't be remembered.
  }
}

// "+47 412 34 567" → "+4741234567", the format the database insists on.
function compactPhone(phone) {
  return String(phone || "").replace(/[\s-]/g, "");
}

// "+4741234567" → "+47 412 34 567" for display.
function prettyPhone(phone) {
  const m = /^\+47(\d{3})(\d{2})(\d{3})$/.exec(phone || "");
  return m ? `+47 ${m[1]} ${m[2]} ${m[3]}` : phone || "";
}

export default function useMemberProfile() {
  const [account, setAccount] = useState(null);
  const [local, setLocal] = useState(() => readLocal(null));

  // Load the signed-in account, if any, and its own local settings.
  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (!alive || !user) return;
      const { data: row } = await supabase
        .from("profiles")
        .select("first_name, last_name, phone, email")
        .eq("id", user.id)
        .maybeSingle();
      if (!alive) return;
      setAccount({
        id: user.id,
        email: user.email || row?.email || "",
        firstName: row?.first_name || user.user_metadata?.first_name || "",
        lastName: row?.last_name || user.user_metadata?.last_name || "",
        phone: row?.phone || "",
      });
      setLocal(readLocal(user.id));
    });
    return () => {
      alive = false;
    };
  }, []);

  const userId = account ? account.id : null;

  const save = useCallback(
    (patch) => {
      setLocal((prev) => {
        const next = { ...prev, ...patch };
        writeLocal(userId, next);
        return next;
      });
    },
    [userId],
  );

  const accountName = account ? `${account.firstName} ${account.lastName}`.trim() : "";
  const fullName = (account ? accountName : local.name) || local.name || DEMO_NAME;
  const email = account ? account.email : local.email || DEMO_EMAIL;
  const phone = account ? prettyPhone(account.phone) || local.phone || "" : local.phone || DEMO_PHONE;

  /* Account actions. Each returns { ok, error, info } with bilingual text. */

  const saveName = useCallback(
    async (name) => {
      const clean = name.trim();
      if (!account) {
        save({ name: clean });
        return { ok: true };
      }
      const [first, ...rest] = clean.split(/\s+/);
      const { error } = await supabase
        .from("profiles")
        .update({ first_name: first || "", last_name: rest.join(" ") })
        .eq("id", account.id);
      if (error) {
        return { ok: false, error: { no: "Kunne ikke lagre navnet akkurat nå.", en: "Couldn't save the name right now." } };
      }
      setAccount((prev) => ({ ...prev, firstName: first || "", lastName: rest.join(" ") }));
      return { ok: true };
    },
    [account, save],
  );

  const saveContact = useCallback(
    async ({ email: nextEmail, phone: nextPhone }) => {
      if (!account) {
        save({ email: nextEmail.trim(), phone: nextPhone.trim() });
        return { ok: true };
      }
      const phoneDb = compactPhone(nextPhone);
      if (phoneDb && !/^\+[1-9][0-9]{6,14}$/.test(phoneDb)) {
        return {
          ok: false,
          error: { no: "Skriv telefonnummeret med landskode, for eksempel +47 412 34 567.", en: "Write the number with its country code, for example +47 412 34 567." },
        };
      }
      if (phoneDb !== account.phone) {
        const { error } = await supabase.from("profiles").update({ phone: phoneDb }).eq("id", account.id);
        if (error) {
          return { ok: false, error: { no: "Kunne ikke lagre telefonnummeret akkurat nå.", en: "Couldn't save the phone number right now." } };
        }
        setAccount((prev) => ({ ...prev, phone: phoneDb }));
      }
      const mail = nextEmail.trim().toLowerCase();
      if (mail && mail !== account.email) {
        const { error } = await supabase.auth.updateUser({ email: mail }, { emailRedirectTo: siteUrl() });
        if (error) {
          return { ok: false, error: { no: "Kunne ikke endre e-postadressen akkurat nå.", en: "Couldn't change the email address right now." } };
        }
        return {
          ok: true,
          info: { no: `Vi har sendt en bekreftelseslenke til ${mail}. Adressen endres når du har trykket på den.`, en: `We've sent a confirmation link to ${mail}. The address changes once you've clicked it.` },
        };
      }
      return { ok: true };
    },
    [account, save],
  );

  const changePassword = useCallback(
    async (current, next) => {
      if (!account) {
        save({ pwChanged: new Date().toISOString() });
        return { ok: true };
      }
      const { error: checkError } = await supabase.auth.signInWithPassword({ email: account.email, password: current });
      if (checkError) {
        return { ok: false, error: { no: "Det nåværende passordet er feil.", en: "The current password is wrong." } };
      }
      const { error } = await supabase.auth.updateUser({ password: next });
      if (error) {
        return { ok: false, error: { no: "Kunne ikke endre passordet akkurat nå.", en: "Couldn't change the password right now." } };
      }
      save({ pwChanged: new Date().toISOString() });
      return { ok: true };
    },
    [account, save],
  );

  const resetPassword = useCallback(async () => {
    if (account) {
      await supabase.auth.resetPasswordForEmail(account.email, { redirectTo: siteUrl() });
    }
    return { ok: true };
  }, [account]);

  /*
    Deleting. A real account needs its password (the database function
    delete_own_account checks it); afterwards this browser forgets it.
    The demo just clears what it stored.
  */
  const deleteAccount = useCallback(
    async (password) => {
      if (account) {
        const { error } = await supabase.rpc("delete_own_account", { current_password: password });
        if (error) {
          if (error.message?.includes("wrong_password")) {
            return { ok: false, error: { no: "Feil passord.", en: "Wrong password." } };
          }
          if (error.code === "PGRST202") {
            return { ok: false, error: { no: "Sletting er ikke satt opp i databasen ennå.", en: "Deleting isn't set up in the database yet." } };
          }
          return { ok: false, error: { no: "Kunne ikke slette kontoen akkurat nå. Prøv igjen om litt.", en: "Couldn't delete the account right now. Try again in a moment." } };
        }
        await supabase.auth.signOut({ scope: "local" });
      }
      try {
        window.localStorage.removeItem(storageKey(userId));
        window.localStorage.removeItem("kretz.member.pinnedClub");
        if (account && window.localStorage.getItem(SAVED_EMAIL_KEY) === account.email) {
          window.localStorage.removeItem(SAVED_EMAIL_KEY);
        }
      } catch {
        // Nothing worth failing over.
      }
      forgetJoined();
      return { ok: true };
    },
    [account, userId],
  );

  return useMemo(
    () => ({
      isReal: !!account,
      local,
      save,
      fullName,
      firstName: fullName.split(/\s+/)[0],
      email,
      phone,
      saveName,
      saveContact,
      changePassword,
      resetPassword,
      deleteAccount,
    }),
    [account, local, save, fullName, email, phone, saveName, saveContact, changePassword, resetPassword, deleteAccount],
  );
}
