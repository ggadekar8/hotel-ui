import React from "react";

const About = () => {
  const sectionStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 24px",
    color: "#1f2937",
    fontFamily: "Arial, sans-serif",
  };

  const heroStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "40px",
    alignItems: "center",
  };

  const textStyle: React.CSSProperties = {
    maxWidth: "600px",
  };

  const eyebrowStyle: React.CSSProperties = {
    display: "inline-block",
    marginBottom: "16px",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#f3f4f6",
    color: "#b45309",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  const titleStyle: React.CSSProperties = {
    margin: "0 0 16px",
    fontSize: "clamp(2.2rem, 4vw, 4rem)",
    lineHeight: 1.1,
    color: "#111827",
  };

  const paragraphStyle: React.CSSProperties = {
    margin: "0 0 24px",
    fontSize: "1.05rem",
    lineHeight: 1.8,
    color: "#4b5563",
  };

  const buttonRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    marginTop: "8px",
  };

  const primaryButtonStyle: React.CSSProperties = {
    padding: "14px 24px",
    border: "none",
    borderRadius: "12px",
    background: "#b45309",
    color: "#fff",
    fontSize: "0.98rem",
    fontWeight: 700,
    cursor: "pointer",
  };

  const secondaryButtonStyle: React.CSSProperties = {
    padding: "14px 24px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    background: "#fff",
    color: "#111827",
    fontSize: "0.98rem",
    fontWeight: 700,
    cursor: "pointer",
  };

  const imageWrapStyle: React.CSSProperties = {
    position: "relative",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
    minHeight: "500px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const imageBadgeStyle: React.CSSProperties = {
    position: "absolute",
    left: "24px",
    bottom: "24px",
    background: "rgba(255,255,255,0.9)",
    padding: "18px 20px",
    borderRadius: "16px",
    boxShadow: "0 18px 35px rgba(17,24,39,0.08)",
  };

  const badgeTitleStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.8rem",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "6px",
  };

  const badgeValueStyle: React.CSSProperties = {
    fontSize: "1.7rem",
    fontWeight: 800,
    color: "#111827",
  };

  const statsStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "20px",
    marginTop: "48px",
  };

  const statCardStyle: React.CSSProperties = {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    padding: "28px 24px",
    textAlign: "center",
  };

  const statValueStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "8px",
    fontSize: "2rem",
    fontWeight: 800,
    color: "#111827",
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: "0.95rem",
    color: "#4b5563",
  };

  return (
    <section style={sectionStyle}>
      <div style={heroStyle}>
        <div style={textStyle}>
          <div style={eyebrowStyle}>About us</div>
          <h1 style={titleStyle}>A warm stay in the heart of comfort.</h1>
          <p style={paragraphStyle}>
            At Hotel, we believe exceptional travel starts with thoughtful
            hospitality. From the moment you arrive, our team is dedicated to
            creating a peaceful, memorable experience tailored to your needs.
          </p>
          <p style={paragraphStyle}>
            Whether you are visiting for business, a romantic getaway, or a
            family vacation, we offer refined spaces, genuine service, and a
            welcoming atmosphere that feels like home.
          </p>

          <div style={buttonRowStyle}>
            <button style={primaryButtonStyle}>Book a stay</button>
            <button style={secondaryButtonStyle}>Explore rooms</button>
          </div>
        </div>

        <div style={imageWrapStyle}>
          <div style={imageBadgeStyle}>
            <span style={badgeTitleStyle}>Guest satisfaction</span>
            <span style={badgeValueStyle}>4.9/5</span>
          </div>
        </div>
      </div>

      <div style={statsStyle}>
        <div style={statCardStyle}>
          <span style={statValueStyle}>25+</span>
          <span style={statLabelStyle}>Years of hospitality</span>
        </div>
        <div style={statCardStyle}>
          <span style={statValueStyle}>120</span>
          <span style={statLabelStyle}>Comfortable rooms</span>
        </div>
        <div style={statCardStyle}>
          <span style={statValueStyle}>24/7</span>
          <span style={statLabelStyle}>Dedicated support</span>
        </div>
      </div>
    </section>
  );
};

export default About;
