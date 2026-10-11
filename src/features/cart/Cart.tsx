import React, { useMemo, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

const initialItems: CartItem[] = [
  {
    id: 1,
    name: "Deluxe Room",
    price: 220,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Breakfast Package",
    price: 35,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Airport Transfer",
    price: 48,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80",
  },
];

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f6f7fb",
    padding: "32px 20px",
    fontFamily: "Arial, sans-serif",
    color: "#1f2937",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
    gap: 24,
  },
  panel: {
    background: "#ffffff",
    borderRadius: 18,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    padding: 24,
  },
  title: {
    margin: "0 0 20px",
    fontSize: 32,
    fontWeight: 700,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  item: {
    display: "grid",
    gridTemplateColumns: "100px 1fr auto",
    gap: 16,
    alignItems: "center",
    border: "1px solid #eef2f7",
    borderRadius: 14,
    padding: 12,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 12,
  },
  itemInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 700,
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    color: "#6b7280",
    flexWrap: "wrap",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  qty: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    border: "1px solid #dbe3ee",
    overflow: "hidden",
  },
  qtyButton: {
    border: "none",
    background: "#f3f4f6",
    width: 32,
    height: 32,
    fontSize: 18,
    cursor: "pointer",
    color: "#111827",
  },
  qtyValue: {
    minWidth: 32,
    textAlign: "center",
    fontWeight: 700,
    fontSize: 14,
  },
  removeButton: {
    border: "none",
    background: "transparent",
    color: "#ef4444",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    padding: 0,
  },
  price: {
    fontSize: 20,
    fontWeight: 700,
    marginLeft: 12,
  },
  summaryTitle: {
    margin: "0 0 20px",
    fontSize: 26,
    fontWeight: 700,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    color: "#4b5563",
    fontSize: 15,
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    paddingTop: 18,
    borderTop: "1px solid #e5e7eb",
    fontSize: 20,
    fontWeight: 800,
  },
  checkoutButton: {
    marginTop: 24,
    width: "100%",
    border: "none",
    borderRadius: 12,
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 700,
    padding: "14px 18px",
    cursor: "pointer",
    boxShadow: "0 8px 16px rgba(37, 99, 235, 0.25)",
  },
  empty: {
    padding: "40px 20px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: 16,
  },
};

interface CartProps {
  items?: CartItem[];
  tableName?: string;
  compact?: boolean;
}

export default function Cart({
  items: providedItems = initialItems,
  tableName,
  compact = false,
}: CartProps) {
  const [items, setItems] = useState<CartItem[]>(() =>
    providedItems.map((item) => ({ ...item })),
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const serviceFee = items.length > 0 ? 19 : 0;
  const total = subtotal + serviceFee;

  const updateQuantity = (id: number, delta: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div
      style={{
        ...styles.page,
        ...(compact
          ? {
              minHeight: 0,
              padding: 0,
              background: "transparent",
            }
          : {}),
      }}
    >
      <div
        style={{
          ...styles.container,
          ...(compact
            ? { gridTemplateColumns: "minmax(0, 1fr)", gap: 14 }
            : {}),
        }}
      >
        <section
          style={{
            ...styles.panel,
            ...(compact
              ? { padding: 0, borderRadius: 0, boxShadow: "none" }
              : {}),
          }}
        >
          <h1 style={{ ...styles.title, ...(compact ? { fontSize: 24 } : {}) }}>
            {tableName ? `Order for ${tableName}` : "Your cart"}
          </h1>

          {items.length === 0 ? (
            <div style={styles.empty}>Your cart is empty.</div>
          ) : (
            <div style={styles.list}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    ...styles.item,
                    ...(compact
                      ? {
                          gridTemplateColumns: "72px minmax(0, 1fr) auto",
                          gap: 12,
                          borderRadius: 8,
                        }
                      : {}),
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      style={{
                        ...styles.image,
                        ...(compact
                          ? { width: 72, height: 72, borderRadius: 8 }
                          : {}),
                      }}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      style={{
                        ...styles.image,
                        ...(compact
                          ? { width: 72, height: 72, borderRadius: 8 }
                          : {}),
                        background: "linear-gradient(135deg, #dcebe3, #f0e8d9)",
                      }}
                    />
                  )}

                  <div style={styles.itemInfo}>
                    <div style={styles.itemName}>{item.name}</div>
                    <div style={styles.meta}>
                      <span>${item.price} each</span>
                    </div>

                    <div style={styles.actions}>
                      <div style={styles.qty}>
                        <button
                          type="button"
                          style={styles.qtyButton}
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span style={styles.qtyValue}>{item.quantity}</span>
                        <button
                          type="button"
                          style={styles.qtyButton}
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        style={styles.removeButton}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      ...styles.price,
                      ...(compact ? { fontSize: 16, marginLeft: 0 } : {}),
                    }}
                  >
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside
          style={{
            ...styles.panel,
            ...(compact
              ? {
                  padding: 18,
                  borderRadius: 8,
                  boxShadow: "none",
                  background: "#f5f8f6",
                }
              : {}),
          }}
        >
          <h2
            style={{
              ...styles.summaryTitle,
              ...(compact ? { fontSize: 20, marginBottom: 10 } : {}),
            }}
          >
            Order summary
          </h2>

          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <strong>${subtotal}</strong>
          </div>
          <div style={styles.summaryRow}>
            <span>Service fee</span>
            <strong>${serviceFee}</strong>
          </div>
          <div style={styles.summaryRow}>
            <span>Discount</span>
            <strong>-$0</strong>
          </div>

          <div style={styles.total}>
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button type="button" style={styles.checkoutButton}>
            Proceed to checkout
          </button>
        </aside>
      </div>
    </div>
  );
}
