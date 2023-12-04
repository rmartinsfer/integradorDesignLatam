export function formatarData(data: string): string {
  const dataFormatada = new Date(data).toLocaleString("pt-BR", {
    timeZone: "UTC",
  });
  return dataFormatada;
}
export function dataSeparada(data: string): { data: string; hora: string } {
  const dataFormatada = new Date(data);
  const dataSeparada = {
    data: dataFormatada.toLocaleDateString("pt-BR"),
    hora: dataFormatada.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
  return dataSeparada;
}
