import './Tooltip.scss'
import type { PropTypes } from '../../common/Types/Interfaces';


const Tooltip: React.FC<PropTypes> = ({ content, direction, minWidth, customClass }) => {
    return (
        <span className={`Tooltip ${direction} ${customClass}`} style={{ minWidth: minWidth }} role="tooltip" aria-label={content}>
            {content}
        </span>
    );
};

export default Tooltip;