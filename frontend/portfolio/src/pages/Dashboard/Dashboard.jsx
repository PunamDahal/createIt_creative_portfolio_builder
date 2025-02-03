import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <Link to="/dashboard/user">User Dashboard</Link>
            </nav>
        </div>
    );
}

export default Dashboard;
