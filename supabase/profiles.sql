-- Ejecutar en Supabase → SQL Editor

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  alias text unique not null,
  email text not null,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Cualquiera puede buscar alias para login (solo email)
create policy "Alias visible para login"
  on public.profiles for select
  using (true);

-- Usuario autenticado crea su propio perfil al registrarse
create policy "Usuario crea su perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Usuario actualiza su propio perfil
create policy "Usuario actualiza su perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Crear perfil automaticamente al registrarse (usa el alias del metadata)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, alias, email)
  values (
    new.id,
    new.raw_user_meta_data->>'alias',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
