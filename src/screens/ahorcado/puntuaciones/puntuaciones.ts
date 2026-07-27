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
    .select('user_id, nombre_jugador, puntaje, created_at');

  if (error) {
    console.error('Error al obtener top 10:', error.message);
    return [];
  }

  if (!data) return [];

  const acumuladoPorUsuario = new Map<string, IPuntuacion>();

  for (const fila of data) {
    const existente = acumuladoPorUsuario.get(fila.user_id);
    if (existente) {
      existente.puntaje += fila.puntaje;
    } else {
      acumuladoPorUsuario.set(fila.user_id, {
        id: fila.user_id,
        nombre_jugador: fila.nombre_jugador,
        puntaje: fila.puntaje,
        created_at: fila.created_at,
      });
    }
  }

  return Array.from(acumuladoPorUsuario.values())
    .sort((a, b) => b.puntaje - a.puntaje)
    .slice(0, 10);
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
