import { createClient } from "@supabase/supabase-js";

/*
  The one Supabase client the whole site shares.

  Both values are meant to be public: the anon key only lets the browser do
  what the database's row-level security rules allow (see
  supabase/schema.sql). The secret service_role key must never appear here.
*/
const SUPABASE_URL = "https://ovsklwwfpbpkqsrzazxi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c2tsd3dmcGJwa3FzcnphenhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzMTk5MDIsImV4cCI6MjEwNzg5NTkwMn0.OCEwXxMPy_TUj17egWReNucoAjRhYMhc3E-nWIuuysg";

/*
  The confirmation email links back here with the session in the hash
  (#access_token=…). Supabase reads it and then clears the hash, so note now,
  before that happens, that this visit came from such a link — App uses it to
  send the new member straight to the dashboard.
*/
export const arrivedFromAuthLink =
  typeof window !== "undefined" && /access_token=|error_description=/.test(window.location.hash);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Implicit flow, so a confirmation link works even when opened in a
    // different browser than the one used to sign up.
    flowType: "implicit",
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/** Where the confirmation email should send people back to: this site's root. */
export function siteUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}
