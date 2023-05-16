import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './hoc/auth';
import Layout from './components/Layout/Layout';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './components/views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './components/views/SubscriptionPage/SubscriptionPage';

function App() {
  /**
   * null: 아무나 출입이 가능한 페이지
   * true: 로그인한 유저만 출입이 가능한 페이지
   * false: 로그인한 유저는 출입이 불가능한 페이지
   */
  const AuthenticLandingPage = Auth(LandingPage, null);
  const AuthenticLoginPage = Auth(LoginPage, false);
  const AuthenticRegisterPage = Auth(RegisterPage, false);
  const AuthenticVideoUploadPage = Auth(VideoUploadPage, true);
  const AuthenticVideoDetailPage = Auth(VideoDetailPage, null);
  const AuthenticSubscriptionPage = Auth(SubscriptionPage, null);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AuthenticLandingPage />} />
          <Route path="/login" element={<AuthenticLoginPage />} />
          <Route path="/register" element={<AuthenticRegisterPage />} />
          <Route path="/video/upload" element={<AuthenticVideoUploadPage />} />
          <Route
            path="/video/:videoId"
            element={<AuthenticVideoDetailPage />}
          />
          <Route path="/subscription" element={<AuthenticSubscriptionPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
