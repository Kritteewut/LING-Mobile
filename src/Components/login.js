import React, { Component } from 'react';
import { Switch, Link , Route } from 'react-router-dom';
import { Form, Text } from 'react-form';
import logo from './Ling logo.png';
import './login.css';
class login extends Component {


	render() {

		return (
			<div class="logingroup">

				<img src={logo} className="linglogo" alt="logo" />

				<p className="textsettingcenter"> Login </p>

				<Form>
					{formApi => (
						<form onSubmit={formApi.submitForm} id="form1" className="mb-4">

							<p className="textsettingleft"> Email </p>
							<Text className="formsetting" field="email" id="email" />
							<br />

							<p className="textsettingleft"> Password </p>
							<Text className="formsetting" field="password" id="password" />
							<br />

							<Link to="/register">
								<button type="button" className="buttonRegister"> Register </button>
							</Link>

							<Link to="/main">
								<button type="button" className="buttonLogin"> Login </button>
							</Link>
							<br />

							<button type="button" className="buttonFacebook"> Login With Facebook </button>
							<br />

							<button type="button" className="buttonGoogle"> Login with Google </button>
						</form>
					)}
				</Form>

			</div>
		);
	}
}

export default login;