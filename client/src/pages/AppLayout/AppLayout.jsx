import SideBar from '../../components/SideBar/SideBar';
import styles from './AppLayout.module.css';
import Map from '../../components/Map/Map';
import User from '../../components/User/User';
export default function AppLayout() {
	return (
		<div className={styles.app}>
			<SideBar />
			<Map />
			<User />
		</div>
	);
}
