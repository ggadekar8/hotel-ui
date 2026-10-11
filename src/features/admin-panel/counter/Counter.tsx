import { useState } from "react";
import AddCounter from "./add-counter/AddCounter";
import UpdateCounter from "./update-counter/UpdateCounter";
import "./Counter.css";

export type CounterStatus = "Available" | "On duty" | "Off duty";

export interface CounterData {
  id: string | number;
  name: string;
  code: string;
  status: CounterStatus;
}

const initialCounters: CounterData[] = [
  { id: 1, name: "Jordan Ellis", code: "C001", status: "On duty" },
  { id: 2, name: "Taylor Reed", code: "C002", status: "Available" },
  { id: 3, name: "Casey Brooks", code: "C003", status: "Off duty" },
];

export default function Counter() {
  const [counters, setCounters] = useState(initialCounters);
  const [editingCounter, setEditingCounter] = useState<CounterData | null>(
    null,
  );
  const [isAddingCounter, setIsAddingCounter] = useState(false);

  function closeForm() {
    setIsAddingCounter(false);
    setEditingCounter(null);
  }

  return (
    <section className="counter-management" aria-labelledby="counter-heading">
      <header className="counter-management__header">
        <div>
          <p className="counter-management__eyebrow">Staff management</p>
          <h1 id="counter-heading">Counter team</h1>
          <p>Manage counter staff and their duty status.</p>
        </div>
        <button
          className="counter-management__add"
          type="button"
          onClick={() => setIsAddingCounter(true)}
        >
          <span aria-hidden="true">+</span>
          Add counter staff
        </button>
      </header>

      {counters.length > 0 ? (
        <ul className="counter-management__list">
          {counters.map((counter) => (
            <li className="counter-card" key={counter.id}>
              <div className="counter-card__avatar" aria-hidden="true">
                {counter.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="counter-card__details">
                <div className="counter-card__identity">
                  <h2>{counter.name}</h2>
                  <span
                    className={`counter-card__status counter-card__status--${counter.status
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {counter.status}
                  </span>
                </div>
                <p>Counter ID: {counter.code}</p>
              </div>
              <div className="counter-card__actions">
                <button
                  type="button"
                  onClick={() => setEditingCounter(counter)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCounters((current) =>
                      current.filter((item) => item.id !== counter.id),
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="counter-management__empty">No counter staff yet.</p>
      )}

      {(isAddingCounter || editingCounter) && (
        <div className="counter-management__backdrop" onClick={closeForm}>
          <div
            className="counter-management__dialog"
            role="dialog"
            aria-modal="true"
            aria-label={
              editingCounter ? "Edit counter staff" : "Add counter staff"
            }
            onClick={(event) => event.stopPropagation()}
          >
            {editingCounter ? (
              <UpdateCounter
                key={editingCounter.id}
                counter={editingCounter}
                onClose={closeForm}
                onSave={(updated) => {
                  setCounters((current) =>
                    current.map((item) =>
                      item.id === updated.id ? updated : item,
                    ),
                  );
                  closeForm();
                }}
              />
            ) : (
              <AddCounter
                onClose={closeForm}
                onSave={(counter) => {
                  setCounters((current) => [...current, counter]);
                  closeForm();
                }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
