// Encabezados base de tu tabla de atributos
const DEFAULT_HEADERS = ["id", "nombre", "categoria"];

/**
 * 🔴 Conecta aquí tu tabla de atributos real
 * Retorna un arreglo de objetos
 */
function getAttributeTableRows() {
  // Prueba Excel en blanco
  return [];

  // Ejemplo con datos:
  // return [
  //   { id: 1, nombre: "Polígono A", categoria: "Bosque" },
  //   { id: 2, nombre: "Polígono B", categoria: "Pasto" }
  // ];
}

/**
 * Convierte datos a texto CSV
 */
function buildCSV(headers, rows) {
  let csv = "";

  // Encabezados
  csv += headers.join(";") + "\n";

  // Filas
  rows.forEach(row => {
    const line = headers.map(h => {
      const value = row[h] ?? "";
      // Escapar comillas
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(";");
    csv += line + "\n";
  });

  return csv;
}

/**
 * Descarga el CSV (Excel lo abre sin problema)
 */
function downloadCSV(csvContent, fileName) {
  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

document.getElementById("btnExportExcel").addEventListener("click", () => {
  const rows = getAttributeTableRows();

  // Crear CSV aunque no haya datos
  const csv = buildCSV(DEFAULT_HEADERS, rows);

  const fileName = `tabla_atributos_${Date.now()}.csv`;
  downloadCSV(csv, fileName);
});
