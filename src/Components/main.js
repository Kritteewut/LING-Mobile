import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import { Form, Text } from 'react-form';
import logo from './Ling logo.png';
import './login.css';
import GoogleMap from './maplayer';

class main extends Component {
	render() {
		return (
			<div>

				<GoogleMap />

			</div>
		);
	}
}

export default main;