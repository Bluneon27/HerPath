create table growth_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assessment_version text not null default '1.0',
  q1_current_season text not null,
  q2_primary_priority text not null,
  q3_current_focus text not null,
  q4_perceived_barrier text not null,
  q5_current_challenge text not null,
  q6_life_season text not null,
  q7_consistency_profile text not null,
  q8_support_need text not null,
  q9_growth_capacity text not null,
  q10_current_life_challenge text not null,
  q11_six_month_success text not null,
  sp_score int not null,
  lr_score int not null,
  pg_score int not null,
  pp_score int not null,
  primary_growth_path text not null,
  secondary_growth_path_1 text not null,
  secondary_growth_path_2 text not null,
  assessment_date timestamptz not null default now()
);

create index growth_assessments_user_id_idx on growth_assessments (user_id);

alter table growth_assessments enable row level security;

create policy "Users can insert their own assessments"
  on growth_assessments for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own assessments"
  on growth_assessments for select
  using (auth.uid() = user_id);
