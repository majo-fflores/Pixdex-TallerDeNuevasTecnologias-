import { supabase } from '@/src/lib/supabase';

export interface IPuntuacion {
  id: string;
  nombre_jugador: string;
  puntaje: number;
  created_at: string;
}

export async function obtenerTop10(): Promise<IPuntuacion[]> {
  const { data, error } = await supabase
    .from('puntuaciones')
    .select('id, nombre_jugador, puntaje, created_at')
    .order('puntaje', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(10);

  if (error) {
    console.error('Error al obtener top 10:', error.message);
    return [];
  }

  return data ?? [];
}

export async function guardarPuntaje(
  userId: string,
  nombreJugador: string,
  puntaje: number
): Promise<string | null> {
  if (puntaje <= 0) return null;

  const { error } = await supabase.from('puntuaciones').insert({
    user_id: userId,
    nombre_jugador: nombreJugador,
    puntaje,
  });

  if (error) return error.message;
  return null;
}

export function suscribirTop10(onUpdate: () => void) {
  const channelName = `top-puntuaciones-${Date.now()}`;

  const channel = supabase.channel(channelName);

  channel.on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'puntuaciones' },
    () => onUpdate()
  );

  channel.subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
