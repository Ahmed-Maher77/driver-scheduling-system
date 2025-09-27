const ErrorPage = ({ message }: { message: string }) => {
    return (
        <div className="error-page text-red-500 h-full w-full flex flex-col items-center justify-center p-5">
            <div className="flex items-center gap-2 text-3xl mb-2">
                <i className="fa-solid fa-circle-exclamation red-c" />
                Error:
            </div>
            <span className="text-2xl">{message}</span>
        </div>
    );
};

export default ErrorPage;
