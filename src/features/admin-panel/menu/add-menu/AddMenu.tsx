import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type CSSProperties,
} from "react";
import type { Menu } from "../../../../common/model/users/types";

type MenuItem = { id: number; name: string; price: string; image: string };

interface AddMenuProps {
  onClose: () => void;
  onCreate: (menu: Menu) => void;
}

export default function AddMenu({ onClose, onCreate }: AddMenuProps) {
  const [menuName, setMenuName] = useState("");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const chooseImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file ? URL.createObjectURL(file) : "");
  };

  const addItem = () => {
    if (!name.trim() || !price || Number(price) < 0) return;
    setItems((current) => [
      ...current,
      { id: Date.now(), name: name.trim(), price, image },
    ]);
    setName("");
    setPrice("");
    setImage("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate({
      id: Date.now(),
      menu: menuName.trim(),
      submenu: items.map((item) => ({
        id: item.id,
        submenu: item.name,
        description: "",
        price: Number(item.price),
      })),
    });
  };

  return (
    <main style={styles.page}>
      <form onSubmit={submit} style={styles.card}>
        <header style={styles.header}>
          <div>
            <h1 id="add-menu-title" style={styles.title}>
              Add new menu
            </h1>
            <p style={styles.muted}>
              Create a menu and add its food and drink items.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close add menu form"
            onClick={onClose}
            style={styles.close}
          >
            ×
          </button>
        </header>

        <section style={styles.section}>
          <h2 style={styles.heading}>Menu details</h2>
          <label htmlFor="menu-name" style={styles.label}>
            Menu name <span style={styles.required}>*</span>
          </label>
          <input
            id="menu-name"
            required
            value={menuName}
            onChange={(event) => setMenuName(event.target.value)}
            placeholder="e.g. Breakfast"
            style={styles.input}
          />
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.heading}>Sub-menu items</h2>
              <p style={styles.muted}>
                Add a name, price, and optional image for each item.
              </p>
            </div>
            <span style={styles.badge}>{items.length} items</span>
          </div>
          <div style={styles.entry}>
            <div style={styles.fields}>
              <div>
                <label htmlFor="item-name" style={styles.label}>
                  Item name <span style={styles.required}>*</span>
                </label>
                <input
                  id="item-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Pancakes"
                  style={styles.input}
                />
              </div>
              <div>
                <label htmlFor="item-price" style={styles.label}>
                  Price <span style={styles.required}>*</span>
                </label>
                <input
                  id="item-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="0.00"
                  style={styles.input}
                />
              </div>
              <div>
                <label htmlFor="item-image" style={styles.label}>
                  Image
                </label>
                <input
                  id="item-image"
                  type="file"
                  accept="image/*"
                  onChange={chooseImage}
                  style={styles.fileInput}
                />
              </div>
            </div>
            <button type="button" onClick={addItem} style={styles.addButton}>
              + Add item
            </button>
          </div>
          {items.length === 0 ? (
            <p style={styles.empty}>No items added yet.</p>
          ) : (
            <ul style={styles.list}>
              {items.map((item) => (
                <li key={item.id} style={styles.row}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={styles.thumbnail}
                    />
                  ) : (
                    <div style={styles.placeholder}>No image</div>
                  )}
                  <div style={styles.itemInfo}>
                    <strong>{item.name}</strong>
                    <span style={styles.muted}>
                      {Number(item.price).toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setItems((current) =>
                        current.filter(({ id }) => id !== item.id),
                      )
                    }
                    style={styles.remove}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer style={styles.footer}>
          <button type="submit" style={styles.submit}>
            Create menu
          </button>
        </footer>
      </form>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100%",
    padding: "32px 20px",
    background: "#f7f8fa",
    color: "#172033",
    fontFamily: "inherit",
  },
  card: {
    maxWidth: 860,
    margin: "0 auto",
    background: "#fff",
    border: "1px solid #e7eaf0",
    borderRadius: 12,
    boxShadow: "0 4px 18px rgba(20,31,55,.04)",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    padding: "25px 30px",
    borderBottom: "1px solid #edf0f4",
  },
  title: { margin: 0, fontSize: 24 },
  close: {
    width: 36,
    height: 36,
    flex: "0 0 auto",
    border: "1px solid #dce1e9",
    borderRadius: 6,
    background: "#fff",
    color: "#374151",
    fontSize: 24,
    lineHeight: 1,
    cursor: "pointer",
  },
  heading: { margin: 0, fontSize: 16 },
  muted: { margin: "6px 0 0", color: "#778195", fontSize: 13 },
  section: { padding: "24px 30px", borderBottom: "1px solid #edf0f4" },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },
  label: {
    display: "block",
    marginBottom: 7,
    fontSize: 13,
    fontWeight: 600,
    color: "#3b4558",
  },
  required: { color: "#dc4b4b" },
  input: {
    boxSizing: "border-box",
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #dce1e9",
    borderRadius: 7,
    font: "inherit",
    fontSize: 14,
  },
  badge: {
    padding: "5px 10px",
    borderRadius: 20,
    background: "#f1f3f7",
    color: "#697386",
    fontSize: 12,
    whiteSpace: "nowrap",
  },
  entry: {
    padding: 16,
    border: "1px solid #e7eaf0",
    borderRadius: 9,
    background: "#fbfcfd",
  },
  fields: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1.5fr",
    gap: 12,
    alignItems: "end",
  },
  fileInput: {
    boxSizing: "border-box",
    width: "100%",
    padding: 7,
    border: "1px solid #dce1e9",
    borderRadius: 7,
    background: "#fff",
    fontSize: 12,
  },
  addButton: {
    marginTop: 14,
    padding: "9px 13px",
    border: 0,
    borderRadius: 7,
    background: "#eef0ff",
    color: "#4355cb",
    fontWeight: 600,
    cursor: "pointer",
  },
  empty: {
    margin: "18px 0 0",
    color: "#8992a2",
    fontSize: 13,
    textAlign: "center",
  },
  list: { listStyle: "none", padding: 0, margin: "16px 0 0" },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 13,
    padding: "12px 0",
    borderBottom: "1px solid #edf0f4",
  },
  thumbnail: { width: 52, height: 52, borderRadius: 7, objectFit: "cover" },
  placeholder: {
    width: 52,
    height: 52,
    display: "grid",
    placeItems: "center",
    borderRadius: 7,
    background: "#f1f3f7",
    color: "#8992a2",
    fontSize: 10,
  },
  itemInfo: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: 5,
    fontSize: 14,
  },
  remove: {
    border: 0,
    background: "transparent",
    color: "#c34242",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
    padding: "18px 30px",
  },
  submit: {
    padding: "11px 18px",
    border: 0,
    borderRadius: 7,
    background: "#4d5fd0",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};
