create table books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  growth_path text not null check (growth_path in ('SP', 'LR', 'PG', 'PP')),
  sequence_order int not null,
  page_count int,
  cover_image_url text not null default '',
  retailer_url text not null,
  description text,
  created_at timestamptz not null default now(),
  unique (title, author)
);

create index books_growth_path_sequence_idx on books (growth_path, sequence_order);

alter table books enable row level security;

-- Reference/catalog data: readable by any signed-in user, writable only via
-- scripts/seed-books.js (service_role) — no client insert/update/delete policy.
create policy "Books are readable by authenticated users"
  on books for select
  to authenticated
  using (true);

create table user_reading_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references books(id),
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  plan_weeks int check (plan_weeks in (4, 8, 12)),
  weekly_page_target int,
  start_date date,
  current_week int not null default 1,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, book_id)
);

alter table user_reading_progress enable row level security;

create policy "Users can view their own reading progress"
  on user_reading_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reading progress"
  on user_reading_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reading progress"
  on user_reading_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table reading_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reading_progress_id uuid not null references user_reading_progress(id) on delete cascade,
  week_number int not null,
  pages_target int,
  pages_reported int,
  hit_target boolean,
  checked_in_at timestamptz not null default now()
);

create index reading_checkins_progress_idx on reading_checkins (reading_progress_id);

alter table reading_checkins enable row level security;

create policy "Users can view their own reading checkins"
  on reading_checkins for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reading checkins"
  on reading_checkins for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reading checkins"
  on reading_checkins for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  daily_reminder_enabled boolean not null default true,
  daily_reminder_time time not null default '19:00',
  weekly_checkin_enabled boolean not null default true
);

alter table notification_preferences enable row level security;

create policy "Users can view their own notification preferences"
  on notification_preferences for select
  using (auth.uid() = user_id);

create policy "Users can insert their own notification preferences"
  on notification_preferences for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own notification preferences"
  on notification_preferences for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
