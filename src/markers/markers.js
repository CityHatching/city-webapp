import L from 'leaflet';
import marker1 from './marker-planning.svg';
import marker2 from './marker-info.svg';
const markerPlanning = new L.Icon({
    iconUrl: marker1,
    iconRetinaUrl: marker1,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});
const markerInfo = new L.Icon({
    iconUrl: marker2,
    iconRetinaUrl: marker2,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});
export {markerPlanning, markerInfo};