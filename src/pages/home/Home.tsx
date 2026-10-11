import { useMemo, useState } from "react";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
};
type CartItem = MenuItem & { quantity: number };

const menu: Record<string, MenuItem[]> = {
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
  activeTab: { background: "#315d3e", borderColor: "#315d3e", color: "#fff" },
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
  const categories = Object.keys(menu);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const addToCart = (item: MenuItem) => {
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
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                style={{
                  ...styles.tab,
                  ...(activeCategory === category ? styles.activeTab : {}),
                }}
              >
                {category}
              </button>
            ))}
          </nav>
          <div style={styles.sectionHeading}>
            <div>
              <p style={styles.eyebrow}>EXPLORE OUR MENU</p>
              <h2 style={styles.heading}>{activeCategory}</h2>
            </div>
            <span style={styles.count}>
              {menu[activeCategory].length} dishes
            </span>
          </div>
          <div style={styles.items}>
            {menu[activeCategory].map((item) => (
              <article key={item.id} style={styles.itemCard}>
                <div style={styles.foodIcon} aria-hidden="true">
                  🍽️
                </div>
                <div style={styles.itemInfo}>
                  <h3 style={styles.itemName}>{item.name}</h3>
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
    </main>
  );
}
