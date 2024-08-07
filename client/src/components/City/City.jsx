import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useCities } from '../../contexts/CitiesContext';

import styles from './City.module.css';
import Button from '../ResuableUI/Button';
import Spinner from '../ResuableUI/Spinner';

const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));

function City() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const { getCurrentCity, currentCity, isLoading } = useCities();
	const { cityName, emoji, date, notes } = currentCity;

	useEffect(() => {
		getCurrentCity(id);
	}, [id]);

	if (isLoading) return <Spinner />;

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{emoji}</span> {cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a href={`https://en.wikipedia.org/wiki/${cityName}`} target='_blank' rel='noreferrer'>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>
			<div>
				<Button
					buttonType='back'
					onClick={(e) => {
						e.preventDefault();
						navigate(-1);
					}}
				>
					&larr; Back
				</Button>
			</div>
		</div>
	);
}

export default City;
