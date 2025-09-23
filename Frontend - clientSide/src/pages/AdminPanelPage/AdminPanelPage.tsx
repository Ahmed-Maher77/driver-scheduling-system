import { useNavigate } from "react-router-dom";
import "./AdminPanelPage.scss";

const AdminPanelPage = () => {
    const navigate = useNavigate();

    return (
        <div className="Admin-Panel-Page">
            <div className="container">
                <div className="admin-card">
                    {/* Admin Icon */}
                    <div className="admin-icon">
                        <i className="fa-solid fa-gauge-high"></i>
                    </div>

                    {/* Admin Title */}
                    <h1 className="admin-title">
                        Driver Scheduling
                        <br />
                        Dashboard
                    </h1>

                    {/* Admin Subtitle */}
                    <p className="admin-subtitle">
                        Manage drivers, routes and assignments
                    </p>

                    {/* Enter Dashboard Button */}
                    <button
                        className="main-btn green-bg enter-btn"
                        onClick={() => navigate("/")}
                    >
                        Enter Dashboard
                    </button>

                    {/* Admin Note */}
                    <p className="admin-note">
                        Demo mode — no account required
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminPanelPage;
