import { useState, type FormEvent } from "react";
import type { TableProps, TableStatus } from "../Table";
import "./AddTable.css";

interface AddTableProps {
  onSave: (table: TableProps) => void;
  onClose: () => void;
}

const statuses: TableStatus[] = ["Available", "Occupied", "Reserved"];

export default function AddTable({ onSave, onClose }: AddTableProps) {
  const [numberOfChairs, setNumberOfChairs] = useState(2);
  const [status, setStatus] = useState<TableStatus>("Available");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({ id: `T-${Date.now()}`, numberOfChairs, status });
  }

  return (
    <form className="table-form" onSubmit={handleSubmit}>
      <header className="table-form__header">
        <div>
          <p>Floor management</p>
          <h2>Add table</h2>
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
          value={numberOfChairs}
          onChange={(event) => setNumberOfChairs(Number(event.target.value))}
          required
        />
      </label>
      <label className="table-form__field">
        Status
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as TableStatus)}
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
        <button type="submit">Save table</button>
      </footer>
    </form>
  );
}
