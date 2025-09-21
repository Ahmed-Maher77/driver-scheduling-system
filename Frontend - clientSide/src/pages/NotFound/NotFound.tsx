import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
    return (
        <div className="not-found-page">
            <div className="container">
                <div className="not-found-content">
                    <div className="error-code">
                        <span className="error-number">4</span>
                        <span className="error-icon">🚗</span>
                        <span className="error-number">4</span>
                    </div>

                    <div className="error-message">
                        <h1>Page Not Found</h1>
                        <p>
                            Oops! It looks like this route has taken a wrong
                            turn. The page you're looking for might have been
                            moved, deleted, or doesn't exist in our Driver
                            Scheduling System.
                        </p>
                    </div>

                    <div className="error-actions">
                        <Link to="/" className="btn btn-primary">
                            <span className="btn-icon">🏠</span>
                            Go Home
                        </Link>
                        <button
                            className="btn btn-secondary"
                            onClick={() => window.history.back()}
                        >
                            <span className="btn-icon">↩️</span>
                            Go Back
                        </button>
                    </div>

                    <div className="help-text">
                        <p>
                            Need help? Check out our{" "}
                            <Link to="/about">About page</Link>
                            or contact support if you believe this is an error.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
