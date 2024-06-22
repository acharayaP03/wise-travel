import { NavLink } from 'react-router-dom';
import styles from './PageNavigation.module.css';
import Logo from "../Logo/Logo.jsx";
export default function PageNavigation() {
	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<NavLink to='/product'>Product</NavLink>
				<NavLink to='/pricing'>Pricing</NavLink>
				<NavLink to='/login' className={styles.ctaLink}>Login</NavLink>
			</ul>
		</nav>
	);
}
