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
import DonationDone from "./pages/donation_pages/DonationDone.jsx";
import BeneficiaryDetailPage from "./pages/donation_pages/BeneficiaryDetailPage";
import MyPage from "./pages/my_pages/MyPage";
import MyInfo from "./pages/my_pages/MyInfo";
import MyInterest from "./pages/my_pages/MyInterest";
import MyHistory from "./pages/my_pages/MyHistory";
import MyHistoryDetail from "./pages/my_pages/MyHistoryDetail";
import ErrorOccur from "./pages/error_loading_pages/ErrorOccur.jsx";
import PageNotFound from "./pages/error_loading_pages/PageNotFound.jsx";
import Loading from "./pages/error_loading_pages/Loading.jsx";

// 레이아웃 컴포넌트 임포트
import Header from "./layouts/Header";
import Footer from "./layouts/Footer.jsx";

// 컨텍스트 컴포넌트 임포트
import { AuthProvider } from "./context/AuthContext.jsx";
import { BeneficiaryProvider } from "./context/BeneficiaryContext.jsx";
import { HistoryProvider } from "./context/HistoryContext";
import { TagProvider } from "./context/TagContext.jsx";
import { PaymentProvider } from "./context/PaymentContext.jsx";

// 라우트 관련 컴포넌트 임포트
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <BeneficiaryProvider>

          <TagProvider>
            <PaymentProvider>
                <HistoryProvider>
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
                  <Route
                    path="/signup/step2"
                    element={
                      <PublicRoute
                        restricted={true}
                        element={<SignupStepTwo />}
                      />
                    }
                  />
                  <Route
                    path="/signup/done"
                    element={
                      <PublicRoute
                        restricted={true}
                        element={<SignupDone />}
                      />
                    }
                  />
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
                    path="/myhistory"
                    element={<ProtectedRoute element={<MyHistory />} />}
                  />
                  <Route
                    path="/myhistory/:historyId"
                    element={<ProtectedRoute element={<MyHistoryDetail />} />}
                  />
                  <Route path="/error" element={<ErrorOccur />} />
                  <Route path="/loading" element={<Loading />} />

                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
              <Footer />
              </HistoryProvider>
            </PaymentProvider>
          </TagProvider>

      </BeneficiaryProvider>
    </AuthProvider>
  );
}

export default App;
