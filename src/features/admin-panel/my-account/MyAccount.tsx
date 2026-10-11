import { useEffect, useState } from "react";
import type { TableProps } from "../table/Table";
import type { IWaiter } from "../../../common/model/users/types";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { fetchWaiters } from "../../../store/waiter/waiterThunks";
import {
  addWaiter as addWaiterToState,
  removeWaiter,
  updateWaiter as updateWaiterInState,
} from "../../../store/waiter/waiterSlice";
import Counter from "../counter/Counter";
import Menu from "../menu/Menu";
import TableManagement from "../table/table-management/TableManagement";
import Waiter from "../waiter/Waiter";
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
export default function MyAccount() {
  const dispatch = useAppDispatch();
  const { waiters, isLoading, error } = useAppSelector((state) => state.waiter);
  const [activeTab, setActiveTab] = useState<Tab>("Waiter");
  const [editingWaiter, setEditingWaiter] = useState<IWaiter | null>(null);
  const [isAddingWaiter, setIsAddingWaiter] = useState(false);

  useEffect(() => {
    dispatch(fetchWaiters());
  }, [dispatch]);

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
            {isLoading && <p role="status">Loading waiters...</p>}
            {error && <p role="alert">{error}</p>}
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {waiters.map((waiter) => (
                <li
                  key={waiter.id}
                  style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}
                >
                  <Waiter
                    waiter={{
                      ...waiter,
                      assignedTables: waiter.assignedTables.map((table) => ({
                        ...table,
                        status: table.status as TableProps["status"],
                      })),
                    }}
                    onEdit={() => setEditingWaiter(waiter)}
                    onDelete={() => dispatch(removeWaiter(String(waiter.id)))}
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
                dispatch(
                  addWaiterToState({
                    id: addedWaiter.id,
                    code: `W${String(waiters.length + 1).padStart(3, "0")}`,
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
                  }),
                );
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
                dispatch(
                  updateWaiterInState({
                    ...editingWaiter,
                    code: String(updated.number ?? editingWaiter.code),
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
                  }),
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
