import { useState } from "react";
import AddMenu from "./add-menu/AddMenu";
import "./Menu.css";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type MenuData = Record<string, MenuItem[]>;

const initialMenu: MenuData = {
  Veg: [
    {
      id: 1,
      name: "Paneer Butter Masala",
      description: "Creamy tomato curry with paneer",
      price: 240,
    },
    {
      id: 2,
      name: "Veg Biryani",
      description: "Fragrant rice with seasonal vegetables",
      price: 190,
    },
    {
      id: 3,
      name: "Dal Tadka",
      description: "Yellow lentils tempered with spices",
      price: 160,
    },
  ],
  "Non-Veg": [
    {
      id: 4,
      name: "Butter Chicken",
      description: "Chicken in a rich tomato gravy",
      price: 290,
    },
    {
      id: 5,
      name: "Chicken Biryani",
      description: "Aromatic basmati rice and chicken",
      price: 260,
    },
    {
      id: 6,
      name: "Fish Curry",
      description: "Coastal-style curry with fresh fish",
      price: 280,
    },
  ],
  Starters: [
    {
      id: 7,
      name: "Veg Spring Rolls",
      description: "Crispy rolls with vegetable filling",
      price: 150,
    },
    {
      id: 8,
      name: "Chicken Tikka",
      description: "Char-grilled chicken with spices",
      price: 220,
    },
    {
      id: 9,
      name: "Paneer Tikka",
      description: "Grilled paneer with peppers",
      price: 190,
    },
  ],
  Beverages: [
    {
      id: 10,
      name: "Fresh Lime Soda",
      description: "Refreshing lime, sweet or salted",
      price: 70,
    },
    {
      id: 11,
      name: "Mango Lassi",
      description: "Chilled yogurt and mango drink",
      price: 100,
    },
    {
      id: 12,
      name: "Masala Chai",
      description: "Indian tea brewed with spices",
      price: 40,
    },
  ],
  Snacks: [
    {
      id: 13,
      name: "French Fries",
      description: "Golden, crispy potato fries",
      price: 110,
    },
    {
      id: 14,
      name: "Samosa",
      description: "Crispy pastry with spiced potatoes",
      price: 50,
    },
    {
      id: 15,
      name: "Club Sandwich",
      description: "Toasted sandwich with fresh fillings",
      price: 180,
    },
  ],
};

export default function Menu() {
  const [menu, setMenu] = useState<MenuData>(initialMenu);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [isAddingMenu, setIsAddingMenu] = useState(false);

  const startEdit = (name: string) => {
    setEditing(name);
    setDraft(name);
  };

  const saveEdit = (oldName: string) => {
    const newName = draft.trim();
    if (!newName || (newName !== oldName && menu[newName])) return;
    if (newName !== oldName) {
      setMenu((current) => {
        const updated: MenuData = {};
        Object.entries(current).forEach(([name, items]) => {
          updated[name === oldName ? newName : name] = items;
        });
        return updated;
      });
    }
    setEditing(null);
  };

  return (
    <section
      className="menu-management"
      style={{ maxWidth: 960, margin: "0 auto", padding: 24, color: "#1f2937" }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Menu</h1>
          <p style={{ color: "#6b7280", margin: "6px 0 0" }}>
            Manage menu categories and their items.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddingMenu(true)}
          style={buttonStyle}
        >
          + Add menu
        </button>
      </header>

      <div style={{ display: "grid", gap: 16 }}>
        {Object.entries(menu).map(([category, items]) => (
          <section
            key={category}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "14px 18px",
                background: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {editing === category ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    saveEdit(category);
                  }}
                  style={{ display: "flex", gap: 8 }}
                >
                  <input
                    autoFocus
                    aria-label="Menu name"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                  />
                  <button type="submit" style={buttonStyle}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    style={secondaryButtonStyle}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <h2 style={{ fontSize: 18, margin: 0 }}>{category}</h2>
              )}
              {editing !== category && (
                <button
                  type="button"
                  onClick={() => startEdit(category)}
                  style={secondaryButtonStyle}
                >
                  Edit name
                </button>
              )}
            </div>
            {items.length ? (
              items.map((item) => (
                <article
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    padding: "14px 18px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: 15, margin: "0 0 4px" }}>
                      {item.name}
                    </h3>
                    <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                  <strong style={{ whiteSpace: "nowrap" }}>
                    ₹{item.price}
                  </strong>
                </article>
              ))
            ) : (
              <p style={{ padding: "4px 18px", color: "#6b7280" }}>
                No items in this menu yet.
              </p>
            )}
          </section>
        ))}
      </div>
      {isAddingMenu && (
        <div
          className="menu-management__backdrop"
          onClick={() => setIsAddingMenu(false)}
        >
          <div
            className="menu-management__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-menu-title"
            onClick={(event) => event.stopPropagation()}
          >
            <AddMenu onClose={() => setIsAddingMenu(false)} />
          </div>
        </div>
      )}
    </section>
  );
}

const buttonStyle = {
  border: 0,
  borderRadius: 6,
  background: "#2563eb",
  color: "white",
  padding: "9px 14px",
  cursor: "pointer",
  fontWeight: 600,
} as const;
const secondaryButtonStyle = {
  border: "1px solid #d1d5db",
  borderRadius: 6,
  background: "white",
  color: "#374151",
  padding: "7px 10px",
  cursor: "pointer",
} as const;
