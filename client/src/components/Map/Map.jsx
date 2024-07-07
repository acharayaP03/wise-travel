import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCities } from '../../contexts/CitiesContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useUrlPosition } from '../../hooks/useUrlPosition';

import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import Button from '../ResuableUI/Button';

export default function Map() {
	const [position, setPosition] = useState([38.727881642324164, -9.140900099907554]);
	const { cities } = useCities();
	const {
		isLoading: isLoadingPosition,
		position: geoLocationPosition,
		getPosition,
	} = useGeolocation();

	const [latFromParams, lngFromParams] = useUrlPosition(); // [38.727881642324164, -9.140900099907554

	useEffect(() => {
		if (latFromParams && lngFromParams) setPosition([latFromParams, lngFromParams]);
	}, [latFromParams, lngFromParams]);

	useEffect(() => {
		if (!geoLocationPosition) return;
		setPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
	}, [geoLocationPosition]);

	return (
		<div className={styles.mapContainer}>
			{!geoLocationPosition && (
				<Button type='position' onClick={getPosition}>
					{isLoadingPosition ? 'Loading...' : 'Use your position'}
				</Button>
			)}

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
				<DetectMapLocationClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);

	return null;
}

function DetectMapLocationClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => {
			e.originalEvent.stopPropagation();
			const url = `/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`;
			window.history.replaceState(null, '', url);
			return navigate(url);
		},
	});

	return null;
}
