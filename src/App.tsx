import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import ApplicationTimeline from "./pages/ApplicationTimeline";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";

const isLoggedIn = () => {
  return sessionStorage.getItem("isLoggedIn") === "true";
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn() ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />

        {/* TIMELINE */}
        <Route
          path="/application/timeline"
          element={
            isLoggedIn() ? (
              <ApplicationTimeline />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* PAYMENTS */}
        <Route
          path="/payments"
          element={isLoggedIn() ? <Payments /> : <Navigate to="/login" replace />}
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={isLoggedIn() ? <Profile /> : <Navigate to="/login" replace />}
        />

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
