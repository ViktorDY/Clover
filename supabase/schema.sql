-- Kretz: member accounts
-- Paste this whole file into Supabase → SQL Editor → New query, and click Run.
-- It is safe to run more than once — after a change, just run it again.

-- 1. Profiles ---------------------------------------------------------------
-- Supabase keeps the login itself (email + hashed password) in auth.users.
-- This table holds the rest of what the sign-up form asks for, one row per
-- account, and disappears together with the account if it is deleted.
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  first_name  text not null default '',
  last_name   text not null default '',
  phone       text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. Security rules -----------------------------------------------------------
-- Row-level security: with it on, nobody can read or change a row unless a
-- policy below allows it. Each signed-in member can see and edit only their
-- own profile; visitors who are not signed in can see nothing.
alter table public.profiles enable row level security;

drop policy if exists "Members can read their own profile" on public.profiles;
create policy "Members can read their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Members can update their own profile" on public.profiles;
create policy "Members can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- 3. Create the profile automatically ------------------------------------------
-- When someone signs up, the website sends their name and phone along as
-- metadata. This trigger copies it into profiles the moment the account is
-- created, so the profile exists even before the email is confirmed.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, first_name, last_name, phone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    -- Stored as one string without spaces, e.g. +4741234567.
    regexp_replace(coalesce(new.raw_user_meta_data ->> 'phone', ''), '\s', '', 'g')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keep updated_at honest when a member edits their profile.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- 4. Phone numbers --------------------------------------------------------------
-- One format for every number: "+" and digits only, e.g. +4741234567. The
-- website already sends it like that; this makes the database insist on it.
-- (NOT VALID leaves rows saved before this rule alone.)
alter table public.profiles drop constraint if exists profiles_phone_format;
alter table public.profiles
  add constraint profiles_phone_format
  check (phone = '' or phone ~ '^\+[1-9][0-9]{6,14}$') not valid;

-- 5. Deleting your own account ------------------------------------------------
-- The website can't delete accounts directly (that needs the secret key), so
-- this function does it on the member's behalf — but only for the member who
-- is signed in, and only after their password checks out. Deleting the
-- account also deletes their profile (on delete cascade above).
create or replace function public.delete_own_account(current_password text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  member_id uuid := auth.uid();
  stored_hash text;
begin
  if member_id is null then
    raise exception 'not_signed_in';
  end if;

  select encrypted_password into stored_hash from auth.users where id = member_id;

  if stored_hash is null
     or stored_hash = ''
     or extensions.crypt(current_password, stored_hash) <> stored_hash then
    raise exception 'wrong_password';
  end if;

  delete from auth.users where id = member_id;
end;
$$;

revoke all on function public.delete_own_account(text) from public, anon;
grant execute on function public.delete_own_account(text) to authenticated;
