export function formatarData(data: string): string {
  const dataFormatada = new Date(data).toLocaleString("pt-BR", {
    timeZone: "UTC",
  });
  return dataFormatada;
}
