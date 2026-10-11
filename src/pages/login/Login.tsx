import { useState, type FormEvent, type CSSProperties } from "react";

type LoginRole = "Customer" | "Admin" | "Counter" | "Waiter";

export default function Login() {
  const [role, setRole] = useState<LoginRole>("Customer");
  const [otpSent, setOtpSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // if (role === "Customer" && !otpSent) {
    //   setOtpSent(true);
    //   return;
    // }
    if (role === "Customer") {
      window.location.href = "/home";
    } else if (role === "Admin" || role === "Counter" || role === "Waiter") {
      window.location.href = "/active-tables";
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.brand}>HOTEL</div>
        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to continue</p>

        <fieldset style={styles.roles}>
          <legend style={styles.legend}>Login as</legend>
          {(["Customer", "Admin", "Counter", "Waiter"] as LoginRole[]).map(
            (item) => (
              <label
                key={item}
                style={{
                  ...styles.role,
                  ...(role === item ? styles.activeRole : {}),
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value={item}
                  checked={role === item}
                  onChange={() => {
                    setRole(item);
                    setOtpSent(false);
                  }}
                />
                {item}
              </label>
            ),
          )}
        </fieldset>

        <form onSubmit={submit} style={styles.form}>
          {role === "Customer" ? (
            <>
              <label htmlFor="mobile" style={styles.label}>
                Mobile number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                autoComplete="tel"
                placeholder="Enter mobile number"
                required
                style={styles.input}
              />
              {otpSent && (
                <>
                  <label htmlFor="otp" style={styles.label}>
                    OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="Enter OTP"
                    required
                    style={styles.input}
                  />
                </>
              )}
              <button type="submit" style={styles.button}>
                {otpSent ? "Login" : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <label htmlFor="username" style={styles.label}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter username"
                required
                style={styles.input}
              />
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter password"
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Login
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    boxSizing: "border-box",
    background: "#f3f6fb",
    color: "#172033",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    padding: 36,
    boxSizing: "border-box",
    borderRadius: 16,
    background: "white",
    boxShadow: "0 16px 48px rgba(25,44,78,.12)",
  },
  brand: { color: "#2563eb", fontSize: 13, fontWeight: 800, letterSpacing: 3 },
  heading: { margin: "18px 0 6px", fontSize: 28 },
  subtitle: { margin: "0 0 24px", color: "#697386", fontSize: 14 },
  roles: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 9,
    padding: 0,
    margin: "0 0 22px",
    border: 0,
  },
  legend: { marginBottom: 10, fontSize: 13, fontWeight: 600 },
  role: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 11,
    border: "1px solid #e1e6ef",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
  },
  activeRole: {
    borderColor: "#2563eb",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontWeight: 600,
  },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  label: { marginTop: 4, fontSize: 13, fontWeight: 600 },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 12,
    border: "1px solid #d9dfeb",
    borderRadius: 8,
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    padding: 13,
    border: 0,
    borderRadius: 8,
    background: "#2563eb",
    color: "white",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
};
