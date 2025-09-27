const LoadingPageSpinner = ({ message }: { message: string }) => {
    return (
        <div className="loading-page-spinner text-center py-6 gray-c text-lg h-full w-full flex items-center justify-center p-5">
            <div className="flex items-center flex-col gap-4">
                <i className="fa-solid fa-spinner fa-spin text-3xl" />
                <span className="text-xl">{message}</span>
            </div>
        </div>
    );
};

export default LoadingPageSpinner;
