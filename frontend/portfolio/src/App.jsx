import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import UserDashboard from "./pages/Dashboard/User/UserDashboard";
import Error from "./pages/Error/Error";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route path="/dashboard/user" element={<UserDashboard />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
}

export default App;
