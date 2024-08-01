// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCities } from '@/contexts/CitiesContext';
import { useUrlPosition } from '@/hooks/useUrlPosition';

import styles from './Form.module.css';
import Button from '../ResuableUI/Button';
import Message from '../Message/Message';
import Spinner from '../ResuableUI/Spinner';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
	const { createCity, isLoading } = useCities();

	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!cityName || !date) return;

		const newTripPayload = {
			cityName,
			country,
			date,
			notes,
			emoji,
			position: { lat, lng },
		};

		await createCity(newTripPayload);
		navigate('/app');
	};

	const handleBack = (e) => {
		e.preventDefault();
		navigate('/app');
	};
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
	if (!lat || !lng)
		return <Message type='error' message='Please click on map to start your search..'></Message>;
	if (geoCodingError) return <Message type='error' message={geoCodingError}></Message>;

	return (
		<form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				{/* <input id='date' onChange={(e) => setDate(e.target.value)} value={date} /> */}
				<Datepicker selected={date} onChange={(date) => setDate(date)} dateFormat='dd/MM/YYYY' />
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>Notes about your trip to {cityName}</label>
				<textarea id='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />
			</div>

			<div className={styles.buttons}>
				<Button buttonType='primary' type='submit'>
					add
				</Button>
				<Button type='button' buttonType='back' onClick={handleBack}>
					&larr; Back
				</Button>
			</div>
		</form>
	);
}

export default Form;
