import { useState, type FormEvent } from "react";
import type { TableProps, TableStatus } from "../Table";
import "./UpdateTable.css";

interface UpdateTableProps {
  table: TableProps;
  onSave: (table: TableProps) => void;
  onClose: () => void;
}

const statuses: TableStatus[] = ["Available", "Occupied", "Reserved"];

export default function UpdateTable({
  table,
  onSave,
  onClose,
}: UpdateTableProps) {
  const [draft, setDraft] = useState(table);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(draft);
  }

  return (
    <form className="table-form" onSubmit={handleSubmit}>
      <header className="table-form__header">
        <div>
          <p>Floor management</p>
          <h2>Edit table {table.id}</h2>
        </div>
        <button type="button" aria-label="Close" onClick={onClose}>
          ×
        </button>
      </header>
      <label className="table-form__field">
        Number of chairs
        <input
          type="number"
          min={1}
          max={30}
          value={draft.numberOfChairs}
          onChange={(event) =>
            setDraft({ ...draft, numberOfChairs: Number(event.target.value) })
          }
          required
        />
      </label>
      <label className="table-form__field">
        Status
        <select
          value={draft.status}
          onChange={(event) =>
            setDraft({ ...draft, status: event.target.value as TableStatus })
          }
        >
          {statuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <footer className="table-form__footer">
        <button type="button" onClick={onClose}>
          Close
        </button>
        <button type="submit">Save changes</button>
      </footer>
    </form>
  );
}
