import styles from '../styles/Button.module.css'

export interface ButtonOptions {
    title?: string;
    icon?: string;
    type?: string;
    onClick?: () => void;
    id: string;
    spanIcon?: string;
    spanText?: string;
}


function Button(btn: ButtonOptions) {
    const buttonClass = `${styles.button} ${btn.type ? styles[btn.type] : 'button'}`;
    return (
        <button id={btn.id} onClick={btn.onClick} className={buttonClass}>
            <span id={btn.id} className={styles.button__icon}><i id="download-btn" className={btn.icon}></i></span> 
            {btn.title && <span id="download-btn" className={styles.button__text}>{btn.title}</span>}
        </button>
    );

}
export default Button;