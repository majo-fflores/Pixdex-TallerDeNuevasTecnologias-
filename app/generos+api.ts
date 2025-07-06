import { generosContenidoAudiovisual } from "@/data/generosContenidoAudiovisual";
 
export function GET() {
  return Response.json(generosContenidoAudiovisual);
} 