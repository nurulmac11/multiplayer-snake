import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class Map extends Component {

    constructor() {
        super()
        this.state = {
            center: { lat: 85, lng: -180 }, 
        }
    }

    // componentDidMount() {
    //     this.interval = setInterval(this.centerer.bind(this), 20000);
    // }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    centerer(){
        var lat = this.getRandomInt(-85,85)
        var lng = this.getRandomInt(-180,180)
        this.setState({
            center: {lat: lat, lng: lng}
        })
    }

  render() {
    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={this.state.center}
      >
        {<Marker position={this.state.center} />}
      </GoogleMap>
    ))

    return <div>
        <MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}/>
          {this.state.center.lat}/
          {this.state.center.lng}
    </div>
  }
}

export default Map

