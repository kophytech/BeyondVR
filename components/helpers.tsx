import { format } from "date-fns";
import { saveAs } from "file-saver";


export function formatDate(dateString: string): string {
  const dateTime = new Date(dateString);
  const formattedDate = format(dateTime, "dd/MM/yyyy HH:mm");
  return formattedDate;
}

export function formatOnlyDate(dateString: string): string {
  const dateTime = new Date(dateString);
  const formattedDate = format(dateTime, "dd/MM/yyyy");
  return formattedDate;
}

export function getCookieValue(name: string) {
  const cookies = document.cookie.split(";");
  // Cookie not found
  return cookies[4].split("=")[1];
}


export const handleExport = (tableData: any) => {
  // Convert tableData to CSV format
  const csvData = tableData.map((row: any) => row.join(",")).join("\n");

  // Create a Blob object with the CSV data
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

  // Save the Blob as a file using FileSaver.js
  saveAs(blob, "table.csv");
};
