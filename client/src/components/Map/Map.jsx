import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useCities } from '../../contexts/CitiesContext';

export default function Map() {
	const [position, setPosition] = useState([38.727881642324164, -9.140900099907554]);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const { cities } = useCities();
	console.log(cities);

	const latFromParams = searchParams.get('lat');
	const lngFromParams = searchParams.get('lng');

	useEffect(() => {
		if (!latFromParams || !lngFromParams) return;

		setPosition([latFromParams, lngFromParams]);
	}, [latFromParams, lngFromParams]);

	return (
		<div className={styles.mapContainer} onClick={() => navigate('form')}>
			<MapContainer center={position} zoom={6} scrollWheelZoom={true} className={styles.map}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{cities.cities &&
					cities.cities.map((city) => (
						<Marker key={city.id} position={[city.position.lat, city.position.lng]}>
							<Popup>
								<span>{city.emoji}</span>
								<span>{city.cityName}</span>
							</Popup>
						</Marker>
					))}
				<ChangeCenter position={position} />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);

	return null;
}
