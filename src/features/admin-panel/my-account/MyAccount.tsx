import { useState } from "react";
import type { TableProps } from "../table/Table";
import Counter from "../counter/Counter";
import Menu from "../menu/Menu";
import TableManagement from "../table/table-management/TableManagement";
import Waiter, { type WaiterData } from "../waiter/Waiter";
import AddWaiter from "../waiter/add-waiter/AddWaiter";
import UpdateWaiter from "../waiter/update-waiter/UpdateWaiter";

type Tab = "Waiter" | "Counter" | "Table" | "Menu";

const tabs: Tab[] = ["Waiter", "Counter", "Table", "Menu"];
const dummyTables: TableProps[] = [
  { id: 1, numberOfChairs: 2, status: "Available" },
  { id: 2, numberOfChairs: 4, status: "Occupied" },
  { id: 3, numberOfChairs: 6, status: "Reserved" },
  { id: 4, numberOfChairs: 4, status: "Available" },
];
interface AccountWaiter extends WaiterData {
  id: number | string;
}

const dummyWaiters: AccountWaiter[] = [
  {
    id: 1,
    code: "W001",
    name: "Alex Morgan",
    status: "Available",
    assignedTables: dummyTables,
    image: "",
  },
  {
    id: 2,
    code: "W002",
    name: "Jamie Lee",
    status: "On duty",
    assignedTables: dummyTables,
    image: "",
  },
  {
    id: 3,
    code: "W003",
    name: "Sam Taylor",
    status: "Available",
    assignedTables: [],
    image: "",
  },
];

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState<Tab>("Waiter");
  const [waiters, setWaiters] = useState<AccountWaiter[]>(dummyWaiters);
  const [editingWaiter, setEditingWaiter] = useState<AccountWaiter | null>(
    null,
  );
  const [isAddingWaiter, setIsAddingWaiter] = useState(false);

  return (
    <div style={{ display: "flex", gap: 24, minHeight: 320 }}>
      <nav
        aria-label="My account sections"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          minWidth: 150,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
            style={{
              padding: "12px 16px",
              textAlign: "left",
              border: "1px solid #ddd",
              borderRadius: 6,
              background: activeTab === tab ? "#e8f0fe" : "#fff",
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main style={{ flex: 1 }}>
        {activeTab === "Waiter" ? (
          <section aria-labelledby="waiter-heading">
            <button
              type="button"
              className="my-account__add-waiter"
              onClick={() => setIsAddingWaiter(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                minHeight: 42,
                marginTop: 16,
                padding: "0 16px",
                border: "1px solid #176548",
                borderRadius: 6,
                background: "#176548",
                color: "#fff",
                font: "inherit",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <span aria-hidden="true" style={{ fontSize: 19, lineHeight: 1 }}>
                +
              </span>
              Add waiter
            </button>
            <h2 id="waiter-heading">Waiter list</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {waiters.map((waiter) => (
                <li
                  key={waiter.id}
                  style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}
                >
                  <Waiter
                    waiter={waiter}
                    onEdit={(selected) => {
                      const accountWaiter = waiters.find(
                        (candidate) => candidate.code === selected.code,
                      );
                      if (accountWaiter) setEditingWaiter(accountWaiter);
                    }}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : activeTab === "Counter" ? (
          <Counter />
        ) : activeTab === "Table" ? (
          <TableManagement />
        ) : activeTab === "Menu" ? (
          <Menu />
        ) : (
          <section aria-labelledby="tab-heading">
            <h2 id="tab-heading">{activeTab}</h2>
          </section>
        )}
      </main>
      {isAddingWaiter && (
        <div
          className="update-waiter-backdrop"
          onClick={() => setIsAddingWaiter(false)}
        >
          <div
            className="update-waiter-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Add waiter"
            onClick={(event) => event.stopPropagation()}
          >
            <AddWaiter
              onClose={() => setIsAddingWaiter(false)}
              onAdd={(addedWaiter) => {
                setWaiters((currentWaiters) => [
                  ...currentWaiters,
                  {
                    id: addedWaiter.id,
                    code: `W${String(currentWaiters.length + 1).padStart(3, "0")}`,
                    name: addedWaiter.name,
                    status: "Available",
                    image: "",
                    assignedTables: addedWaiter.tables.map(
                      (tableId) =>
                        dummyTables.find(
                          (table) => String(table.id) === tableId,
                        ) ?? {
                          id: tableId,
                          numberOfChairs: 0,
                          status: "Available",
                        },
                    ),
                  },
                ]);
              }}
            />
          </div>
        </div>
      )}
      {editingWaiter && (
        <div
          className="update-waiter-backdrop"
          onClick={() => setEditingWaiter(null)}
        >
          <div
            className="update-waiter-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Update ${editingWaiter.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            <UpdateWaiter
              key={editingWaiter.id}
              waiter={{
                id: editingWaiter.id,
                name: editingWaiter.name,
                number: editingWaiter.code,
                tables: editingWaiter.assignedTables.map((table) => table.id),
              }}
              onClose={() => setEditingWaiter(null)}
              onUpdate={(updated) => {
                setWaiters((currentWaiters) =>
                  currentWaiters.map((waiter) =>
                    waiter.id === editingWaiter.id
                      ? {
                          ...waiter,
                          code: String(updated.number ?? waiter.code),
                          assignedTables: (updated.tables ?? []).map(
                            (tableId) =>
                              dummyTables.find(
                                (table) => String(table.id) === String(tableId),
                              ) ?? {
                                id: tableId,
                                numberOfChairs: 0,
                                status: "Available",
                              },
                          ),
                        }
                      : waiter,
                  ),
                );
                setEditingWaiter(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
