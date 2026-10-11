import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { fetchCounters } from "../../../store/counter/counterThunk";
import {
  addCounterToState,
  removeCounter,
  updateCounter as updateCounterInState,
} from "../../../store/counter/counterSlice";
import AddCounter from "./add-counter/AddCounter";
import UpdateCounter from "./update-counter/UpdateCounter";
import "./Counter.css";

export type CounterStatus = "Available" | "On duty" | "Off duty";

export interface CounterData {
  id: string | number;
  name: string;
  code: string;
  status: string;
}

export default function Counter() {
  const dispatch = useAppDispatch();
  const { counters, isLoading, error } = useAppSelector(
    (state) => state.counter,
  );
  const [editingCounter, setEditingCounter] = useState<CounterData | null>(
    null,
  );
  const [isAddingCounter, setIsAddingCounter] = useState(false);

  useEffect(() => {
    dispatch(fetchCounters());
  }, [dispatch]);

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

      {isLoading && counters.length === 0 && (
        <p role="status">Loading counters...</p>
      )}
      {error && <p role="alert">{error}</p>}
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
                  onClick={() =>
                    setEditingCounter({
                      ...counter,
                      status: counter.status as CounterStatus,
                    })
                  }
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(removeCounter(counter.id))}
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
                  dispatch(updateCounterInState(updated));
                  closeForm();
                }}
              />
            ) : (
              <AddCounter
                onClose={closeForm}
                onSave={(counter) => {
                  dispatch(addCounterToState(counter));
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
