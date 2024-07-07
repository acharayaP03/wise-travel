// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from '../ResuableUI/Button';
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import Message from '../Message/Message';
import Spinner from '../ResuableUI/Spinner';

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [geoCodingError, setGeoCodingError] = useState('');
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');
	const [emoji, setEmoji] = useState('');

	const [lat, lng] = useUrlPosition();
	const navigate = useNavigate();

	useEffect(() => {
		async function getCountry() {
			try {
				setIsLoadingGeocoding(true);
				setGeoCodingError('');
				const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
				const data = await response.json();
				if (!data.countryName)
					throw new Error("Opps... that doesn't look like a valid location. Please try again.🧐");

				setCountry(data.countryName);
				setCityName(data.city || data.locality || '');
				setEmoji(convertToEmoji(data.countryCode));
			} catch (error) {
				console.error('Error fetching country', error);
				setGeoCodingError(error.message);
			} finally {
				setIsLoadingGeocoding(false);
			}
		}

		if (lat && lng) getCountry();
	}, [lat, lng]);

	if (isLoadingGeocoding) return <Spinner />;
	if (geoCodingError) return <Message type='error' message={geoCodingError}></Message>;

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				<input id='date' onChange={(e) => setDate(e.target.value)} value={date} />
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>Notes about your trip to {cityName}</label>
				<textarea id='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />
			</div>

			<div className={styles.buttons}>
				<Button type='primary'>add</Button>
				<Button
					type='back'
					onClick={(e) => {
						e.preventDefault();
						navigate(-1);
					}}
				>
					&larr; Back
				</Button>
			</div>
		</form>
	);
}

export default Form;
