import { ToastContainer } from "react-toastify";

const ToastWrapper = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={2000}
            // rtl={pageDirection === "rtl"}
            // style={{ direction: pageDirection }}
        />
    );
};
export default ToastWrapper;
