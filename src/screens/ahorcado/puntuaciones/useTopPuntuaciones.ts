import { useEffect, useState } from 'react';
import { IPuntuacion, obtenerTop10, suscribirTop10 } from './puntuaciones';

export function useTopPuntuaciones() {
  const [puntuaciones, setPuntuaciones] = useState<IPuntuacion[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      const data = await obtenerTop10();
      if (activo) {
        setPuntuaciones(data);
        setCargando(false);
      }
    };

    cargar();
    const cancelar = suscribirTop10(cargar);

    return () => {
      activo = false;
      cancelar();
    };
  }, []);

  return { puntuaciones, cargando };
}
