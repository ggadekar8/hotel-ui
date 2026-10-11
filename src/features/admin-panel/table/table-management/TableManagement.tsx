import { useState } from "react";
import Table, { type TableProps } from "../Table";
import AddTable from "../add-table/AddTable";
import UpdateTable from "../update-table/UpdateTable";

const initialTables: TableProps[] = [
  { id: 1, numberOfChairs: 2, status: "Available" },
  { id: 2, numberOfChairs: 4, status: "Occupied" },
  { id: 3, numberOfChairs: 6, status: "Reserved" },
  { id: 4, numberOfChairs: 4, status: "Available" },
];

export default function TableManagement() {
  const [tables, setTables] = useState(initialTables);
  const [editingTable, setEditingTable] = useState<TableProps | null>(null);
  const [isAddingTable, setIsAddingTable] = useState(false);

  return (
    <section
      className="table-management"
      aria-labelledby="table-management-heading"
    >
      <header className="table-management__header">
        <div>
          <p className="table-management__eyebrow">Floor management</p>
          <h1 id="table-management-heading">Dining tables</h1>
          <p>Manage seating capacity and table availability.</p>
        </div>
        <button
          className="table-management__add"
          type="button"
          onClick={() => setIsAddingTable(true)}
        >
          + Add table
        </button>
      </header>

      {tables.length ? (
        <div className="table-management__scroll">
          <table className="table-management__grid">
            <thead>
              <tr>
                <th scope="col">Table ID</th>
                <th scope="col">Chairs</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <Table
                  key={table.id}
                  {...table}
                  onEdit={setEditingTable}
                  onDelete={(selected) =>
                    setTables((current) =>
                      current.filter((item) => item.id !== selected.id),
                    )
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="table-management__empty">No tables have been added.</p>
      )}

      {(isAddingTable || editingTable) && (
        <div
          className="table-management__modal-backdrop"
          onClick={() => {
            setIsAddingTable(false);
            setEditingTable(null);
          }}
        >
          <div
            className="table-management__modal"
            role="dialog"
            aria-modal="true"
            aria-label={editingTable ? "Edit table" : "Add table"}
            onClick={(event) => event.stopPropagation()}
          >
            {editingTable ? (
              <UpdateTable
                key={editingTable.id}
                table={editingTable}
                onClose={() => setEditingTable(null)}
                onSave={(updated) => {
                  setTables((current) =>
                    current.map((item) =>
                      item.id === updated.id ? updated : item,
                    ),
                  );
                  setEditingTable(null);
                }}
              />
            ) : (
              <AddTable
                onClose={() => setIsAddingTable(false)}
                onSave={(table) => {
                  setTables((current) => [...current, table]);
                  setIsAddingTable(false);
                }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
