-- Ejecutar en Supabase → SQL Editor (después de profiles.sql)

create table if not exists public.puntuaciones (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  nombre_jugador text not null,
  puntaje integer not null check (puntaje >= 0),
  created_at timestamptz default now()
);

create index if not exists puntuaciones_puntaje_idx
  on public.puntuaciones (puntaje desc, created_at asc);

alter table public.puntuaciones enable row level security;

-- Cualquiera puede ver el top 10
create policy "Top 10 visible para todos"
  on public.puntuaciones for select
  using (true);

-- Solo usuarios logueados pueden guardar su puntaje
create policy "Usuario logueado guarda puntaje"
  on public.puntuaciones for insert
  with check (auth.uid() = user_id);

-- Habilitar Realtime (también activar la tabla en Database → Replication)
alter table public.puntuaciones replica identity full;

alter publication supabase_realtime add table public.puntuaciones;
