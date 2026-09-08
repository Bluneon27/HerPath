create table videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  youtube_id text not null unique,
  growth_paths text[] not null check (
    array_length(growth_paths, 1) > 0
    and growth_paths <@ array['SP', 'LR', 'PG', 'PP']::text[]
  ),
  sequence_order int not null,
  created_at timestamptz not null default now()
);

create index videos_sequence_order_idx on videos (sequence_order);
create index videos_growth_paths_idx on videos using gin (growth_paths);

alter table videos enable row level security;

-- Reference/catalog data: readable by any signed-in user, writable only via
-- scripts/seed-videos.js (service_role) — no client insert/update/delete policy.
create policy "Videos are readable by authenticated users"
  on videos for select
  to authenticated
  using (true);

create table user_video_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  video_id uuid not null references videos(id) on delete cascade,
  watched boolean not null default false,
  watched_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, video_id)
);

alter table user_video_progress enable row level security;

create policy "Users can view their own video progress"
  on user_video_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own video progress"
  on user_video_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own video progress"
  on user_video_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
