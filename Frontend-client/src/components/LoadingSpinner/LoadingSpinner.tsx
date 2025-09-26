const LoadingSpinner = ({ message }: { message: string }) => {
    return (
        <div className="loading-spinner text-center py-6 gray-c text-lg">
            <i className="fa-solid fa-spinner fa-spin mr-2" /> {message}
        </div>
    );
};

export default LoadingSpinner;
