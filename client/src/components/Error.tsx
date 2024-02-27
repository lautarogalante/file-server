import '../styles/Errors.css'
interface ErrorProps {
    icon: string;
    text: string;
};

const Error = (opt: ErrorProps) => {
    return (
        <div className="error-cont">
            <span className="error-icon"><i className={opt.icon}></i></span>
            <span className="error-text">{opt.text}</span>
        </div>
    );
}

export default Error;