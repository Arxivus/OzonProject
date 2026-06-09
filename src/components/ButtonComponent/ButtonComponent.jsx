import styles from "./ButtonComponent.module.css";


const ButtonComponent = ({
    icon,
    children,
    isWidthGriddy = false,
    onClick,
    className = "",
    disabled = false,
}) => {
    return (
        <button
            className={`${styles.wrapper} ${className}`}
            style={{
                width: isWidthGriddy ? "100%" : "",
            }}
            onClick={onClick}
            disabled={disabled}
        >
            <p className={styles.textContent}>{children}</p>
            {icon}
        </button>
    );
};

export default ButtonComponent;
