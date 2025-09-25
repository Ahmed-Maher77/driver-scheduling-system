import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import {
    ProfileSection,
    SocialSection,
    SkillsSection,
    EducationSection,
} from "../../components/AboutPage_Components";
import "./AboutPage.scss";

const AboutPage = () => {
    return (
        <div className="About-Page main-page py-6 pb-[60px]">
            <div className="container">
                {/* =============== Header =============== */}
                <PageHeader title="About Me" />

                {/* =============== About Content =============== */}
                <div className="about-content">
                    {/* Profile Section */}
                    <ProfileSection />

                    {/* Social Links Section */}
                    <SocialSection />

                    {/* Skills Section */}
                    <SkillsSection />

                    {/* Education Section */}
                    <EducationSection />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
