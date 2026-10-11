import React from "react";

const featuredRooms = [
  {
    title: "Deluxe King Room",
    description:
      "Comfortable space with city views, premium bedding, and a private balcony.",
    price: "$180/night",
  },
  {
    title: "Family Suite",
    description:
      "Spacious suite with two bedrooms, lounge area, and family-friendly amenities.",
    price: "$260/night",
  },
  {
    title: "Ocean View Retreat",
    description:
      "Relax by the window with stunning sea views and a luxurious spa bath.",
    price: "$320/night",
  },
];

const Home: React.FC = () => {
  return (
    <main
      style={{
        padding: "32px",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937",
      }}
    >
      <section
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          borderRadius: "20px",
          padding: "40px 32px",
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#2563eb",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Welcome to Hotel
        </p>
        <h1
          style={{ fontSize: "3rem", margin: "12px 0 16px", lineHeight: 1.1 }}
        >
          Relax in comfort.
        </h1>
        <p
          style={{
            maxWidth: "640px",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            color: "#475569",
          }}
        >
          Discover premium stays, exceptional service, and memorable experiences
          designed for every kind of traveler.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "14px 24px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Book a stay
          </button>
          <button
            type="button"
            style={{
              background: "#fff",
              color: "#1f2937",
              border: "1px solid #cbd5e1",
              borderRadius: "12px",
              padding: "14px 24px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Explore rooms
          </button>
        </div>
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
          Featured rooms
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {featuredRooms.map((room) => (
            <article
              key={room.title}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div
                style={{
                  height: "140px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                  marginBottom: "16px",
                }}
              />
              <h3 style={{ margin: "0 0 8px", fontSize: "1.25rem" }}>
                {room.title}
              </h3>
              <p
                style={{
                  margin: "0 0 12px",
                  color: "#64748b",
                  lineHeight: 1.6,
                }}
              >
                {room.description}
              </p>
              <strong style={{ color: "#0f172a", fontSize: "1.1rem" }}>
                {room.price}
              </strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
