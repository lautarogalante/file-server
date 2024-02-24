import styles from '../styles/Button.module.css'

export interface ButtonOptions {
    title?: string;
    icon?: string;
    type?: string;
    onClick?: () => void;
    id: string;
    textClass?: string;
    iconSpClass?: string;
}


function Button(btn: ButtonOptions) {
    const buttonClass = `${styles.button} ${btn.type ? styles[btn.type] : 'button'}`;
    const buttonTextClass = btn.textClass ? styles[btn.textClass] : styles.button__text;
    const iconClass = btn.iconSpClass ? styles[btn.iconSpClass] : styles.button__icon;

    return (
        <button id={btn.id} onClick={btn.onClick} className={buttonClass}>
            <span id={btn.id} className={iconClass}><i id={btn.id} className={btn.icon}></i></span> 
            {btn.title && <span id={btn.id} className={buttonTextClass}>{btn.title}</span>}
        </button>
    );

}
export default Button;