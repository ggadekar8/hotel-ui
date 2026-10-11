import { useState } from "react";
import "./UpdateWaiter.css";

export interface Waiter {
  id?: string | number;
  name?: string;
  number?: number | string;
  tables?: Array<string | number>;
}

interface UpdateWaiterProps {
  waiter: Waiter;
  onUpdate?: (waiter: Waiter) => void;
  onClose?: () => void;
}

export default function UpdateWaiter({
  waiter,
  onUpdate,
  onClose,
}: UpdateWaiterProps) {
  const [currentWaiter, setCurrentWaiter] = useState<Waiter>({
    ...waiter,
    tables: [...(waiter.tables ?? [])],
  });
  const [tableNumber, setTableNumber] = useState("");

  const addTable = () => {
    const value = tableNumber.trim();
    if (!value) return;
    setCurrentWaiter({
      ...currentWaiter,
      tables: [...(currentWaiter.tables ?? []), value],
    });
    setTableNumber("");
  };

  const deleteTable = (index: number) => {
    setCurrentWaiter({
      ...currentWaiter,
      tables: (currentWaiter.tables ?? []).filter((_, i) => i !== index),
    });
  };

  return (
    <form
      className="update-waiter"
      onSubmit={(event) => {
        event.preventDefault();
        onUpdate?.(currentWaiter);
      }}
    >
      <header className="update-waiter__header">
        <div>
          <p className="update-waiter__eyebrow">Staff management</p>
          <h2>
            Update waiter{currentWaiter.name ? `: ${currentWaiter.name}` : ""}
          </h2>
        </div>
        <button
          className="update-waiter__close"
          type="button"
          aria-label="Close update waiter form"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </header>

      <label className="update-waiter__field" htmlFor="waiter-number">
        Waiter number
        <input
          id="waiter-number"
          type="text"
          value={currentWaiter.number ?? ""}
          onChange={(event) =>
            setCurrentWaiter({ ...currentWaiter, number: event.target.value })
          }
        />
      </label>

      <section
        className="update-waiter__tables"
        aria-labelledby="assigned-heading"
      >
        <div className="update-waiter__section-heading">
          <div>
            <h3 id="assigned-heading">Assigned tables</h3>
            <p>Manage the tables assigned to this waiter.</p>
          </div>
          <span className="update-waiter__count">
            {currentWaiter.tables?.length ?? 0}
          </span>
        </div>
        {(currentWaiter.tables ?? []).length > 0 ? (
          <ul className="update-waiter__table-list">
            {(currentWaiter.tables ?? []).map((table, index) => (
              <li key={`${table}-${index}`}>
                <span>Table {table}</span>
                <button type="button" onClick={() => deleteTable(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="update-waiter__empty">No tables assigned yet.</p>
        )}

        <div className="update-waiter__add-table">
          <label className="update-waiter__field" htmlFor="table-number">
            Table number
            <input
              id="table-number"
              value={tableNumber}
              onChange={(event) => setTableNumber(event.target.value)}
            />
          </label>
          <button
            className="update-waiter__add-button"
            type="button"
            onClick={addTable}
            disabled={!tableNumber.trim()}
          >
            Add table
          </button>
        </div>
      </section>

      <footer className="update-waiter__footer">
        <button
          className="update-waiter__cancel"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
        <button className="update-waiter__save" type="submit">
          Save changes
        </button>
      </footer>
    </form>
  );
}
