import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import { Form, Text } from 'react-form';
import Dock from 'react-dock';
import './menu.css';

import LINGUser from './LINGUser.png';
import IconMenu from './icon Menu.png';
import IconCancel1 from './icon Cancel 1.png';



class menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        }

        this.handleShow = this.handleShow.bind(this);

    }


    handleShow() {
        this.setState({ isVisible: true });
    }

    render() {
        return (
            <div>

                <button color="secondary" onClick={this.handleShow}>{this.props.buttonLabel}>

                    <img src={IconMenu} className="iconMenu" alt="icon" />

                </button>

                <Dock size='0.85' position='right' isVisible={this.state.isVisible}>
                    {
                        <div onClick={() => this.setState({ isVisible: !this.state.isVisible })}>
                            <button>
                                <img src={IconCancel1} className="iconCancel1" alt="icon" />
                            </button>

                            <div className="Menugroup">

                                <h6 className="headtext1"> Mr.DemoLING </h6>
                                <p className="text1"> LING.example@hotmail.com </p>

                                <Link to="/">
                                    <button type="button" className="buttonLogout"> Logout </button>
                                </Link>

                                <button type="button" className="buttonEditProfile"> Edit </button>

                            </div>
                            <div className="Tablegroup">

                                <h6 className="headtext2"> สถานที่ </h6>

                            </div>

                            <div className="Locationgroup">

                                <p className="text1"> แปลงองุ่น </p>

                            </div>

                            <div className="Addgroup">

                                <p className="text1"> สวนยอดอาคาร </p>

                            </div>

                        </div>

                    }
                </Dock>


            </div>


        );
    }
}

export default menu;