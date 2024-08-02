import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login_signup_pages/Login";
import SignupFirstStep from "./pages/login_signup_pages/SignupFirstStep";
import SignupSecondStep from "./pages/login_signup_pages/SignupSecondStep";
import DonationFirstStep from "./pages/donation_pages/DonationFirstStep.jsx";
import DonationSecondStep from "./pages/donation_pages/DonationSecondStep.jsx";
import DonationThirdStep from "./pages/donation_pages/DonationThirdStep.jsx";
import DonationPayment from "./pages/donation_pages/DonationPayment.jsx";
import BeneficiaryDetailPage from "./pages/donation_pages/BeneficiaryDetailPage";
import MyPage from "./pages/my_pages/MyPage";
import MyInfo from "./pages/my_pages/MyInfo";
import MyInterest from "./pages/my_pages/MyInterest";
import MyStatus from "./pages/my_pages/MyStatus";
import PageNotFound from "./pages/error_pages/PageNotfound.jsx";
import Header from "./layouts/Header";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import DonationDone from "./pages/donation_pages/DonationDone.jsx";
import Footer from "./layouts/Footer.jsx";
import ErrorOccur from "./pages/error_pages/ErrorOccur.jsx";
// import { Checkout } from "./pages/toss_payments/Checkout.jsx";

function App() {
  return (
    <AuthProvider>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupFirstStep />} />
          <Route path="/signup/second" element={<SignupSecondStep />} />
          <Route
            path="/donation"
            element={<ProtectedRoute element={<DonationFirstStep />} />}
          />
          <Route
            path="/donation/second"
            element={<ProtectedRoute element={<DonationSecondStep />} />}
          />
          <Route
            path="/donation/third"
            element={<ProtectedRoute element={<DonationThirdStep />} />}
          />
          <Route
            path="/donation/payment"
            element={<ProtectedRoute element={<DonationPayment />} />}
          />
          <Route
            path="/donation/done"
            element={<ProtectedRoute element={<DonationDone />} />}
          />
          <Route
            path="/beneficiarydetailpage"
            element={<BeneficiaryDetailPage />}
          />
          <Route
            path="/mypage"
            element={<ProtectedRoute element={<MyPage />} />}
          />
          <Route
            path="/myinfo"
            element={<ProtectedRoute element={<MyInfo />} />}
          />
          <Route
            path="/myinterest"
            element={<ProtectedRoute element={<MyInterest />} />}
          />
          <Route
            path="/mystatus"
            element={<ProtectedRoute element={<MyStatus />} />}
          />
          {/* <Route
            path="/toss"
            element={
              <Checkout
                value={30_000}
                orderId="fdhklfj4"
                orderName="주문내용"
              />
            }
          /> */}
          <Route path="/error" element={<ErrorOccur />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
