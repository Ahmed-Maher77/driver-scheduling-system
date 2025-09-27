import type { ActivityFeedsLayoutProps } from "../../common/Types/Interfaces";

const ActivityFeedsLayout = ({ children }: ActivityFeedsLayoutProps) => {
    return (
        <div className="ActivityFeeds-Page main-page py-6 pb-[60px]">
            <div className="container">{children}</div>
        </div>
    );
};

export default ActivityFeedsLayout;
