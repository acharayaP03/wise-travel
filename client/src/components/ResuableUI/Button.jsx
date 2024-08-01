import styles from './Button.module.css';

export default function Button({ children, onClick, type, buttonType }) {
	return (
		<button className={`${styles.btn} ${styles[buttonType]}`} onClick={onClick} type={type}>
			{children}
		</button>
	);
}
