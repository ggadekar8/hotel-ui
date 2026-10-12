import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./AppRoutes.css";
import Layout from "../layout/Layout";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Contact from "../../pages/contact/Contact";
import Login from "../../pages/login/Login";
import Cart from "../../features/cart/Cart";
import ActiveTables from "../../features/order/active-tables/ActiveTables";
import ViewOrder from "../../features/order/view-order/ViewOrder";
import MyAccount from "../../features/admin-panel/my-account/MyAccount";
import Report from "../../features/report/Report";
import WaiterAssignTables from "../../features/waiter/WaiterAssignTables";
import { useAppSelector } from "../hooks/useAppSelector";
import { getRoleHomePath } from "../../common/model/users/roles";

export const AppRoutes = () => {
  const activeUser = useAppSelector((state) => state.users.activeUser);
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              activeUser ? (
                <Navigate to={getRoleHomePath(activeUser.roleId)} replace />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<RequireActiveUser />}>
            <Route path="/active-tables" element={<ActiveTables />} />
            <Route
              path="/view-order"
              element={
                <ViewOrder
                  tableName=""
                  items={[]}
                  customerName=""
                  customerMobile=""
                  waiterId=""
                />
              }
            />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/report" element={<Report />} />
            <Route
              path="/waiter-assign-tables"
              element={<WaiterAssignTables />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
};

function RequireActiveUser() {
  const activeUser = useAppSelector((state) => state.users.activeUser);
  return activeUser ? <Outlet /> : <Navigate to="/" replace />;
}
