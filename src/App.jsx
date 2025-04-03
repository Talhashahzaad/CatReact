import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Footer from './common/Footer'
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import Header from './common/Header';
import Blogs from './pages/Blogs/Blogs';
import SinglePost from './pages/Blogs/SinglePost';
import Dashboard from './pages/DashboardPage/Dashboard';
import AllListing from './pages/DashboardPage/AllListing/AllListing';
import Treatment from './pages/DashboardPage/Treatment/Treatment';
import ProfessionalAffiliationsCertificates from './pages/DashboardPage/ProfessionalAffiliationsCertificates/ProfessionalAffiliationsCertificates';
import Practitioner from './pages/DashboardPage/Practitioner/Practitioner';
import Order from './pages/DashboardPage/Order/Order';
import MyProfile from './pages/DashboardPage/MyProfile/MyProfile';
import Error404Page from './pages/Error404/Error404';
import ListingDetails from './pages/ListingDetails/ListingDetails';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import ContactUs from './pages/ContactUs/ContactUs';
import "./Responsive.css";
import ForBusiness from './pages/ForBusiness/ForBusiness';
import AboutUs from './pages/AboutUs/AboutUs';
import FrequentlyAskedQuestion from './pages/FrequentlyAskedQuestion/FrequentlyAskedQuestion';
import PricingPackage from './pages/PricingPackage/PricingPackage';
import BeyondTheTreatments from './pages/BeyondTreatments/BeyondTheTreatments';
import TreatmentPackage from './pages/DashboardPage/TreatmentPackage/TreatmentPackage';
import ThankYou from './pages/ThankYou/ThankYou';
import UserRegistration from './pages/UserRegistration/UserRegistration';
import BusinessRegistration from './pages/BusinessRegistration/BusinessRegistration';
import BusinessLogin from './pages/BusinessLogin/BusinessLogin';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import FeaturedListing from './pages/FeaturedListing/FeaturedSearchListing';
import ProtectedRoute from './component/ProtectedRoute';
import ServiceCategories from './pages/ServiceCategories/ServiceCategories';
import Checkout from './pages/Checkout/Checkout';


function App () {

  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div style={dashboardPageMain.app}>
      {!isDashboard && <Header />}
      <main>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<Register/>} />
          <Route path="/forget-password" element={<ForgetPassword/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/blog/:title" element={<SinglePost/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms-and-conditions" element={<TermsConditions/>} />
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/for-business" element={<ForBusiness/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/frequently-asked-question" element={<FrequentlyAskedQuestion/>} />
          <Route path="/pricing-packages" element={<PricingPackage/>} />
          <Route path="/beyond-the-treatments" element={<BeyondTheTreatments/>} />
          <Route path="/*" element={<Error404Page/>} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/my-profile" element={
            <ProtectedRoute>
              <MyProfile/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/all-listing" element={
            <ProtectedRoute>
              <AllListing/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/treatment" element={
            <ProtectedRoute>
              <Treatment/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/treatment-package" element={
            <ProtectedRoute>
              <TreatmentPackage/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/practitioner" element={
            <ProtectedRoute>
              <Practitioner/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/certificate" element={
            <ProtectedRoute>
              <ProfessionalAffiliationsCertificates/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/order" element={
            <ProtectedRoute>
              <Order/>
            </ProtectedRoute>
          } />
          
          <Route path="/not-found" element={<Error404Page/>} />
          <Route path="/listing-details" element={<ListingDetails/>} />
          <Route path="/thank-you" element={<ThankYou/>} />
          <Route path="/user-registration" element={<UserRegistration/>} />
          <Route path="/business-registration" element={<BusinessRegistration/>} />
          <Route path="/business-login" element={<BusinessLogin/>} />
          <Route path="/change-password" element={<ChangePassword/>} />
          <Route path="/featured-search-listing" element={<FeaturedListing />} />
          <Route path="/service-categories" element={<ServiceCategories/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  )
}

const dashboardPageMain = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: '1'
  }
};

export default App;