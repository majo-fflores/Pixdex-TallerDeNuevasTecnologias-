import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/src/lib/supabase';

interface AuthContextoDato {
  session: Session | null;
  user: User | null;
  alias: string | null;
  cargando: boolean;
  iniciarSesion: (identificador: string, password: string) => Promise<string | null>;
  registrarse: (alias: string, email: string, password: string) => Promise<string | null>;
  cerrarSesion: () => Promise<void>;
}

const AuthContext = createContext<AuthContextoDato | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

async function obtenerEmailPorAlias(alias: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('email')
    .ilike('alias', alias.trim())
    .maybeSingle();

  if (error || !data) return null;
  return data.email;
}

async function obtenerAlias(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('alias')
    .eq('id', userId)
    .maybeSingle();

  if (error || !data) return null;
  return data.alias;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [alias, setAlias] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        obtenerAlias(currentSession.user.id).then(setAlias);
      }
      setCargando(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        obtenerAlias(newSession.user.id).then(setAlias);
      } else {
        setAlias(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const iniciarSesion = async (identificador: string, password: string): Promise<string | null> => {
    const trimmed = identificador.trim();
    if (!trimmed || !password) return 'Completá todos los campos.';

    let email = trimmed;
    if (!trimmed.includes('@')) {
      const emailEncontrado = await obtenerEmailPorAlias(trimmed);
      if (!emailEncontrado) return 'No se encontró un usuario con ese alias.';
      email = emailEncontrado;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return 'Email/alias o contraseña incorrectos.';
    return null;
  };

  const registrarse = async (aliasInput: string, email: string, password: string): Promise<string | null> => {
    const aliasNormalizado = aliasInput.trim();
    const emailNormalizado = email.trim();

    if (!aliasNormalizado || !emailNormalizado || !password) {
      return 'Completá todos los campos.';
    }
    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }

    const { data: aliasExistente } = await supabase
      .from('profiles')
      .select('id')
      .ilike('alias', aliasNormalizado)
      .maybeSingle();

    if (aliasExistente) return 'Ese alias ya está en uso.';

    const { error } = await supabase.auth.signUp({
      email: emailNormalizado,
      password,
      options: { data: { alias: aliasNormalizado } },
    });

    if (error) return error.message;

    return null;
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setAlias(null);
  };

  const contextValue: AuthContextoDato = {
    session,
    user,
    alias,
    cargando,
    iniciarSesion,
    registrarse,
    cerrarSesion,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextoDato {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
