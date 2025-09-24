import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button
            type="button"
            className="inline-flex items-center gap-2 text-[1.3rem] button-black-bg p-[0.6rem] rounded-lg cursor-pointer"
            onClick={() => navigate(-1)}
        >
            <i className="fa-solid fa-arrow-left"></i>
        </button>
    );
};

export default BackButton;
