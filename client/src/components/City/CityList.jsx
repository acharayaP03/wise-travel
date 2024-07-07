import styles from './CityList.module.css';
import Spinner from '../ResuableUI/Spinner';
import CityItem from './CityItem';
import Message from '../Message/Message';
import { useCities } from '../../contexts/CitiesContext';

function CityList() {
	const { cities, isLoading } = useCities();
	if (isLoading) return <Spinner />;
	if (!cities.cities.length)
		return <Message message='Add your first city by clicking on a city on the map' />;

	return (
		<ul className={styles.cityList}>
			{cities.cities.map((city) => (
				<CityItem key={city.id} city={city} />
			))}
		</ul>
	);
}

export default CityList;
