// 라이브러리 및 모듈 임포트
import { Routes, Route } from "react-router-dom";

// 스타일시트 임포트
import "./App.css";

// 페이지 컴포넌트 임포트
import Home from "./pages/Home";
import Login from "./pages/login_signup_pages/Login";
import SignupFirstStep from "./pages/login_signup_pages/SignupFirstStep";
import SignupSecondStep from "./pages/login_signup_pages/SignupSecondStep";
import SignupDone from "./pages/login_signup_pages/SignupDone.jsx";
import DonationFirstStep from "./pages/donation_pages/DonationFirstStep.jsx";
import DonationSecondStep from "./pages/donation_pages/DonationSecondStep.jsx";
import DonationThirdStep from "./pages/donation_pages/DonationThirdStep.jsx";
import DonationPayment from "./pages/donation_pages/DonationPayment.jsx";
import BeneficiaryDetailPage from "./pages/donation_pages/BeneficiaryDetailPage";
import DonationDone from "./pages/donation_pages/DonationDone.jsx";
import MyPage from "./pages/my_pages/MyPage";
import MyInfo from "./pages/my_pages/MyInfo";
import MyInterest from "./pages/my_pages/MyInterest";
import MyStatus from "./pages/my_pages/MyStatus";
import ErrorOccur from "./pages/error_pages/ErrorOccur.jsx";
import PageNotFound from "./pages/error_pages/PageNotFound.jsx";

// 레이아웃 컴포넌트 임포트
import Header from "./layouts/Header";
import Footer from "./layouts/Footer.jsx";

// 컨텍스트 및 기타 컴포넌트 임포트
import { AuthProvider } from "./context/AuthContext.jsx";
import { InterestProvider } from "./context/InterestContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { BeneficiaryProvider } from "./context/BeneficiaryContext.jsx";
import { TagProvider } from "./context/TagContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BeneficiaryProvider>
        <InterestProvider>
          <TagProvider>
            <Header />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignupFirstStep />} />
                <Route path="/signup/second" element={<SignupSecondStep />} />
                <Route path="/signup/done" element={<SignupDone />} />

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
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
            <Footer />
          </TagProvider>
        </InterestProvider>
      </BeneficiaryProvider>
    </AuthProvider>
  );
}

export default App;
