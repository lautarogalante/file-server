import styles from '../styles/Button.module.css'
interface ButtonOptions {
    title?: string;
    icon?: string;
    type?: string;
    onClick?: () => void;
}


export default function Button(btn: ButtonOptions) {
    const buttonClass = `${styles.button} ${btn.type ? styles[btn.type] : 'button'}`;
    return (
        <button className={buttonClass}>
            <span className={styles.button__icon}><i className={btn.icon}></i></span> 
            {btn.title && <span className={styles.button__text}>{btn.title}</span>}
        </button>
    );

}