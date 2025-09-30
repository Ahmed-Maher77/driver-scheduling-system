import PageHeader from "../../components/Headings/PageHeader/PageHeader";
import {
    ProfileSection,
    SocialSection,
    SkillsSection,
    EducationSection,
} from "../../components/AboutPage_Components";
import InternetCheckerDemo from "../../components/InternetCheckerDemo/InternetCheckerDemo";
import "./AboutPage.scss";
import AnimatedPage from "../../common/Animations/AnimatedPage/AnimatedPage";
import AnimatedComponent from "../../common/Animations/AnimatedComponent/AnimatedComponent";

const AboutPage = () => {
    return (
        <AnimatedPage>
            <div className="About-Page main-page py-6 pb-[60px]">
                <div className="container">
                    {/* =============== Header =============== */}
                    <AnimatedComponent
                        delay={0.1}
                        type="slide"
                        direction="down"
                    >
                        <PageHeader title="About Me" />
                    </AnimatedComponent>

                    {/* =============== About Content =============== */}
                    <div className="about-content">
                        {/* Profile Section */}
                        <AnimatedComponent delay={0.2} type="fade">
                            <ProfileSection />
                        </AnimatedComponent>

                        {/* Social Links Section */}
                        <AnimatedComponent
                            delay={0.3}
                            type="slide"
                            direction="up"
                        >
                            <SocialSection />
                        </AnimatedComponent>

                        {/* Skills Section */}
                        <AnimatedComponent delay={0.4} type="scale">
                            <SkillsSection />
                        </AnimatedComponent>

                        {/* Education Section */}
                        <AnimatedComponent delay={0.5} type="fade">
                            <EducationSection />
                        </AnimatedComponent>
                        <AnimatedComponent delay={0.6} type="scale">
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold text-center mb-6">
                                    Internet Connection Status
                                </h2>
                                <InternetCheckerDemo />
                            </div>
                        </AnimatedComponent>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default AboutPage;
