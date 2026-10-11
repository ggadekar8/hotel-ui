import { useEffect, useState } from "react";
import Table, { type TableProps, type TableStatus } from "../Table";
import AddTable from "../add-table/AddTable";
import UpdateTable from "../update-table/UpdateTable";
import { useAppDispatch } from "../../../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../../../shared/hooks/useAppSelector";
import { addTable, fetchTables } from "../../../../store/table/tableThunks";
import { removeTable, updateTable } from "../../../../store/table/tableSlice";

export default function TableManagement() {
  const dispatch = useAppDispatch();
  const {
    data: tables,
    loading,
    error,
  } = useAppSelector((state) => state.tables);
  const [editingTable, setEditingTable] = useState<TableProps | null>(null);
  const [isAddingTable, setIsAddingTable] = useState(false);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

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

      {loading ? (
        <p className="table-management__empty">Loading tables...</p>
      ) : error ? (
        <p className="table-management__empty" role="alert">
          {error}
        </p>
      ) : tables.length ? (
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
                  status={table.status as TableStatus}
                  onEdit={setEditingTable}
                  onDelete={(selected) => dispatch(removeTable(selected.id))}
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
                  dispatch(updateTable(updated));
                  setEditingTable(null);
                }}
              />
            ) : (
              <AddTable
                onClose={() => setIsAddingTable(false)}
                onSave={(table) => {
                  dispatch(addTable(table));
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
