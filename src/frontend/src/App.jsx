// 라이브러리 및 모듈 임포트
import { Routes, Route } from "react-router-dom";

// 스타일시트 임포트
import "./App.css";

// 페이지 컴포넌트 임포트
import Home from "./pages/Home";
import Login from "./pages/login_signup_pages/Login";
import SignupStepOne from "./pages/login_signup_pages/SignupStepOne.jsx";
import SignupStepTwo from "./pages/login_signup_pages/SignupStepTwo";
import SignupDone from "./pages/login_signup_pages/SignupDone.jsx";
import DonationStepOne from "./pages/donation_pages/DonationStepOne.jsx";
import DonationStepTwo from "./pages/donation_pages/DonationStepTwo.jsx";
import DonationStepThree from "./pages/donation_pages/DonationStepThree.jsx";
import DonationPayment from "./pages/donation_pages/DonationPayment.jsx";
import BeneficiaryDetailPage from "./pages/donation_pages/BeneficiaryDetailPage";
import DonationDone from "./pages/donation_pages/DonationDone.jsx";
import MyPage from "./pages/my_pages/MyPage";
import MyInfo from "./pages/my_pages/MyInfo";
import MyInterest from "./pages/my_pages/MyInterest";
import MyStatus from "./pages/my_pages/MyStatus";
import ErrorOccur from "./pages/error_loading_pages/ErrorOccur.jsx";
import PageNotFound from "./pages/error_loading_pages/PageNotFound.jsx";
import Loading from "./pages/error_loading_pages/Loading.jsx";

// 레이아웃 컴포넌트 임포트
import Header from "./layouts/Header";
import Footer from "./layouts/Footer.jsx";

// 컨텍스트 및 기타 컴포넌트 임포트
import { AuthProvider } from "./context/AuthContext.jsx";
import { InterestProvider } from "./context/InterestContext";
import { BeneficiaryProvider } from "./context/BeneficiaryContext.jsx";
import { TagProvider } from "./context/TagContext.jsx";
import { PaymentProvider } from "./context/PaymentContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <BeneficiaryProvider>
        <InterestProvider>
          <TagProvider>
            <PaymentProvider>
              <Header />
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/login"
                    element={
                      <PublicRoute restricted={true} element={<Login />} />
                    }
                  />
                  <Route
                    path="/signup/step1"
                    element={
                      <PublicRoute
                        restricted={true}
                        element={<SignupStepOne />}
                      />
                    }
                  />
                  <Route path="/signup/step2" element={<SignupStepTwo />} />
                  <Route path="/signup/done" element={<SignupDone />} />

                  <Route
                    path="/donation/step1"
                    element={<ProtectedRoute element={<DonationStepOne />} />}
                  />
                  <Route
                    path="/donation/step2"
                    element={<ProtectedRoute element={<DonationStepTwo />} />}
                  />
                  <Route
                    path="/donation/step3"
                    element={<ProtectedRoute element={<DonationStepThree />} />}
                  />
                  <Route
                    path="/donation/payment"
                    element={<ProtectedRoute element={<DonationPayment />} />}
                  />
                  <Route
                    path="/donation/done"
                    element={<ProtectedRoute element={<DonationDone />} />}
                  />
                  {/* <Route
                  path="/beneficiary/:beneficiaryId"
                  element={
                    <ProtectedRoute element={<BeneficiaryDetailPage />} />
                  }
                /> */}
                  <Route
                    path="/beneficiary/:beneficiaryId"
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
                  <Route path="/error" element={<ErrorOccur />} />
                  <Route path="/loading" element={<Loading />} />

                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
              <Footer />
            </PaymentProvider>
          </TagProvider>
        </InterestProvider>
      </BeneficiaryProvider>
    </AuthProvider>
  );
}

export default App;
