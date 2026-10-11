import { useEffect, useState } from "react";
import type { Menu as MenuRecord } from "../../../common/model/users/types";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { addMenu, fetchMenus } from "../../../store/users/userThunks";
import { renameMenu } from "../../../store/users/userSlice";
import AddMenu from "./add-menu/AddMenu";
import "./Menu.css";

export default function Menu() {
  const dispatch = useAppDispatch();
  const { menus, menusLoading, menuError } = useAppSelector(
    (state) => state.users,
  );
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [isAddingMenu, setIsAddingMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const startEdit = (menu: MenuRecord) => {
    setEditing(menu.id);
    setDraft(menu.menu);
  };

  const saveEdit = (menuId: number) => {
    const newName = draft.trim();
    if (
      !newName ||
      menus.some((menu) => menu.id !== menuId && menu.menu === newName)
    )
      return;
    dispatch(renameMenu({ id: menuId, name: newName }));
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

      {menusLoading && <p role="status">Loading menus...</p>}
      {menuError && <p role="alert">{menuError}</p>}
      <div style={{ display: "grid", gap: 16 }}>
        {menus.map((category) => (
          <section
            key={category.id}
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
              {editing === category.id ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    saveEdit(category.id);
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
                <h2 style={{ fontSize: 18, margin: 0 }}>{category.menu}</h2>
              )}
              {editing !== category.id && (
                <button
                  type="button"
                  onClick={() => startEdit(category)}
                  style={secondaryButtonStyle}
                >
                  Edit name
                </button>
              )}
            </div>
            {category.submenu.length ? (
              category.submenu.map((item) => (
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
                      {item.submenu}
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
            <AddMenu
              onClose={() => setIsAddingMenu(false)}
              onCreate={async (menu) => {
                await dispatch(addMenu(menu));
                setIsAddingMenu(false);
              }}
            />
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
