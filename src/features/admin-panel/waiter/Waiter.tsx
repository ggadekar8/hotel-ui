import "./Waiter.css";
import type { TableProps } from "../table/Table";

export interface WaiterData {
  name: string;
  code: string;
  assignedTables: TableProps[];
  image: string;
  status?: string;
}

interface WaiterProps {
  waiter: WaiterData;
  onUpdate?: (waiter: WaiterData) => void;
  onEdit?: (waiter: WaiterData) => void;
  onDelete?: (waiter: WaiterData) => void;
}

export default function Waiter({
  waiter,
  onUpdate,
  onEdit,
  onDelete,
}: WaiterProps) {
  const initials = waiter.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className="waiter-card">
      {waiter.image ? (
        <img
          className="waiter-card__image"
          src={waiter.image}
          alt={`${waiter.name} profile`}
        />
      ) : (
        <div className="waiter-card__avatar" aria-hidden="true">
          {initials}
        </div>
      )}
      <div className="waiter-card__details">
        <div className="waiter-card__identity">
          <h3>{waiter.name}</h3>
          <span
            className={`waiter-card__status waiter-card__status--${
              waiter.status?.toLowerCase().replaceAll(" ", "-") ?? "available"
            }`}
          >
            {waiter.status ?? "Available"}
          </span>
        </div>
        <p className="waiter-card__code">Waiter ID: {waiter.code}</p>
        <div className="waiter-card__tables">
          <span className="waiter-card__tables-label">Assigned tables</span>
          {waiter.assignedTables.length > 0 ? (
            <ul className="waiter-card__table-list">
              {waiter.assignedTables.map((table) => (
                <li key={table.id}>
                  <span>Table {table.id}</span>
                  <span className="waiter-card__chair-count">
                    {table.numberOfChairs} chairs
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="waiter-card__empty">None</span>
          )}
        </div>
      </div>
      <div className="waiter-card__actions">
        <button type="button" onClick={() => onUpdate?.(waiter)}>
          Update
        </button>
        <button type="button" onClick={() => onEdit?.(waiter)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete?.(waiter)}>
          Delete
        </button>
      </div>
    </article>
  );
}
