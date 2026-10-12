import React from "react";
import { NavLink } from "react-router-dom";
import "./layout.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { logoutUser } from "../../store/users/userThunks";
import { getRoleName, LoginRole } from "../../common/model/users/roles";
type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title = "MAT Loan" }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeUser = useAppSelector((state) => state.users.activeUser);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brandWrap}>
            <div style={styles.logo}>M</div>
            <div>
              <div style={styles.brand}>{title}</div>
              <div style={styles.subBrand}>Smart lending solutions</div>
            </div>
          </div>

          <nav aria-label="Main navigation" style={styles.nav}>
            {activeUser && (
              <NavLink
                to="/home"
                style={({ isActive }) => ({
                  ...styles.navLink,
                  fontWeight: isActive ? 700 : 400,
                })}
              >
                Home
              </NavLink>
            )}
            {activeUser && activeUser.roleId === LoginRole.Customer && (
              <>
                <NavLink
                  to="/about"
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    fontWeight: isActive ? 700 : 400,
                  })}
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    fontWeight: isActive ? 700 : 400,
                  })}
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/cart"
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    fontWeight: isActive ? 700 : 400,
                  })}
                >
                  Cart
                </NavLink>
              </>
            )}
            {activeUser &&
              (activeUser.roleId === LoginRole.Counter ||
                activeUser.roleId === LoginRole.Admin) && (
                <NavLink
                  to="/active-tables"
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    fontWeight: isActive ? 700 : 400,
                  })}
                >
                  Active Tables
                </NavLink>
              )}

            {activeUser && activeUser.roleId === LoginRole.Waiter && (
              <NavLink
                to="/waiter-assign-tables"
                style={({ isActive }) => ({
                  ...styles.navLink,
                  fontWeight: isActive ? 700 : 400,
                })}
              >
                Waiter Assign Tables
              </NavLink>
            )}
            {activeUser && activeUser.roleId === LoginRole.Admin && (
              <div className="dropdown">
                <button className="dropbtn">Admin ▼</button>
                <div className="dropdown-content">
                  <NavLink
                    to="/my-account"
                    style={({ isActive }) => ({
                      ...styles.navLink,
                      fontWeight: isActive ? 700 : 400,
                    })}
                  >
                    My Account
                  </NavLink>
                  <NavLink
                    to="/report"
                    style={({ isActive }) => ({
                      ...styles.navLink,
                      fontWeight: isActive ? 700 : 400,
                    })}
                  >
                    Report
                  </NavLink>
                  <a href="#">Report3</a>
                </div>
              </div>
            )}

            {activeUser && (
              <button
                type="button"
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/", { replace: true });
                }}
                style={{
                  ...styles.navLink,
                  background: "transparent",
                  border: 0,
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Logout ({activeUser.name} - {getRoleName(activeUser.roleId)})
              </button>
            )}
          </nav>
        </div>
      </header>

      <main style={styles.main}>{children}</main>

      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span>© 2026 MAT Loan</span>
          <span>Privacy Policy</span>
          <span>Terms</span>
        </div>
      </footer>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f4f7fb",
    color: "#152033",
    fontFamily: "Segoe UI, Arial, sans-serif",
  },
  header: {
    background: "#ffffff",
    borderBottom: "1px solid #e7ecf3",
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "18px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: 20,
  },
  brand: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "-0.03em",
  },
  subBrand: {
    fontSize: 12,
    color: "#64748b",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  navLink: {
    color: "#334155",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
  },
  main: {
    flex: 1,
    maxWidth: 1200,
    width: "100%",
    margin: "0 auto",
    padding: "32px 24px 48px",
    boxSizing: "border-box",
  },
  footer: {
    background: "#0f172a",
    color: "#cbd5e1",
  },
  footerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "18px 24px",
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    fontSize: 14,
  },
};

export default Layout;
