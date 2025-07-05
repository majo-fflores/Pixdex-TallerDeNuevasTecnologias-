import { contenidosAudiovisuales } from "@/data/contenidosAudiovisuales";

export function GET() {
  return Response.json(contenidosAudiovisuales);
} 