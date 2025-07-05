import { tiposContenidoAudiovisual } from "@/data/tiposContenidoAudiovisual";

export function GET() {
  return Response.json(tiposContenidoAudiovisual);
} 