import { Navigate, Route, Routes } from "react-router-dom";
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
export const AppRoutes = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
};
