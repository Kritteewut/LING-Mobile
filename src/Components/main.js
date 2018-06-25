import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import { Form, Text } from 'react-form';

import GoogleMap from './maplayer';

import Menu from './menu';
import Task from './task';
import './main.css';

// Picture icon

import IconBackbutton from './icon Backbutton.png';
import IconCalendar from './icon Calendar.png';
import IconCompass from './icon Compass.png';
import IconMenu from './icon Menu.png';
import IconGPS from './icon GPS.png';
import IconLayer1 from './icon Layer1.png';
import IconLayer2 from './icon Layer2.png';
import IconLayer3 from './icon Layer3.png';
import IconLayer4 from './icon Layer4.png';

class main extends Component {
	render() {
		return (
			<div>

				<div>
					<img src={IconBackbutton} className="iconBackbutton" alt="icon" />

					<button type="button">
							<img src={IconCalendar} className="iconCalendar" alt="icon" />
					</button>

					<button type="button">
						<img src={IconCompass} className="iconCompass" alt="icon" />
					</button>

					<button type="button">
						<img src={IconGPS} className="iconGPS" alt="icon" />
					</button>

					<button type="button">
						<img src={IconLayer1} className="iconLayer1" alt="icon" />
					</button>

					<button type="button">
						<img src={IconLayer2} className="iconLayer2" alt="icon" />
					</button>

					<button type="button">
						<img src={IconLayer3} className="iconLayer3" alt="icon" />
					</button>

					<button type="button">
						<img src={IconLayer4} className="iconLayer4" alt="icon" />
					</button>

				</div>

				<div class="menugroup">

					<Menu />

				</div>

				<div class="taskgroup">

					<Task />

				</div>

				<div class="google-map-overlay">

					<GoogleMap />

				</div>


			</div>
		);
	}
}

export default main;