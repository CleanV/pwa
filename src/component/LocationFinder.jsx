import { latLng } from 'leaflet';
import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';

function LocationFinder(props) {
    const { coor, marker } = props;

    const map = useMapEvents({
        click(e) {
            coor.current = e.latlng;
            marker.current.setLatLng(e.latlng);
        },
    });
    
    useEffect(() => {
        marker.current = L.marker(latLng(3.5952, 98.6722));
        map.addLayer(marker.current);
    }, []);

    return null;
};

export default LocationFinder;