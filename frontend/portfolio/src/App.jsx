import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import About from './pages/About/About'
import UserDashboard from "./pages/Dashboard/User/UserDashboard";
import Error from "./pages/Error/Error";
import { AuthProvider } from "./pages/Login/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
    return (
        <Router>
            <AuthProvider>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/About" element={<About />} />
                <Route path="/dashboard/user/*"  element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
                <Route path="*" element={<Error />} />
            </Routes>
            </AuthProvider>

        </Router>
    );
}

export default App;
