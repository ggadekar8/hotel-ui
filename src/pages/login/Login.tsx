import { useEffect, useState, type FormEvent, type CSSProperties } from "react";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import { loginCustomerWithOtp, loginUser } from "../../store/users/userThunks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getRoleHomePath, LoginRole } from "../../common/model/users/roles";
import { sendCustomerOtp } from "../../services/customer-auth.service";
type LoginRole = "Customer" | "Staff";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get("tableid")?.trim() || undefined;
  const activeUser = useAppSelector((state) => state.users.activeUser);
  const [role, setRole] = useState<LoginRole>("Customer");
  const [otpSent, setOtpSent] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (activeUser) {
      const destination = getRoleHomePath(activeUser.roleId);
      navigate(
        tableId && activeUser.roleId === LoginRole.Customer
          ? `${destination}?tableid=${encodeURIComponent(tableId)}`
          : destination,
        { replace: true },
      );
    }
  }, [activeUser, navigate, tableId]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (role === "Customer") {
      const name = String(formData.get("name") ?? "").trim();
      const phone = String(formData.get("phone") ?? "").trim();

      try {
        if (!otpSent) {
          await sendCustomerOtp({ name, phone, tableId });
          setOtpSent(true);
          setLoginError(null);
          return;
        }

        const otp = String(formData.get("otp") ?? "").trim();
        await dispatch(
          loginCustomerWithOtp({ name, phone, otp, tableId }),
        ).unwrap();
        setLoginError(null);
      } catch (error) {
        setLoginError(
          typeof error === "string"
            ? error
            : otpSent
              ? "OTP verification failed. Please try again."
              : "Unable to send OTP. Please try again.",
        );
      }
      return;
    }

    const userName = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      await dispatch(loginUser({ userName, password })).unwrap();
      setLoginError(null);
    } catch (error) {
      setLoginError(
        typeof error === "string"
          ? error
          : "Unable to log in. Please try again.",
      );
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.brand}>HOTEL</div>
        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to continue</p>

        {!tableId && (
          <fieldset style={styles.roles}>
            <legend style={styles.legend}>Login as</legend>
            {(["Customer", "Staff"] as LoginRole[]).map((item) => (
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
                    setLoginError(null);
                  }}
                />
                {item}
              </label>
            ))}
          </fieldset>
        )}

        <form onSubmit={submit} style={styles.form}>
          {role === "Customer" ? (
            <>
              <label htmlFor="name" style={styles.label}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                required
                style={styles.input}
              />
              <label htmlFor="phone" style={styles.label}>
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="Enter phone number"
                pattern="\+?[0-9]{7,15}"
                title="Enter 7 to 15 digits, optionally starting with +"
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
              {loginError && <p role="alert">{loginError}</p>}
              <button type="submit" style={styles.button}>
                {otpSent ? "Verify OTP" : "Send OTP"}
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
              {loginError && <p role="alert">{loginError}</p>}
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
