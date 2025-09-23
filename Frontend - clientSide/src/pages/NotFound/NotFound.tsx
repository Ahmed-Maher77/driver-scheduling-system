import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
    return (
        <div className="NotFound-Page">
            <div className="container">
                {/* =============== Error Content =============== */}
                <div className="not-found-content">
                    <div className="error-visual">
                        <div className="error-code">
                            <span className="error-number">4</span>
                            <div className="error-icon">
                                <i className="fa-solid fa-route"></i>
                            </div>
                            <span className="error-number">4</span>
                        </div>
                    </div>

                    <div className="error-message">
                        <h2 className="error-title">Route Not Found</h2>
                        <p className="error-description">
                            Oops! It looks like this route has taken a wrong
                            turn. The page you're looking for might have been
                            moved, deleted, or doesn't exist in our Driver
                            Scheduling System.
                        </p>
                    </div>

                    <div className="error-actions">
                        <Link
                            to="/"
                            className="main-btn green-bg hover-green-bg flex items-center gap-2"
                        >
                            <i className="fa-solid fa-house"></i>
                            Go to Dashboard
                        </Link>
                        <button
                            className="main-btn button-black-bg hover-button-black-bg flex items-center gap-2"
                            onClick={() => window.history.back()}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                            Go Back
                        </button>
                    </div>

                    <div className="help-section">
                        <p className="help-text">
                            Need help? Check out our{" "}
                            <Link to="/dashboard" className="help-link">
                                Dashboard
                            </Link>{" "}
                            or contact support if you believe this is an error.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
