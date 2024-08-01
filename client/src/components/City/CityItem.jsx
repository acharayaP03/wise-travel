import { Link } from 'react-router-dom';
import styles from './Cityitem.module.css';
import { useCities } from '../../contexts/CitiesContext';

const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));

function CityItem({ city }) {
	const { currentCity, deleteCity } = useCities();
	const { cityName, emoji, date, id, position } = city;

	function handleClick(e) {
		e.preventDefault();
		deleteCity(id);
	}

	const activeCity = id === currentCity.id ? styles['cityItem--active'] : ''; // computed property
	return (
		<li>
			<Link
				className={`${styles.cityItem} ${activeCity}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button className={styles.deleteBtn} onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
