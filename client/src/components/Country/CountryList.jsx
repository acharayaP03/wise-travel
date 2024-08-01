import styles from './CountryList.module.css';
import Spinner from '../ResuableUI/Spinner';
import CountryItem from './CountryItem';
import Message from '../Message/Message';
import { useCities } from '../../contexts/CitiesContext';

export default function CountryList() {
	const { cities, isLoading } = useCities();
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return <Message message='Add your first city by clicking on a city on the map' />;

	const countries = cities.reduce((array, city) => {
		if (!array.map((el) => el.country).includes(city.country)) {
			return [...array, { country: city.country, emoji: city.emoji }];
		} else {
			return array;
		}
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country, index) => (
				<CountryItem key={index} country={country} />
			))}
		</ul>
	);
}
