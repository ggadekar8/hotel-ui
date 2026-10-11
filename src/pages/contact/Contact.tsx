import React from "react";

const Contact: React.FC = () => {
  return (
    <section style={styles.container}>
      <div style={styles.content}>
        <div style={styles.info}>
          <p style={styles.eyebrow}>Contact us</p>
          <h1 style={styles.title}>We’d love to hear from you</h1>
          <p style={styles.text}>
            Reach out for reservations, special requests, or any questions about
            your stay.
          </p>

          <div style={styles.cardList}>
            <div style={styles.card}>
              <strong style={styles.cardTitle}>Phone</strong>
              <span style={styles.cardValue}>+1 (555) 123-4567</span>
            </div>
            <div style={styles.card}>
              <strong style={styles.cardTitle}>Email</strong>
              <span style={styles.cardValue}>hello@hotel.com</span>
            </div>
            <div style={styles.card}>
              <strong style={styles.cardTitle}>Address</strong>
              <span style={styles.cardValue}>123 Ocean Avenue, Miami, FL</span>
            </div>
          </div>
        </div>

        <form style={styles.form}>
          <h2 style={styles.formTitle}>Send a message</h2>

          <div style={styles.fieldRow}>
            <label style={styles.label}>
              Full name
              <input type="text" placeholder="Your name" style={styles.input} />
            </label>
          </div>

          <div style={styles.fieldRow}>
            <label style={styles.label}>
              Email
              <input
                type="email"
                placeholder="you@example.com"
                style={styles.input}
              />
            </label>
          </div>

          <div style={styles.fieldRow}>
            <label style={styles.label}>
              Message
              <textarea
                placeholder="How can we help?"
                rows={5}
                style={styles.textarea}
              />
            </label>
          </div>

          <button type="submit" style={styles.button}>
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "48px 20px",
    background: "#f7f4ef",
    boxSizing: "border-box",
  },
  content: {
    width: "100%",
    maxWidth: "1100px",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "32px",
    alignItems: "start",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  eyebrow: {
    margin: 0,
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#8b6a43",
  },
  title: {
    margin: 0,
    fontSize: "42px",
    lineHeight: 1.1,
    color: "#1d1d1d",
  },
  text: {
    margin: 0,
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#4b4b4b",
    maxWidth: "560px",
  },
  cardList: {
    display: "grid",
    gap: "16px",
    marginTop: "8px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "18px 20px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.04)",
  },
  cardTitle: {
    fontSize: "14px",
    color: "#7a6d5d",
  },
  cardValue: {
    fontSize: "18px",
    color: "#1d1d1d",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    padding: "28px",
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 16px 40px rgba(17, 17, 17, 0.08)",
  },
  formTitle: {
    margin: "0 0 8px",
    fontSize: "28px",
    color: "#1d1d1d",
  },
  fieldRow: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#333",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e2d9cb",
    fontSize: "16px",
    outline: "none",
    background: "#fff",
    color: "#1d1d1d",
  },
  textarea: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e2d9cb",
    fontSize: "16px",
    outline: "none",
    resize: "vertical",
    minHeight: "120px",
    background: "#fff",
    color: "#1d1d1d",
  },
  button: {
    marginTop: "8px",
    padding: "14px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#1d1d1d",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default Contact;
