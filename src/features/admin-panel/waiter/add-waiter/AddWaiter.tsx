import { useState } from "react";
import type { FormEvent } from "react";
import "./AddWaiter.css";

export interface AddedWaiter {
  id: string;
  name: string;
  tables: string[];
}

interface AddWaiterProps {
  onAdd?: (waiter: AddedWaiter) => void;
  onClose?: () => void;
}

const STORAGE_KEY = "hotel-waiters";

function createId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function AddWaiter({ onAdd, onClose }: AddWaiterProps) {
  const [name, setName] = useState("");
  const [tablesInput, setTablesInput] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const waiterName = name.trim();
    if (!waiterName) {
      setMessage("Enter a waiter name.");
      return;
    }

    const tables = [
      ...new Set(
        tablesInput
          .split(",")
          .map((table) => table.trim())
          .filter(Boolean),
      ),
    ];
    const waiter: AddedWaiter = { id: createId(), name: waiterName, tables };

    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]",
      );
      const waiters = Array.isArray(saved) ? saved : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...waiters, waiter]));
      onAdd?.(waiter);
      setName("");
      setTablesInput("");
      setMessage("Waiter saved.");
      onClose?.();
    } catch {
      setMessage("Unable to save waiter.");
    }
  }

  return (
    <form className="add-waiter" onSubmit={handleSubmit}>
      <header className="add-waiter__header">
        <div>
          <p className="add-waiter__eyebrow">Staff management</p>
          <h2>Add waiter</h2>
        </div>
        <button
          className="add-waiter__close"
          type="button"
          aria-label="Close add waiter form"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <label className="add-waiter__field">
        Waiter name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>
      <label className="add-waiter__field">
        Assigned tables (comma-separated)
        <input
          value={tablesInput}
          onChange={(event) => setTablesInput(event.target.value)}
          placeholder="1, 2, 3"
        />
      </label>
      {message && (
        <p className="add-waiter__message" role="status">
          {message}
        </p>
      )}
      <footer className="add-waiter__footer">
        <button className="add-waiter__cancel" type="button" onClick={onClose}>
          Close
        </button>
        <button className="add-waiter__save" type="submit">
          Save waiter
        </button>
      </footer>
    </form>
  );
}
