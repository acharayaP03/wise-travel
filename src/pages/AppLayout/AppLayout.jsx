import SideBar from '../../components/SideBar/SideBar';
import styles from './AppLayout.module.css';
import Map from '../../components/Map/Map';
export default function AppLayout() {
	return (
		<div className={styles.app}>
			<SideBar />
			<Map />
		</div>
	);
}
