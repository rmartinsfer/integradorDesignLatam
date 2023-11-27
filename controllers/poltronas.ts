type Seat = {
  row: number;
  column: string;
  isAisle: boolean;
};
Handlebars.registerHelper("geraAssento", function (context, options) {
  return generateSeats(totalRows, columns);
});
function generateSeats(rows: number, columns: string[]): Seat[] {
  let seats: Seat[] = [];

  for (let i = 1; i <= rows; i++) {
    columns.forEach((column, index) => {
      // Considera-se corredor se estiver após a terceira cadeira (índice 2)
      const isAisle = index === 2;
      seats.push({
        row: i,
        column: column,
        isAisle: isAisle,
      });
      // Se for corredor, adiciona um espaço adicional para representá-lo
      if (isAisle) {
        seats.push({
          row: i,
          column: "Aisle",
          isAisle: true,
        });
      }
    });
  }

  return seats;
}

// Configuração típica de colunas de assentos de um Airbus 321 em classe econômica
const columns = ["A", "B", "C", "D"];
const totalRows = 25;

const airplaneSeats = generateSeats(totalRows, columns);

console.log(airplaneSeats);
