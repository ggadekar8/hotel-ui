import { useState, type FormEvent } from "react";
import type { CounterData, CounterStatus } from "../Counter";
import "./AddCounter.css";

interface AddCounterProps {
  onSave: (counter: CounterData) => void;
  onClose: () => void;
}

const statuses: CounterStatus[] = ["Available", "On duty", "Off duty"];

export default function AddCounter({ onSave, onClose }: AddCounterProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<CounterStatus>("Available");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedCode = code.trim();
    if (!trimmedName || !trimmedCode) return;

    onSave({
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
      name: trimmedName,
      code: trimmedCode,
      status,
    });
  }

  return (
    <form className="counter-form" onSubmit={handleSubmit}>
      <header className="counter-form__header">
        <div>
          <p>Staff management</p>
          <h2>Add counter staff</h2>
        </div>
        <button type="button" aria-label="Close" onClick={onClose}>
          ×
        </button>
      </header>
      <label className="counter-form__field">
        Full name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>
      <label className="counter-form__field">
        Counter ID
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          required
        />
      </label>
      <label className="counter-form__field">
        Duty status
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as CounterStatus)}
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
        <button type="submit">Save counter</button>
      </footer>
    </form>
  );
}
