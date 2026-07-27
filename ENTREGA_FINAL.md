# Documento de Entrega Final — Pixdex

---

## Carátula

| Campo | Detalle |
|-------|---------|
| **Materia** | Taller de Nuevas Tecnologías |
| **Año de cursada** | 2025 |
| **Alumna** | Farías Flores, María José |
| **Proyecto** | Pixdex |

---

## Introducción

**Pixdex** es una aplicación mobile/web desarrollada con **Expo** y **React Native** que permite explorar un catálogo de contenido audiovisual (series, películas y anime) organizado por tipo y género.

La app incluye las siguientes funcionalidades principales:

- **Home** con listado de contenidos, filtros por tipo/género, e inicio/cierre de sesión.
- **Ficha de detalle** de cada contenido con imagen, descripción, tipo y géneros.
- **Autenticación** de usuarios con registro, login por email o alias, y sesión persistente.
- **Desafío del Ahorcado**: juego donde el jugador adivina títulos a partir de imágenes, con sistema de vidas, puntaje y ranking de mejores puntuaciones en tiempo real.
- **API local** mediante rutas `+api` de Expo Router para servir los datos del catálogo.

Los datos del catálogo se cargan al inicio de la aplicación y se mantienen en un contexto de React para ser compartidos entre pantallas. Las puntuaciones y la autenticación se gestionan con **Supabase**.

---

## Solución elegida para Auth

### Servicio utilizado

**Supabase Auth** con autenticación por email y contraseña.

### Arquitectura

```
Usuario → AuthModal (login/registro)
       → ContextoAuth
       → Supabase Auth (signIn / signUp / signOut)
       → Tabla profiles (alias del jugador)
       → AsyncStorage / localStorage (sesión persistente)
```

### Decisiones de diseño

1. **Modal en lugar de pantalla aparte:** el login y registro se realizan desde un modal en el Home, manteniendo la estética pixel/retro de la app (misma línea visual que el modal de filtros).

2. **Login por email o alias:** Supabase Auth solo acepta email para autenticarse. Para permitir login con alias, se creó la tabla `profiles` con una columna `alias` única. Al iniciar sesión:
   - Si el usuario ingresa un email → autenticación directa.
   - Si ingresa un alias → se busca el email asociado en `profiles` y luego se autentica.

3. **Registro con alias obligatorio:** al registrarse, el usuario elige un alias (nombre de jugador) además de email y contraseña. Un trigger en la base de datos (`handle_new_user`) crea automáticamente el perfil al registrarse.

4. **Sesión persistente:** se configuró el cliente Supabase con `AsyncStorage` (mobile) y `localStorage` (web) para que la sesión sobreviva al cerrar y reabrir la app. Solo se cierra con la acción manual de "Cerrar sesión".

5. **Seguridad:** las credenciales se almacenan en variables de entorno (`.env`), nunca en el código fuente. Row Level Security (RLS) protege la tabla `profiles`.

### Archivos relevantes

| Archivo | Rol |
|---------|-----|
| `src/lib/supabase.ts` | Cliente Supabase |
| `src/context/ContextoAuth.tsx` | Contexto de autenticación |
| `src/screens/home/componentesHome/AuthModal.tsx` | UI de login/registro |
| `supabase/profiles.sql` | Tabla y políticas de perfiles |

---

## Solución elegida para Real Time

### Servicio utilizado

**Supabase Realtime** (PostgreSQL Changes) sobre la tabla `puntuaciones`.

### Arquitectura

```
Jugador pierde/sale del juego
       → guardarPuntaje() → INSERT en tabla puntuaciones
       → Supabase Realtime detecta el cambio
       → suscribirTop10() recibe la notificación
       → useTopPuntuaciones recarga el top 10
       → TopPlayersList se actualiza automáticamente
```

### Decisiones de diseño

1. **Tabla `puntuaciones`:** almacena el puntaje de cada partida jugada. En el ranking se **acumulan por usuario** (`user_id`), de modo que cada jugador aparece una sola vez con la suma total de sus puntos.

2. **Top 10:** consulta ordenada por puntaje descendente, limitada a 10 registros. Si hay empate, gana el más antiguo (`created_at ASC`).

3. **Suscripción Realtime:** al montar la pantalla de mejores puntuaciones (`AhorcadoHomeScreen`), se suscribe a cambios en la tabla `puntuaciones` mediante `postgres_changes`. Cualquier INSERT, UPDATE o DELETE dispara una recarga del ranking.

4. **Solo usuarios logueados guardan puntaje:** la política RLS de INSERT exige `auth.uid() = user_id`. Las puntuaciones solo se guardan si el jugador tiene sesión activa y puntaje mayor a 0.

5. **Cuándo se guarda:** al perder todas las vidas (game over) o al tocar EXIT durante la partida. Luego redirige al ranking para ver el resultado.

### Archivos relevantes

| Archivo | Rol |
|---------|-----|
| `src/screens/ahorcado/puntuaciones/puntuaciones.ts` | CRUD y suscripción Realtime |
| `src/screens/ahorcado/puntuaciones/useTopPuntuaciones.ts` | Hook con carga + Realtime |
| `src/screens/ahorcado/puntuaciones/TopPlayersList.tsx` | UI del ranking |
| `supabase/puntuaciones.sql` | Tabla, RLS y Realtime |

---

## Link al repositorio

```
[PENDIENTE — completar con la URL del repositorio]
```

---

## Checklist de consignas del docente

| # | Consigna | Estado |
|---|----------|--------|
| 1 | Home: header, banners, listas por tipo | ✅ |
| 2 | Auth: login/logout, sesión persistente, Supabase | ✅ |
| 3 | Filtros: modal, OR/AND, reset, aplicar, conservar estado | ✅ |
| 4 | Ficha de detalle del contenido | ✅ |
| 5 | Top 10 puntuaciones con Realtime en Supabase | ✅ |
| 6 | Juego ahorcado: vidas, puntaje, adivinar título/letra, guardar puntaje, EXIT | ✅ |
| — | Datos vía API (`+api`) + contexto | ✅ |
| — | Instrucciones de puesta en marcha (README) | ✅ |
| — | Sin claves publicadas en el repo | ✅ |

### Funcionalidades extra (no pedidas, incluidas en el desarrollo)

- Banner verde "Pixel Reveal" (placeholder, sin juego implementado)
- Mensajes snackbar de acierto/error en el ahorcado
- Botón RESET en filtros

---

## Instrucciones de puesta en marcha

Ver el archivo [README.md](./README.md) del repositorio para instrucciones detalladas de instalación, configuración de Supabase y ejecución.

Resumen rápido:

```bash
git clone <URL_DEL_REPO>
cd Pixdex-TallerDeNuevasTecnologias-
npm install
cp .env.example .env
# Editar .env con credenciales de Supabase
# Ejecutar supabase/profiles.sql y supabase/puntuaciones.sql en SQL Editor
npm start
```
