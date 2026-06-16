import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../utils/redux-toolkit/authSlice";
import axiosInstance from "../../utils/hooks/api/axios-utils";
import { notify } from "../../utils/functions/notify";
import "./AdminPanelPage.scss";
import AnimatedPage from "../../common/Animations/AnimatedPage/AnimatedPage";
import AnimatedComponent from "../../common/Animations/AnimatedComponent/AnimatedComponent";

const AdminPanelPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!usernameOrEmail.trim() || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axiosInstance.post("/admin-login", {
                usernameOrEmail,
                password,
            });

            const { token, user } = response.data;

            // Dispatch to Redux store (this also sets localStorage)
            dispatch(setCredentials({ token, user }));

            notify("success", "Successfully logged in as Admin!");
            navigate("/");
        } catch (err: any) {
            console.error("Login failed:", err);
            const errorMessage =
                err.response?.data?.message ||
                "Failed to authenticate. Please check your credentials.";
            setError(errorMessage);
            notify("error", errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatedPage>
            <div className="Admin-Panel-Page">
                {/* Left Branding Section */}
                <div className="brand-section">
                    <div className="brand-content">
                        <AnimatedComponent delay={0.2} type="slide" direction="up">
                            <div className="logo-wrapper">
                                <i className="fa-solid fa-route"></i>
                            </div>
                        </AnimatedComponent>
                        
                        <AnimatedComponent delay={0.3} type="slide" direction="up">
                            <h1 className="brand-title">Fleet Management <br/> Reimagined</h1>
                        </AnimatedComponent>
                        
                        <AnimatedComponent delay={0.4} type="slide" direction="up">
                            <p className="brand-subtitle">
                                Streamline your driver scheduling, route assignments, and logistics tracking in one powerful, unified dashboard.
                            </p>
                        </AnimatedComponent>
                    </div>
                    {/* Decorative Elements */}
                    <div className="decor-circle circle-1"></div>
                    <div className="decor-circle circle-2"></div>
                </div>

                {/* Right Form Section */}
                <div className="form-section">
                    <div className="form-wrapper">
                        <AnimatedComponent delay={0.1} type="fade">
                            <div className="admin-header">
                                <div className="admin-icon">
                                    <i className="fa-solid fa-shield-halved"></i>
                                </div>
                                <h2>Admin Portal</h2>
                                <p>Please sign in to continue</p>
                            </div>
                        </AnimatedComponent>

                        {error && (
                            <AnimatedComponent type="scale">
                                <div className="error-alert">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    <span>{error}</span>
                                </div>
                            </AnimatedComponent>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            <AnimatedComponent delay={0.2} type="slide" direction="up">
                                <div className="form-group">
                                    <label htmlFor="usernameOrEmail">Username or Email</label>
                                    <div className="input-wrapper">
                                        <i className="fa-regular fa-user"></i>
                                        <input
                                            type="text"
                                            id="usernameOrEmail"
                                            value={usernameOrEmail}
                                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                                            placeholder="e.g. admin@example.com"
                                            disabled={isSubmitting}
                                            required
                                        />
                                    </div>
                                </div>
                            </AnimatedComponent>

                            <AnimatedComponent delay={0.3} type="slide" direction="up">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-wrapper">
                                        <i className="fa-solid fa-lock"></i>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            disabled={isSubmitting}
                                            required
                                        />
                                    </div>
                                </div>
                            </AnimatedComponent>

                            <AnimatedComponent delay={0.4} type="scale">
                                <button
                                    type="submit"
                                    className="login-submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="btn-content">
                                            <i className="fa-solid fa-circle-notch fa-spin"></i> Authenticating...
                                        </span>
                                    ) : (
                                        <span className="btn-content">
                                            Sign In <i className="fa-solid fa-arrow-right"></i>
                                        </span>
                                    )}
                                </button>
                            </AnimatedComponent>
                        </form>
                        
                        <AnimatedComponent delay={0.5} type="fade">
                            <div className="secure-badge">
                                <i className="fa-solid fa-lock"></i> Secure 256-bit Encryption
                            </div>
                        </AnimatedComponent>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default AdminPanelPage;

