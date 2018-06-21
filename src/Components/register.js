import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import { Form, Text } from 'react-form';
import logo from './Ling logo.png';
import './register.css';
class register extends Component {


	render() {

		return (
			<div class="registergroup">

				<img src={logo} className="linglogo" alt="logo" />

				<p className="textsettingcenter"> Register </p>

				<Form>
					{formApi => (
						<form onSubmit={formApi.submitForm} id="form1" className="mb-4">

							<p className="textsettingleft"> Name </p>
							<Text className="formsetting" field="password" id="password" />
							<br />

							<p className="textsettingleft"> Email </p>
							<Text className="formsetting" field="email" id="email" />
							<br />

							<p className="textsettingleft"> Password </p>
							<Text className="formsetting" field="password" id="password" />
							<br />

							<Link to="/">
								<button type="button" className="buttonCancel"> ยกเลิก </button>
							</Link>

							<Link to="/main">
								<button type="button" className="buttonContinue"> ยืนยัน </button>
							</Link>

						</form>
					)}
				</Form>

			</div>
		);
	}
}

export default register;