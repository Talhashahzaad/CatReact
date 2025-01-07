import './App.css'
import Home from './pages/Home'
import Footer from './common/Footer'
import { Routes, Route, Outlet } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import Header from './common/Header';
import Dashboard from './pages/DashboardPage/Dashboard';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import ContactUs from './pages/ContactUs/ContactUs';
import "./Responsive.css";
import ForBusiness from './pages/ForBusiness/ForBusiness';
import AboutUs from './pages/AboutUs/AboutUs';
import FrequentlyAskedQuestion from './pages/FrequentlyAskedQuestion/FrequentlyAskedQuestion';



function App() {
  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<Register/>} />
          <Route path="/forget-password" element={<ForgetPassword/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms-and-conditions" element={<TermsConditions/>} />
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/for-business" element={<ForBusiness/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/frequently-asked-question" element={<FrequentlyAskedQuestion/>} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App;