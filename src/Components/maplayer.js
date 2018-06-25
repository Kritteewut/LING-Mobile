/*global google*/
import React, { Component } from 'react';
import { compose, withProps, lifecycle, } from "recompose"
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";
import './maplayer.css';
import './Ling logo.png';
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
const _ = require("lodash");

/* Google Map Group */

const MyMapComponent = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `100%` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	lifecycle({
		componentWillMount() {
			const refs = {}

			this.setState({
				bounds: null,
				center: {
					lat: 13.775768, lng: 100.542937 
				},
				markers: [],
				onMapMounted: ref => {
					refs.map = ref;
				},
				onBoundsChanged: () => {
					this.setState({
						bounds: refs.map.getBounds(),
						center: refs.map.getCenter(),
					})
				},
				onSearchBoxMounted: ref => {
					refs.searchBox = ref;
				},
				onPlacesChanged: () => {
					const places = refs.searchBox.getPlaces();
					const bounds = new google.maps.LatLngBounds();

					places.forEach(place => {
						if (place.geometry.viewport) {
							bounds.union(place.geometry.viewport)
						} else {
							bounds.extend(place.geometry.location)
						}
					});
					const nextMarkers = places.map(place => ({
						position: place.geometry.location,
					}));
					const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

					this.setState({
						center: nextCenter,
						markers: nextMarkers,
					});
					// refs.map.fitBounds(bounds);
				},
			})
		},
	}),
	withScriptjs,
	withGoogleMap
)((props) =>
	<GoogleMap
		ref={props.onMapMounted}
		defaultZoom={8}
		defaultCenter={{ lat: 13.775768, lng: 100.542937  }}
		center={props.center}
		defaultOptions={{
			fullscreenControl: false,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_BOTTOM
			}
		}
		}
	>
		<SearchBox
			ref={props.onSearchBoxMounted}
			bounds={props.bounds}
			controlPosition={google.maps.ControlPosition.TOP_LEFT}
			onPlacesChanged={props.onPlacesChanged}
		>
			<input
				type="text"
				placeholder="ค้นหา"
				style={{
					boxSizing: `border-box`,
					border: `1px solid transparent`,
					width: `240px`,
					height: `32px`,
					marginTop: `27px`,
					padding: `0 12px`,
					borderRadius: `3px`,
					boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
					fontSize: `14px`,
					outline: `none`,
					textOverflow: `ellipses`,
				}}
			/>
		</SearchBox>
		{props.markers.map((marker, index) =>
			<Marker key={index} position={marker.position} />
		)}
		{props.isMarkerShown && <Marker position={{ lat: 13.775768, lng: 100.542937 }} onClick={props.onMarkerClick} />}
	</GoogleMap>
)

class maplayer extends React.PureComponent {
	state = {
		isMarkerShown: false,
	}

	componentDidMount() {
		this.delayedShowMarker()
	}

	delayedShowMarker = () => {
		setTimeout(() => {
			this.setState({ isMarkerShown: true })
		}, 3000)
	}

	handleMarkerClick = () => {
		this.setState({ isMarkerShown: false })
		this.delayedShowMarker()
	}

	render() {
		return (
			<MyMapComponent
				isMarkerShown={this.state.isMarkerShown}
				onMarkerClick={this.handleMarkerClick}
			/>
		)
	}
}
export default maplayer;