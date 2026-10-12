import "./Table.css";

interface TableProps {
  table: HotelTable;
  onSelect?: (table: HotelTable) => void;
  onViewOrder?: (table: HotelTable) => void;
  onRelease?: (table: HotelTable) => void;
}
export type TableStatus = "available" | "occupied";

export interface HotelTable {
  id: string | number;
  name: string;
  status: TableStatus;
}
export function Table({ table, onSelect, onViewOrder, onRelease }: TableProps) {
  const isOccupied = table.status === "occupied";

  return (
    <article className={`active-table active-table--${table.status}`}>
      <div>
        <h3>{table.name}</h3>
        <span>{isOccupied ? "Occupied" : "Available"}</span>
      </div>
      {isOccupied ? (
        <div className="active-table__actions">
          <button type="button" onClick={() => onViewOrder?.(table)}>
            View order
          </button>
          <button type="button" onClick={() => onRelease?.(table)}>
            Release table
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => onSelect?.(table)}>
          Select table
        </button>
      )}
    </article>
  );
}
