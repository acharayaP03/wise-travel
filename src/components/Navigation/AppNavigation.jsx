import { NavLink } from 'react-router-dom';
import styles from './AppNav.module.css';
// import SideBar from '../SideBar/SideBar.jsx';
export function AppNavigation() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink to='cities' exact activeClassName={styles.active}>
						Cities
					</NavLink>
				</li>
				<li>
					<NavLink to='countries' exact activeClassName={styles.active}>
						Countries
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
