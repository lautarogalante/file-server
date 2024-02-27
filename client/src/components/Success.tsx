import '../styles/Success.css'

interface SuccessProps {
    icon: string;
    text: string;
};

const Success = (opt: SuccessProps) => {
    return (
        <div className="success-cont">
            <span className="success-icon"><i className={opt.icon}></i></span>
            <span className="success-text">{opt.text}</span>
        </div>
    );
}

export default Success;