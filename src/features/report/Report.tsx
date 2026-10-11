import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

export type ReportOrder = {
  id: number | string;
  orderId: string;
  cartId: string;
  totalAmount: number;
  customer: string;
  orderDate: string;
  status: string;
  receiver: string;
};

type ReportProps = { orders?: ReportOrder[] };

export default function Report({ orders = [] }: ReportProps) {
  const [status, setStatus] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const statuses = useMemo(
    () => [...new Set(orders.map((order) => order.status).filter(Boolean))],
    [orders],
  );

  const visibleOrders = useMemo(
    () =>
      orders.filter((order) => {
        const date = order.orderDate?.slice(0, 10) ?? "";
        return (
          (status === "all" || order.status === status) &&
          (!fromDate || date >= fromDate) &&
          (!toDate || date <= toDate)
        );
      }),
    [orders, status, fromDate, toDate],
  );

  const clearFilters = () => {
    setStatus("all");
    setFromDate("");
    setToDate("");
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.heading}>Order report</h1>
          <p style={styles.description}>
            View and filter orders by status and date.
          </p>
        </div>
        <span style={styles.count}>{visibleOrders.length} orders</span>
      </header>

      <section aria-label="Order filters" style={styles.filters}>
        <label style={styles.field}>
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            style={styles.control}
          >
            <option value="all">All statuses</option>
            {statuses.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label style={styles.field}>
          From date
          <input
            type="date"
            value={fromDate}
            max={toDate || undefined}
            onChange={(event) => setFromDate(event.target.value)}
            style={styles.control}
          />
        </label>
        <label style={styles.field}>
          To date
          <input
            type="date"
            value={toDate}
            min={fromDate || undefined}
            onChange={(event) => setToDate(event.target.value)}
            style={styles.control}
          />
        </label>
        <button type="button" onClick={clearFilters} style={styles.clear}>
          Clear filters
        </button>
      </section>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {[
                "ID",
                "Order ID",
                "Cart ID",
                "Total amount",
                "Customer",
                "Order date",
                "Status",
                "Receiver",
              ].map((label) => (
                <th key={label} scope="col" style={styles.th}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((order) => (
              <tr key={order.id}>
                <td style={styles.td}>{order.id}</td>
                <td style={styles.td}>{order.orderId}</td>
                <td style={styles.td}>{order.cartId}</td>
                <td style={styles.td}>
                  {Number(order.totalAmount).toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td style={styles.td}>{order.customer}</td>
                <td style={styles.td}>
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleDateString()
                    : "—"}
                </td>
                <td style={styles.td}>
                  <span style={styles.badge}>{order.status}</span>
                </td>
                <td style={styles.td}>{order.receiver}</td>
              </tr>
            ))}
            {visibleOrders.length === 0 && (
              <tr>
                <td colSpan={8} style={styles.empty}>
                  No orders match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: { padding: 24, color: "#1f2937", fontFamily: "inherit" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  heading: { margin: 0, fontSize: 24 },
  description: { margin: "6px 0 0", color: "#6b7280", fontSize: 14 },
  count: { color: "#6b7280", fontSize: 14, whiteSpace: "nowrap" },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "end",
    gap: 14,
    padding: 16,
    marginBottom: 18,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
  },
  field: {
    display: "grid",
    gap: 6,
    minWidth: 160,
    color: "#4b5563",
    fontSize: 13,
    fontWeight: 600,
  },
  control: {
    boxSizing: "border-box",
    minHeight: 38,
    padding: "7px 10px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    background: "#fff",
    color: "#1f2937",
    font: "inherit",
  },
  clear: {
    minHeight: 38,
    padding: "7px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    background: "#fff",
    color: "#374151",
    cursor: "pointer",
  },
  tableContainer: {
    overflowX: "auto",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: 14,
  },
  th: {
    padding: "12px 14px",
    background: "#f9fafb",
    color: "#4b5563",
    fontWeight: 600,
    whiteSpace: "nowrap",
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    padding: "12px 14px",
    borderBottom: "1px solid #f1f2f4",
    whiteSpace: "nowrap",
  },
  badge: {
    display: "inline-block",
    padding: "3px 9px",
    borderRadius: 999,
    background: "#eef2ff",
    color: "#4338ca",
    fontSize: 12,
  },
  empty: { padding: 28, textAlign: "center", color: "#6b7280" },
};
