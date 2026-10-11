import { useState, type FormEvent } from "react";
import type { CounterData, CounterStatus } from "../Counter";
import "./UpdateCounter.css";

interface UpdateCounterProps {
  counter: CounterData;
  onSave: (counter: CounterData) => void;
  onClose: () => void;
}

const statuses: CounterStatus[] = ["Available", "On duty", "Off duty"];

export default function UpdateCounter({
  counter,
  onSave,
  onClose,
}: UpdateCounterProps) {
  const [draft, setDraft] = useState(counter);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({ ...draft, name: draft.name.trim(), code: draft.code.trim() });
  }

  return (
    <form className="counter-form" onSubmit={handleSubmit}>
      <header className="counter-form__header">
        <div>
          <p>Staff management</p>
          <h2>Edit counter staff</h2>
        </div>
        <button type="button" aria-label="Close" onClick={onClose}>
          ×
        </button>
      </header>
      <label className="counter-form__field">
        Full name
        <input
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
          required
        />
      </label>
      <label className="counter-form__field">
        Counter ID
        <input
          value={draft.code}
          onChange={(event) => setDraft({ ...draft, code: event.target.value })}
          required
        />
      </label>
      <label className="counter-form__field">
        Duty status
        <select
          value={draft.status}
          onChange={(event) =>
            setDraft({ ...draft, status: event.target.value as CounterStatus })
          }
        >
          {statuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <footer className="counter-form__footer">
        <button type="button" onClick={onClose}>
          Close
        </button>
        <button type="submit">Save changes</button>
      </footer>
    </form>
  );
}
