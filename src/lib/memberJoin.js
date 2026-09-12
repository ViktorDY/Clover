/*
  Whether this member has joined a club yet.

  Remembered in localStorage so the join screen only appears once. The
  landing page's login clears it when you sign in with the first-time
  password, which is how the first-run experience is reached again.
*/
export const JOINED_KEY = "kretz.member.joined";

export function readJoined() {
  try {
    return window.localStorage.getItem(JOINED_KEY) === "1";
  } catch {
    return true;
  }
}

export function rememberJoined() {
  try {
    window.localStorage.setItem(JOINED_KEY, "1");
  } catch {
    // Remembering the club is a convenience; failing to persist is not fatal.
  }
}

export function forgetJoined() {
  try {
    window.localStorage.removeItem(JOINED_KEY);
  } catch {
    // Same here: the join screen simply will not reappear.
  }
}
