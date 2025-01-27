import './App.css'
import Home from './pages/Home'
import Footer from './common/Footer'
import {Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import Header from './common/Header';
import Dashboard from './pages/DashboardPage/Dashboard';
import AllListing from './pages/DashboardPage/AllListing/AllListing';
import TreatmentCategories from './pages/DashboardPage/TreatmentCategories/TreatmentCategories';
import Treatment from './pages/DashboardPage/Treatment/Treatment';
import ProfessionalAffiliationsCertificates from './pages/DashboardPage/ProfessionalAffiliationsCertificates/ProfessionalAffiliationsCertificates';
import Practitioner from './pages/DashboardPage/Practitioner/Practitioner';
import Tag from './pages/DashboardPage/Tag/Tag';
import Location from './pages/DashboardPage/Location/Location';
import Amenity from './pages/DashboardPage/Amenity/Amenity';

import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import ContactUs from './pages/ContactUs/ContactUs';
import "./Responsive.css";
import ForBusiness from './pages/ForBusiness/ForBusiness';
import AboutUs from './pages/AboutUs/AboutUs';
import FrequentlyAskedQuestion from './pages/FrequentlyAskedQuestion/FrequentlyAskedQuestion';
import PricingPackage from './pages/PricingPackage/PricingPackage';


function App () {
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
            <Route path="/pricing-package" element={<PricingPackage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/dashboard/all-listing" element={<AllListing/>} />
            <Route path="/dashboard/treatment-categories" element={<TreatmentCategories/>} />
            <Route path="/dashboard/treatment" element={<Treatment/>} />
            <Route path="/dashboard/certificate" element={<ProfessionalAffiliationsCertificates/>} />
            <Route path="/dashboard/practitioner" element={<Practitioner/>} />
            <Route path="/dashboard/tag" element={<Tag/>} />
            <Route path="/dashboard/location" element={<Location/>} />
            <Route path="/dashboard/amenity" element={<Amenity/>} />
          </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App;