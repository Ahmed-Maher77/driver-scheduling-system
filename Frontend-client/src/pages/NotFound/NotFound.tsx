import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
    return (
        <div className="NotFound-Page">
            {/* Background 404 Watermark */}
            <div className="watermark">404</div>

            <div className="not-found-content">
                <div className="error-visual">
                    <div className="error-icon">
                        <i className="fa-solid fa-route"></i>
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
                    <button
                        className="main-btn button-black-bg hover-button-black-bg flex items-center gap-2"
                        onClick={() => window.history.back()}
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                        Go Back
                    </button>
                    <Link
                        to="/"
                        className="main-btn green-bg hover-green-bg flex items-center gap-2"
                    >
                        <i className="fa-solid fa-house"></i>
                        Dashboard
                    </Link>
                </div>

                <div className="help-section">
                    <p className="help-text">
                        Need help? Return to the{" "}
                        <Link to="/" className="help-link">
                            Dashboard
                        </Link>{" "}
                        or contact support if you believe this is an error.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
