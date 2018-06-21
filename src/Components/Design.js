import React, { Component } from 'react';
import { Switch, Link , Route } from 'react-router-dom';
import Register from './register';
import Main from './main';
import Login from './login';
import './Design.css';

class Design extends Component {
  render() {
    return (
      <div className="backgroundpic1">

        <login />

				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/main" component={Main} />  
				</Switch>

      </div>
    );
  }
}

export default Design;
