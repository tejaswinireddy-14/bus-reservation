import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import withRouter from "../Authentication/WithRouter";
const customizeMap = {
  width: "100%",
  height: "100%",
};
 class GoogleLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: "",
      longitude: "",
      cords: [{
        latitude: '', longitude: ''
      }]
    };
  }
//   drawMarker = () => {
//     return this.state.cords.map((store, i) => {
//       return <Marker key={i} id={i} position={{
//        lat: store.latitude,
//        lng: store.longitude
//      }}
 
//      onClick={() => console.log("Event Hanlder Called")} />
//     })
//   }
//   <script src="https://maps.googleapis.com/maps/api/js?key=&callback=initMap" async defer></script>
  componentDidMount() {
    this.getlat();
    this.getlong();
  }
  getlat = async () => {
    // const searchParams = new URLSearchParams(this.props.router.location.search);
    const response = await fetch(
      `http://localhost:9090/stopLatitude?id=${localStorage.getItem('scheduleId')}`,

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "GET",
      }
    );
    const data = await response.json();
    this.setState({
      latitude: data,
      cords:[{
        latitude:data
      }]
    });
    console.log(this.state.latitude);
  };

  getlong = async () => {
    // const searchParams = new URLSearchParams(this.props.router.location.search);
    // console.log(searchParams.get('scheduleId'));
    console.log(localStorage.getItem('scheduleId'));

    const response = await fetch(
      `http://localhost:9090/stopLongitude?id=${localStorage.getItem('scheduleId')}`,

      {
        mode: "cors",

        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/json",
        },

        method: "GET",
      }
    );
    const data = await response.json();
    this.setState({
      longitude: data,
      cords:[{
        longitude:data
      }]
    });
    console.log(this.state.longitude);
  };

  render() {
    // const mapStyles = {
    //   width: "100%",
    //   height: "100%",
    // };
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={customizeMap}
       
      >
        <Marker
          position={{ lat: this.state.latitude, lng: this.state.longitude }}
        />
        {/* {this.drawMarker()} */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
    // apiKey: 'https://maps.googleapis.com/maps/api/js?key=&callback=initMap'
  })(GoogleLocation);
// export default withRouter(GoogleLocation)
