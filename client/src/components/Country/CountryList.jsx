import styles from './CountryList.module.css';
import Spinner from '../ResuableUI/Spinner';
import CountryItem from './CountryItem';
import Message from '../Message/Message';

export default function CountryList({ cities, isLoading }) {
	if (isLoading) return <Spinner />;
	if (!cities.cities.length)
		return <Message message='Add your first city by clicking on a city on the map' />;

	const countries = cities.cities.reduce((array, city) => {
		if (!array.map((el) => el.country).includes(city.country)) {
			return [...array, { country: city.country, emoji: city.emoji }];
		} else {
			return array;
		}
	}, []);

	console.log(countries);
	return (
		<ul className={styles.countryList}>
			{countries.map((country, index) => (
				<CountryItem key={index} country={country} />
			))}
		</ul>
	);
}
