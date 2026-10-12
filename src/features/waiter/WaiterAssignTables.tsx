import { useEffect, useState } from "react";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import { fetchTables } from "../../store/table/tableThunks";

const roles = [
  { id: 1, role: "Admin" },
  { id: 2, role: "Counter" },
  { id: 3, role: "Waiter" },
  { id: 4, role: "Customer" },
];

export default function WaiterAssignTables() {
  const dispatch = useAppDispatch();
  const {
    data: tables,
    loading,
    error,
  } = useAppSelector((state) => state.tables);
  const [selectedRole, setSelectedRole] = useState("Waiter");

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <section className="waiter-assign-tables">
      <h1>Assign Tables</h1>
      <label htmlFor="table-assignment-role">Role</label>
      <select
        id="table-assignment-role"
        value={selectedRole}
        onChange={(event) => setSelectedRole(event.target.value)}
      >
        {roles.map(({ id, role }) => (
          <option key={id} value={role}>
            {role}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading tables...</p>
      ) : error ? (
        <p role="alert">{String(error)}</p>
      ) : (
        <table className="table-management__grid">
          <thead>
            <tr>
              <th scope="col">Table ID</th>
              <th scope="col">Chairs</th>
              <th scope="col">Status</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.id}>
                <td>{table.id}</td>
                <td>
                  {"chairs" in table && typeof table.chairs === "number"
                    ? table.chairs
                    : "—"}
                </td>
                <td>{table.status}</td>
                <td>{selectedRole}</td>
              </tr>
            ))}
            {tables.length === 0 && (
              <tr>
                <td colSpan={4}>No tables available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}
