import React from "react";

export type TableStatus = "Available" | "Occupied" | "Reserved";

export interface TableProps {
  id: number | string;
  numberOfChairs: number;
  status: TableStatus;
}

export default function Table({ id, numberOfChairs, status }: TableProps) {
  return (
    <tr>
      <td>{id}</td>
      <td>{numberOfChairs}</td>
      <td>{status}</td>
    </tr>
  );
}
