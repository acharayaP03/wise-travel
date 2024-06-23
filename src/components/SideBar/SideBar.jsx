import styles from './SideBar.module.css';
import Logo from '../Logo/Logo.jsx';
import { AppNavigation } from '../Navigation/AppNavigation';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function SideBar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNavigation />
			<Outlet />
			<Footer />
		</div>
	);
}
