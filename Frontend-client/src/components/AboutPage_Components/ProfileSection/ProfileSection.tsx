import TypewriterTitle from "../TypewriterTitle/TypewriterTitle";

const ProfileSection = () => {
    return (
        <div className="profile-section">
            {/* =============== Profile Image =============== */}
            <div className="profile-image-container">
                {/* Image */}
                <figure>
                    <img
                        src="https://res.cloudinary.com/djpxtccbf/image/upload/v1758069500/My-Picture-Formal_hzsk0g.jpg"
                        alt="Ahmed Maher Algohary"
                        className="profile-image"
                    />
                </figure>

                {/* Image Overlay */}
                <div className="image-overlay">
                    <div className="status-indicator">
                        <span className="status-dot"></span>
                        <span className="status-text">Available for work</span>
                    </div>
                </div>
            </div>

            {/* =============== Profile Info =============== */}
            <div className="profile-info">
                <h1 className="profile-name">Ahmed Maher Algohary</h1>

                <TypewriterTitle />

                {/* Profile Description */}
                <p className="profile-description">
                    Passionate Frontend Developer with a Bachelor's in Computer
                    and Control Systems Engineering. Specialized in creating
                    dynamic, responsive, and accessible web applications that
                    bring ideas to life.
                </p>

                {/* Contact Info */}
                <div className="contact-info">
                    <div className="contact-item">
                        <i className="fa-solid fa-envelope"></i>
                        <a
                            href="mailto:ahmedmaher.dev1@gmail.com"
                            className="contact-link"
                        >
                            ahmedmaher.dev1@gmail.com
                        </a>
                    </div>

                    {/* Resume Link */}
                    <div className="contact-item">
                        <i className="fa-solid fa-file-lines"></i>
                        <a
                            href="https://drive.google.com/file/d/16qSTe2NIRTjGSNb9lX-nZ5zGuJpsa84s/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            View Resume
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
