-- Per 3.pro-db.md: deleting a folder should orphan its links (folder_id -> null)
-- instead of deleting them, so folder_id must be nullable.
alter table public.links drop constraint links_folder_id_fkey;
alter table public.links alter column folder_id drop not null;
alter table public.links
  add constraint links_folder_id_fkey
  foreign key (folder_id) references public.folders (id) on delete set null;
