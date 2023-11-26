export function formatarData(data: string): string {
  const dataFormatada = new Date(data).toLocaleString("pt-BR", {
    timeZone: "UTC",
  }); // Ajuste o 'pt-BR' para o formato desejado
  return dataFormatada;
}
