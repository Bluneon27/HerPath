create table articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null unique,
  source text not null,
  growth_paths text[] not null check (
    array_length(growth_paths, 1) > 0
    and growth_paths <@ array['SP', 'LR', 'PG', 'PP']::text[]
  ),
  sequence_order int not null,
  created_at timestamptz not null default now()
);

create index articles_sequence_order_idx on articles (sequence_order);
create index articles_growth_paths_idx on articles using gin (growth_paths);

alter table articles enable row level security;

-- Reference/catalog data: readable by any signed-in user, writable only via
-- scripts/seed-articles.js (service_role) — no client insert/update/delete policy.
create policy "Articles are readable by authenticated users"
  on articles for select
  to authenticated
  using (true);

create table user_article_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  article_id uuid not null references articles(id) on delete cascade,
  read boolean not null default false,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, article_id)
);

alter table user_article_progress enable row level security;

create policy "Users can view their own article progress"
  on user_article_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own article progress"
  on user_article_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own article progress"
  on user_article_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
