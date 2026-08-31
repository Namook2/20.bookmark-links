-- Add per-user ownership to folders and links, and scope RLS to the owning user.
-- Existing rows predate authentication and have no owner, so they are removed first.

delete from public.links;
delete from public.folders;

alter table public.folders
  add column user_id uuid not null default auth.uid() references auth.users (id) on delete cascade;

alter table public.links
  add column user_id uuid not null default auth.uid() references auth.users (id) on delete cascade;

create index folders_user_id_idx on public.folders (user_id);
create index links_user_id_idx on public.links (user_id);

alter table public.folders enable row level security;

create policy "folders are readable by owner" on public.folders
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "folders are insertable by owner" on public.folders
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "folders are updatable by owner" on public.folders
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "folders are deletable by owner" on public.folders
  for delete to authenticated using ((select auth.uid()) = user_id);

drop policy "links are publicly readable" on public.links;
drop policy "links are publicly insertable" on public.links;
drop policy "links are publicly updatable" on public.links;
drop policy "links are publicly deletable" on public.links;

create policy "links are readable by owner" on public.links
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "links are insertable by owner" on public.links
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "links are updatable by owner" on public.links
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "links are deletable by owner" on public.links
  for delete to authenticated using ((select auth.uid()) = user_id);
