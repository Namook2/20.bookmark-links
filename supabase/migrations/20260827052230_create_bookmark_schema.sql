-- Bookmark links: folders and links, replacing the in-memory mock data.
-- folders.id is a short slug generated client-side (see app/_lib/generateFolderId.ts),
-- so it is stored as text rather than a surrogate uuid/serial key.
create table public.folders (
  id text primary key,
  name text not null,
  created_at timestamptz not null default now()
);

create table public.links (
  id uuid primary key default gen_random_uuid(),
  folder_id text not null references public.folders (id) on delete cascade,
  title text not null,
  url text not null,
  description text,
  thumbnail text,
  created_at timestamptz not null default now()
);

create index links_folder_id_idx on public.links (folder_id);

alter table public.folders enable row level security;
alter table public.links enable row level security;

-- The app has no authentication yet, so every visitor shares one open
-- workspace and reads/writes as the anon role. Revisit these policies
-- (scope rows to auth.uid()) once user accounts are introduced.
create policy "folders are publicly readable" on public.folders
  for select to anon, authenticated using (true);

create policy "folders are publicly insertable" on public.folders
  for insert to anon, authenticated with check (true);

create policy "folders are publicly updatable" on public.folders
  for update to anon, authenticated using (true) with check (true);

create policy "folders are publicly deletable" on public.folders
  for delete to anon, authenticated using (true);

create policy "links are publicly readable" on public.links
  for select to anon, authenticated using (true);

create policy "links are publicly insertable" on public.links
  for insert to anon, authenticated with check (true);

create policy "links are publicly updatable" on public.links
  for update to anon, authenticated using (true) with check (true);

create policy "links are publicly deletable" on public.links
  for delete to anon, authenticated using (true);

-- Seed with the same rows the app previously hardcoded in app/_lib/mock-data.ts,
-- so existing behavior is unchanged immediately after migrating.
insert into public.folders (id, name) values
  ('dev', '개발'),
  ('design', '디자인'),
  ('reading', '읽을거리');

insert into public.links (title, url, folder_id, description) values
  ('Next.js Docs', 'https://nextjs.org/docs', 'dev', 'Next.js 공식 문서 및 API 레퍼런스'),
  ('React Docs', 'https://react.dev', 'dev', 'React 공식 문서'),
  ('MDN Web Docs', 'https://developer.mozilla.org', 'dev', '웹 표준 기술 문서'),
  ('GitHub', 'https://github.com', 'dev', '코드 저장소 및 협업 플랫폼'),
  ('Figma', 'https://figma.com', 'design', '협업 디자인 툴'),
  ('Dribbble', 'https://dribbble.com', 'design', '디자인 영감 공유 플랫폼'),
  ('Hacker News', 'https://news.ycombinator.com', 'reading', '개발자를 위한 뉴스 커뮤니티'),
  ('CSS-Tricks', 'https://css-tricks.com', 'reading', 'CSS 및 프론트엔드 아티클');
