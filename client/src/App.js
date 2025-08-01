import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import AppHome from "./pages/common/AppHome";
import AppEvents from "./pages/common/AppEvents";
import AppPosts from "./pages/common/AppPosts";
import ArtistList from "./pages/common/ArtistList";
import UserProfile from "./pages/common/UserProfile";
import MyProfile from "./pages/common/MyProfile";
import NotFound from "./pages/NotFound";
import AppFooter from "./components/AppFooter";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import Onboarding from "./pages/auth/Onboarding";
import EmailVerification from "./pages/auth/EmailVerification";
import EventDetails from "./pages/common/EventDetails";
import TicketRegistration from "./pages/common/TicketRegistration";
import ArtistHome from "./pages/artist/ArtistHome";
// import ArtistEvents from "./pages/artist/ArtistEvents";
import ArtistPosts from "./pages/artist/ArtistPosts";
import ArtistProfile from "./pages/artist/ArtistProfile";
import MyEvents from "./pages/artist/MyEvents";
import ArtistEventDetail from "./pages/artist/ArtistEventDetail";
// import ArtistTicketHistory from "./pages/artist/ArtistTicketHistory";
import OtherArtistList from "./pages/artist/OtherArtistList";

function AppRoutes() {
  const location = useLocation();
  const isArtistDashboard = location.pathname.startsWith("/artist/");
  const hideNavbar = isArtistDashboard || location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/onboarding" || location.pathname === "/email-verification";
  return (
    <>
      {!hideNavbar && <AppNavbar />}
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/events" element={<AppEvents />} />
        <Route path="/posts" element={<AppPosts />} />
        <Route path="/artists" element={<ArtistList />} />
        <Route path="/artist/:id" element={<UserProfile />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register/:type" element={<TicketRegistration />} />
        {/* Artist pages */}
        <Route path="/artist/home" element={<ArtistHome />} />
        {/* <Route path="/artist/events" element={<ArtistEvents />} /> */}
        <Route path="/artist/posts" element={<ArtistPosts />} />
        <Route path="/artist/profile" element={<ArtistProfile />} />
        <Route path="/artist/my-events" element={<MyEvents />} />
        <Route path="/artist/event/:id" element={<ArtistEventDetail />} />
        {/* <Route path="/artist/ticket-history" element={<ArtistTicketHistory />} /> */}
        <Route path="/artist/other-artists" element={<OtherArtistList />} />
        {/* Add more routes for other pages here */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNavbar && <AppFooter />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
