import "./Table.css";

export type TableStatus = "Available" | "Occupied" | "Reserved";

export interface TableProps {
  id: number | string;
  numberOfChairs: number;
  status: TableStatus;
  onEdit?: (table: TableProps) => void;
  onDelete?: (table: TableProps) => void;
}

export default function Table({
  id,
  numberOfChairs,
  status,
  onEdit,
  onDelete,
}: TableProps) {
  const table = { id, numberOfChairs, status };

  return (
    <tr className={`admin-table-row admin-table-row--${status.toLowerCase()}`}>
      <td>{id}</td>
      <td>{numberOfChairs}</td>
      <td>
        <span className="admin-table-row__status">{status}</span>
      </td>
      {(onEdit || onDelete) && (
        <td className="admin-table-row__actions">
          {onEdit && (
            <button type="button" onClick={() => onEdit(table)}>
              Edit
            </button>
          )}
          {onDelete && (
            <button type="button" onClick={() => onDelete(table)}>
              Delete
            </button>
          )}
        </td>
      )}
    </tr>
  );
}
