import { useNavigate } from "react-router-dom";
import "./AdminPanelPage.scss";
import AnimatedPage from "../../common/Animations/AnimatedPage/AnimatedPage";
import AnimatedComponent from "../../common/Animations/AnimatedComponent/AnimatedComponent";

const AdminPanelPage = () => {
    const navigate = useNavigate();

    return (
        <AnimatedPage>
            <div className="Admin-Panel-Page">
                <div className="container">
                    <AnimatedComponent delay={0.1} type="bounce">
                        <div className="admin-card">
                            {/* Admin Icon */}
                            <AnimatedComponent delay={0.2} type="scale">
                                <div className="admin-icon">
                                    <i className="fa-solid fa-gauge-high"></i>
                                </div>
                            </AnimatedComponent>

                            {/* Admin Title */}
                            <AnimatedComponent
                                delay={0.3}
                                type="slide"
                                direction="down"
                            >
                                <h1 className="admin-title">
                                    Driver Scheduling
                                    <br />
                                    Dashboard
                                </h1>
                            </AnimatedComponent>

                            {/* Admin Subtitle */}
                            <AnimatedComponent delay={0.4} type="fade">
                                <p className="admin-subtitle">
                                    Manage drivers, routes and assignments
                                </p>
                            </AnimatedComponent>

                            {/* Enter Dashboard Button */}
                            <AnimatedComponent delay={0.5} type="scale">
                                <button
                                    className="main-btn green-bg enter-btn"
                                    onClick={() => navigate("/")}
                                >
                                    Enter Dashboard
                                </button>
                            </AnimatedComponent>

                            {/* Admin Note */}
                            <AnimatedComponent delay={0.6} type="fade">
                                <p className="admin-note">
                                    Demo mode — no account required
                                </p>
                            </AnimatedComponent>
                        </div>
                    </AnimatedComponent>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default AdminPanelPage;
