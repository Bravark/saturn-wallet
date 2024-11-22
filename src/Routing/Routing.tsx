import { Route, Routes } from "react-router";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import WithdrawalPage from "../pages/WithdrawalPage";
import SettingsPage from "../pages/SettingsPage";
import LandingPage from "../pages/LandingPage";
import AuthLayout from "./AuthLayout";
import ConfigurationPage from "../pages/ConfigurationPage";
import NewWalletPage from "../pages/NewWalletPage";
import ExistingWalletPage from "../pages/ExistingWalletPage";
import DepositPage from "../pages/DepositPage";
import SuccessPage from "../pages/SuccessPage";

// import Loader from "@components/Loader.jsx";

const Routing = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="landing" element={<LandingPage />} />
        <Route path="configure" element={<ConfigurationPage />} />
        <Route path="wallet-new" element={<NewWalletPage />} />
        <Route path="wallet-existing" element={<ExistingWalletPage />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="withdraw" element={<WithdrawalPage />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="deposit" element={<DepositPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Route>

      {/*SUB: ====== PROTECTED ROUTES ======= */}
      {/* <Route element={<ProtectedRoutes accessBy="authenticated" />}>
          <Route element={<Layout />}>
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckoutPage />}>
              <Route index element={<CheckoutInfo />} />
              <Route path="order confirmation" element={<OrderConfirm />} />
            </Route>
            <Route path="payment confirmation page" element={<Payment />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="about" element={<About />} />
            <Route path="account" element={<AccountsPage />}>
              <Route index element={<AccountProfile />} />
              <Route path="security" element={<AccountSecurity />} />
            </Route>
          </Route>
        </Route> */}
    </Routes>
  );
};

export default Routing;
