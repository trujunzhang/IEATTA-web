import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class ExtendedMarker extends Marker {
  componentWillReceiveProps(nextProps) {
    if (nextProps.autoPopup) {
      this.leafletElement.openPopup();
    }
  }

  componentDidMount() {
    // Call the Marker class componentDidMount (to make sure everything behaves as normal)
    super.componentDidMount();

    // Access the marker element and open the popup.
    if (this.props.autoPopup) {
      this.leafletElement.openPopup();
    }
  }
}


export default ExtendedMarker;
