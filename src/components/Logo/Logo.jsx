import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

function Logo() {
	return (
		<Link to='/'>
			{/* <img src="/public/logo.png" alt="WorldWise logo"  /> */}
			<h3 className={styles.logo}>Wise Travel</h3>
		</Link>
	);
}

export default Logo;
