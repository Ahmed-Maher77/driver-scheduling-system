const SkillsSection = () => {
    const skillCategories = [
        {
            title: "Frontend",
            skills: [
                "React",
                "TypeScript",
                "JavaScript",
                "HTML/CSS",
                "SCSS",
                "Tailwind/Bootstrap"
            ]
        },
        {
            title: "Backend",
            skills: [
                "Node.js",
                "Express",
                "MongoDB",
                "MySQL",
                "REST APIs"
            ]
        },
        {
            title: "Tools & Others",
            skills: [
                "Git",
                "GitHub",
                "Vite",
                "Redux Toolkit",
                "Tanstack Query",
                "Responsive Design"
            ]
        }
    ];

    return (
        <div className="skills-section">
            <h3 className="section-title">Technical Skills</h3>
            <div className="skills-grid">
                {skillCategories.map((category, index) => (
                    <div key={index} className="skill-category">
                        <h4 className="skill-category-title">
                            {category.title}
                        </h4>
                        <div className="skill-tags">
                            {category.skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="skill-tag">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsSection;
