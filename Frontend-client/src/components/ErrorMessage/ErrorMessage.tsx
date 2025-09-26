const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className="error-message text-center p-4 py-6 gray-c text-lg flex flex-col items-center justify-center gap-2">
            <i className="fa-solid fa-circle-exclamation red-c"></i>
            {message}
        </div>
    );
};

export default ErrorMessage;
