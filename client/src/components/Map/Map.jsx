import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';

export default function Map() {
	const [position, setPosition] = useState([38.727881642324164, -9.140900099907554]);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	return (
		<div className={styles.mapContainer} onClick={() => navigate('form')}>
			<MapContainer center={position} zoom={13} scrollWheelZoom={true} className={styles.map}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}
