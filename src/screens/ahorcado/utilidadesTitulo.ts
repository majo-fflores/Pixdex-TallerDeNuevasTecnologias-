export function normalizarTitulo(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase();
}

export function esLetraAdivinable(letra: string): boolean {
  return /[a-zA-Z]/.test(letra);
}

export function calcularProgreso(nombre: string, letrasAdivinadas: string[]): string[] {
  return nombre.split('').map(letra => {
    if (letra === ' ') return ' ';
    if (!esLetraAdivinable(letra)) return letra;
    return letrasAdivinadas.includes(letra.toUpperCase()) ? letra : '_';
  });
}

export function tituloLetrasAdivinadas(nombre: string, letras: string[]): boolean {
  const letrasTitulo = nombre
    .split('')
    .filter(esLetraAdivinable)
    .map(l => l.toUpperCase());
  return letrasTitulo.length > 0 && letrasTitulo.every(l => letras.includes(l));
}

export function letraEstaEnTitulo(nombre: string, letra: string): boolean {
  const upper = letra.toUpperCase();
  return nombre.split('').some(l =>
    esLetraAdivinable(l) && l.toUpperCase() === upper
  );
}

export function titulosCoinciden(adivinado: string, correcto: string): boolean {
  return normalizarTitulo(adivinado) === normalizarTitulo(correcto);
}
