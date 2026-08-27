-- Recreate folders with a serial primary key and RLS disabled per spec (2.pro-db.md).
-- links.folder_id is retyped to integer to match; links keeps RLS enabled as before.
drop table if exists public.links;
drop table if exists public.folders;

create table public.folders (
  id serial primary key,
  name text not null,
  created_at timestamptz not null default now()
);

create table public.links (
  id uuid primary key default gen_random_uuid(),
  folder_id integer not null references public.folders (id) on delete cascade,
  title text not null,
  url text not null,
  description text,
  thumbnail text,
  created_at timestamptz not null default now()
);

create index links_folder_id_idx on public.links (folder_id);

alter table public.links enable row level security;

create policy "links are publicly readable" on public.links
  for select to anon, authenticated using (true);

create policy "links are publicly insertable" on public.links
  for insert to anon, authenticated with check (true);

create policy "links are publicly updatable" on public.links
  for update to anon, authenticated using (true) with check (true);

create policy "links are publicly deletable" on public.links
  for delete to anon, authenticated using (true);

insert into public.folders (name) values ('개발'), ('디자인'), ('읽을거리');

insert into public.links (title, url, folder_id, description) values
  ('Next.js Docs', 'https://nextjs.org/docs', (select id from public.folders where name = '개발'), 'Next.js 공식 문서 및 API 레퍼런스'),
  ('React Docs', 'https://react.dev', (select id from public.folders where name = '개발'), 'React 공식 문서'),
  ('MDN Web Docs', 'https://developer.mozilla.org', (select id from public.folders where name = '개발'), '웹 표준 기술 문서'),
  ('GitHub', 'https://github.com', (select id from public.folders where name = '개발'), '코드 저장소 및 협업 플랫폼'),
  ('Figma', 'https://figma.com', (select id from public.folders where name = '디자인'), '협업 디자인 툴'),
  ('Dribbble', 'https://dribbble.com', (select id from public.folders where name = '디자인'), '디자인 영감 공유 플랫폼'),
  ('Hacker News', 'https://news.ycombinator.com', (select id from public.folders where name = '읽을거리'), '개발자를 위한 뉴스 커뮤니티'),
  ('CSS-Tricks', 'https://css-tricks.com', (select id from public.folders where name = '읽을거리'), 'CSS 및 프론트엔드 아티클');
