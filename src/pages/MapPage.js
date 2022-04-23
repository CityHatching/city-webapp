import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet'
import { Button, Col } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { markerPlanning, markerInfo } from '../markers/markers';

class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          targets: []
        };
      }
    
      componentDidMount() {
        fetch("https://city-cms.yerzham.com/api/geo-targets?populate=*")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                targets: result.data
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render() { 
        const { error, isLoaded, targets } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
            <MapContainer placeholder center={[60.2054911, 24.6559]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {targets.map((obj, i) => {
                return (
                <Marker icon={obj.attributes.Type==="planning" ? markerPlanning : markerInfo} position={[obj.attributes.x, obj.attributes.y]} key={obj.id}>
                    <Popup>
                    <h2>{obj.attributes.Title}</h2>
                    <Link className="btn btn btn-primary mb-2" role="button" to={"marker/"+obj.id} style={{ color: 'white' }}> 
                        Read More
                    </Link>
                    <img
                    width="300px"
                    src={'https://city-cms.yerzham.com'+obj.attributes.Image.data.attributes.url}>
                    </img>
                    </Popup>
                </Marker>)
                })}
            </MapContainer>
            )
        }
    }
}
 
export default MapPage;