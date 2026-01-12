import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Hero from "./components/Hero.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Monitors from "./components/Monitors.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import ViewMonitor from "./components/ViewMonitor.jsx";
import Profile from "./components/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "alert shadow-lg",
        }}
      />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard layout */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/monitors" element={<Monitors />} />
          <Route path="/monitors/:monitorId" element={<ViewMonitor />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
