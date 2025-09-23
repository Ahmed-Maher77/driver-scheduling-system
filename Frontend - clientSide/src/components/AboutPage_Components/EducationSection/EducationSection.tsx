const EducationSection = () => {
    return (
        <div className="education-section">
            <h3 className="section-title">Education</h3>
            <div className="education-item">
                {/* =============== Education Icon =============== */}
                <div className="education-icon">
                    <i className="fa-solid fa-graduation-cap"></i>
                </div>

                {/* =============== Education Details =============== */}
                <div className="education-details">
                    {/* Education Degree */}
                    <h4 className="education-degree">
                        Bachelor's in Computer and Control Systems Engineering
                    </h4>

                    {/* Cumulative Grade */}
                    <div className="education-grade">
                        <span className="grade-label">
                            My Cumulative Grade:
                        </span>
                        <span className="grade-value">
                            Excellent with honors
                        </span>
                    </div>

                    {/* Education Description */}
                    <p className="education-description">
                        Comprehensive study of computer systems, control theory,
                        and engineering principles with focus on software
                        development and system design.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EducationSection;
