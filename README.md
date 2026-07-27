# PixDex

Aplicación mobile desarrollada con **Expo** y **React Native** 

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [npm](https://www.npmjs.com/)
- Cuenta en [Supabase](https://supabase.com/) (gratuita)
- Opcional: [Expo Go](https://expo.dev/go) en el celular, o navegador web

## Instalación
1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:

```bash
cp .env.example .env
```

Editar el archivo `.env` con tus credenciales de Supabase (ver sección siguiente).


## Configuración de Supabase

### 1. Crear proyecto

1. Ingresar a [supabase.com](https://supabase.com/) e iniciar sesión.
2. Crear un nuevo proyecto (ej: `pixdex`).
3. Elegir región y generar contraseña de base de datos.

### 2. Obtener credenciales

En **Project Settings → API**:

| Variable | Dónde copiarla |
|----------|----------------|
| `EXPO_PUBLIC_SUPABASE_URL` | **Project URL** (solo la URL base, sin `/rest/v1`) |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | **anon public** key |

Pegar ambos valores en el archivo `.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### 3. Configurar autenticación

En **Authentication → Providers → Email**:

- Desactivar **Confirm email** (recomendado para desarrollo).

### 4. Ejecutar scripts SQL

En **SQL Editor**, ejecutar en este orden:

1. `supabase/profiles.sql` — tabla de perfiles y alias de usuarios
2. `supabase/puntuaciones.sql` — tabla de puntuaciones del juego

### 5. Habilitar Realtime

En **Database → Replication**, verificar que la tabla **`puntuaciones`** tenga Realtime activado.

Si el script SQL falló en la última línea, activarla manualmente desde esa pantalla.

## Ejecutar la aplicación

```bash
npm start
```

Si no funciona:

```bash
npx expo start --tunnel
```

## Estructura del proyecto

```
app/                    # Rutas (Expo Router) y APIs (+api)
components/             # Componentes reutilizables
data/                   # Datos estáticos (contenidos, géneros, tipos)
src/
  context/              # Contextos (contenidos, auth)
  lib/                  # Cliente Supabase
  navigation/           # Rutas de la app
  screens/              # Pantallas y componentes por feature
    ahorcado/
      puntuaciones/     # Lógica, hook y UI del top 10
      componentesAhorcado/
      componentesHomeAhorcado/
supabase/               # Scripts SQL para la base de datos
```