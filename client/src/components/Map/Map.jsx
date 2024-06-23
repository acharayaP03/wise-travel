import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

export default function Map() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	return (
		<div className={styles.mapContainer} onClick={() => navigate('form')}>
			<h1>Map</h1>
			{lat && lng && (
				<p>
					Latitude: {lat}, Longitude: {lng}
				</p>
			)}
			{/* <iframe
			title='map'
			width='600'
			height='450'
			frameBorder='0'
			style={{ border: 0 }}
			src={`https://www.google.com/maps/embed/v1/view?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&center=${lat},${lng}&zoom=18`}
			allowFullScreen
		></iframe> */}
		</div>
	);
}
