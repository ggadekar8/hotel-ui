import { useMemo, useState } from "react";
import { useEffect } from "react";

import { fetchMenus, fetchUsers } from "../../store/users/userThunks";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";

import { useAppSelector } from "../../shared/hooks/useAppSelector";
import type { SubMenu } from "../../common/model/users/types";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
};
type CartItem = MenuItem & { quantity: number };

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f7f8f5",
    color: "#202820",
    padding: "40px max(24px, calc((100vw - 1180px) / 2))",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36,
  },
  eyebrow: {
    color: "#71816f",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1.5,
    margin: "0 0 8px",
  },
  title: { fontSize: 36, margin: 0, letterSpacing: -1.2 },
  subtitle: { color: "#788078", margin: "8px 0 0" },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 340px",
    gap: 28,
    alignItems: "start",
  },
  tabs: { display: "flex", gap: 9, overflowX: "auto", paddingBottom: 26 },
  tab: {
    flexShrink: 0,
    border: "1px solid #e4e8e0",
    borderRadius: 22,
    padding: "10px 18px",
    background: "#fff",
    color: "#596259",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  activeTab: {
    background: "#315d3e",
    border: "1px solid #315d3e",
    color: "#fff",
  },
  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    marginBottom: 16,
  },
  heading: { fontSize: 25, margin: 0 },
  count: { color: "#899189", fontSize: 13 },
  items: { display: "grid", gap: 12 },
  itemCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: 18,
    background: "#fff",
    border: "1px solid #e9ece6",
    borderRadius: 16,
  },
  foodIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: "grid",
    placeItems: "center",
    background: "#f2f5ed",
    fontSize: 24,
    flexShrink: 0,
  },
  itemInfo: { flex: 1, minWidth: 0 },
  itemName: { fontSize: 16, margin: "0 0 5px" },
  description: { color: "#899189", fontSize: 13, margin: "0 0 9px" },
  price: { color: "#315d3e", fontSize: 14 },
  addButton: {
    border: "1px solid #dce6dd",
    background: "#f8fbf7",
    color: "#315d3e",
    borderRadius: 10,
    padding: "9px 13px",
    fontWeight: 700,
    cursor: "pointer",
  },
  cartPanel: {
    background: "#fff",
    border: "1px solid #e9ece6",
    borderRadius: 18,
    padding: 22,
    position: "sticky",
    top: 20,
  },
  cartHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 18,
    borderBottom: "1px solid #eef0ec",
  },
  cartTitle: { fontSize: 22, margin: 0 },
  emptyCart: {
    minHeight: 210,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#485248",
  },
  cartItems: { paddingTop: 8 },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    padding: "13px 0",
    borderBottom: "1px solid #f0f1ee",
  },
  cartItemInfo: { display: "grid", gap: 5, fontSize: 13 },
  quantity: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13,
    fontWeight: 700,
  },
  quantityButton: {
    width: 26,
    height: 26,
    border: "1px solid #e5e9e3",
    borderRadius: 8,
    background: "#fff",
    cursor: "pointer",
    color: "#315d3e",
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    padding: "18px 0",
    fontSize: 16,
  },
  usersSection: { marginTop: 42 },
  usersHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  usersList: { margin: 0, padding: 0, listStyle: "none" },
  userRow: {
    display: "grid",
    gridTemplateColumns: "40px minmax(0, 1fr) auto",
    alignItems: "center",
    gap: 12,
    padding: "12px 0",
    borderBottom: "1px solid #e9ece6",
  },
  userAvatar: {
    width: 40,
    height: 40,
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    background: "#e8efe6",
    color: "#315d3e",
    fontSize: 13,
    fontWeight: 700,
  },
  userName: { margin: 0, fontSize: 14, fontWeight: 700 },
  userEmail: { color: "#788078", fontSize: 13 },
  checkout: {
    width: "100%",
    border: 0,
    borderRadius: 11,
    padding: 14,
    color: "#fff",
    background: "#315d3e",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const dispatch = useAppDispatch();

  const {
    data: users,
    loading: usersLoading,
    error: userError,
    menus,
    menusLoading,
    menuError,
  } = useAppSelector((state) => state.users);
  const categories = menus;
  const selectedMenu =
    menus.find((category) => category.id === activeCategory) ?? menus[0];

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchMenus());
  }, [dispatch]);

  if (menusLoading && menus.length === 0) return <p>Loading menu...</p>;
  if (menuError && menus.length === 0) return <p role="alert">{menuError}</p>;

  const addToCart = (submenu: SubMenu) => {
    const item: MenuItem = {
      id: submenu.id,
      name: submenu.submenu,
      description: submenu.description,
      price: submenu.price,
    };
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      return existing
        ? current.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          )
        : [...current, { ...item, quantity: 1 }];
    });
  };

  const changeQuantity = (id: number, amount: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <p style={styles.eyebrow}>FRESHLY PREPARED</p>
          <h1 style={styles.title}>The hotel menu</h1>
          <p style={styles.subtitle}>Good food, made for your table.</p>
        </div>
        <div aria-label={`${itemCount} items in cart`} style={{ fontSize: 20 }}>
          🛍️ {itemCount}
        </div>
      </header>
      <div style={styles.layout}>
        <section aria-label="Food menu">
          <nav style={styles.tabs} aria-label="Menu categories">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={selectedMenu?.id === category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{
                  ...styles.tab,
                  ...(selectedMenu?.id === category.id ? styles.activeTab : {}),
                }}
              >
                {category.menu}
              </button>
            ))}
          </nav>
          <div style={styles.sectionHeading}>
            <div>
              <p style={styles.eyebrow}>EXPLORE OUR MENU</p>
              <h2 style={styles.heading}>{selectedMenu?.menu ?? "Menu"}</h2>
            </div>
            <span style={styles.count}>
              {selectedMenu?.submenu.length ?? 0} dishes
            </span>
          </div>
          <div style={styles.items}>
            {selectedMenu?.submenu.map((item) => (
              <article key={item.id} style={styles.itemCard}>
                <div style={styles.foodIcon} aria-hidden="true">
                  🍽️
                </div>
                <div style={styles.itemInfo}>
                  <h3 style={styles.itemName}>{item.submenu}</h3>
                  <p style={styles.description}>{item.description}</p>
                  <strong style={styles.price}>₹{item.price}</strong>
                </div>
                <button
                  type="button"
                  style={styles.addButton}
                  onClick={() => addToCart(item)}
                >
                  Add ＋
                </button>
              </article>
            ))}
            {selectedMenu && selectedMenu.submenu.length === 0 && (
              <p>No dishes in this menu yet.</p>
            )}
            {!selectedMenu && !menusLoading && <p>No menus available.</p>}
          </div>
        </section>
        <aside style={styles.cartPanel} aria-label="Your cart">
          <div style={styles.cartHeader}>
            <div>
              <p style={styles.eyebrow}>YOUR ORDER</p>
              <h2 style={styles.cartTitle}>My cart</h2>
            </div>
            <span style={styles.count}>{itemCount} items</span>
          </div>
          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <span style={{ fontSize: 34, marginBottom: 12 }}>🛒</span>
              <strong>Your cart is empty</strong>
              <p>Add something delicious from the menu.</p>
            </div>
          ) : (
            <>
              <div style={styles.cartItems}>
                {cart.map((item) => (
                  <div key={item.id} style={styles.cartItem}>
                    <div style={styles.cartItemInfo}>
                      <strong>{item.name}</strong>
                      <span>₹{item.price} each</span>
                    </div>
                    <div style={styles.quantity}>
                      <button
                        type="button"
                        style={styles.quantityButton}
                        onClick={() => changeQuantity(item.id, -1)}
                        aria-label={`Remove one ${item.name}`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        style={styles.quantityButton}
                        onClick={() => changeQuantity(item.id, 1)}
                        aria-label={`Add one ${item.name}`}
                      >
                        ＋
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.total}>
                <span>Total</span>
                <strong>₹{total}</strong>
              </div>
              <button
                type="button"
                style={styles.checkout}
                onClick={() => window.alert("Your order has been placed!")}
              >
                Place order · ₹{total}
              </button>
            </>
          )}
        </aside>
      </div>
      <section style={styles.usersSection} aria-labelledby="users-heading">
        <header style={styles.usersHeader}>
          <h2 id="users-heading" style={styles.cartTitle}>
            Users
          </h2>
          <span style={styles.count}>{users.length} users</span>
        </header>
        {usersLoading && users.length === 0 && <p>Loading users...</p>}
        {userError && users.length === 0 && <p role="alert">{userError}</p>}
        <ul style={styles.usersList}>
          {users.map((user) => (
            <li key={user.id} style={styles.userRow}>
              <span style={styles.userAvatar} aria-hidden="true">
                {user.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
              <strong style={styles.userName}>{user.name}</strong>
              <span style={styles.userEmail}>{user.email}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
