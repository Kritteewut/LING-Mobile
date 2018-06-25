import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import Dock from 'react-dock';
import './main.css';

import logo from './Ling logo.png';
import IconTask from './icon Task.png';
import TaskPic1 from './taskpic1.jpg';
import IconCancel from './icon Cancel.png';
import firebase, { auth, provider, provider2 } from './config';
import {
    Collapse,
    CardBody,
    Card,
    CardImg,
    CardText,
    CardTitle,
    CardSubtitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Container,
    Row, Col,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    DropdownItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

import './task.css';
import Popup from "reactjs-popup";
import './Delete.css';

class task extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            items: [],
            user: null,
            isVisible: false,
            modalAdd: false,
            modalEdit: false,
            modalSetting: false,
            modalDelete: false,
            closeAll: false,
            collapsed: true,
            dropdownOpen: false,
            size: 300
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.modalSettingtoggle = this.modalSettingtoggle.bind(this);
        this.modalAddtoggle = this.modalAddtoggle.bind(this);
        this.modalEdittoggle = this.modalEdittoggle.bind(this);
        this.modalDeletetoggle = this.modalDeletetoggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleShow() {
        this.setState({ isVisible: true });
    }
    modalSettingtoggle() {
        this.setState({
            modalSetting: !this.state.modalSetting,
            isVisible: !this.state.isVisible

        });
    }

    modalAddtoggle() {
        this.setState({
            modalAdd: !this.state.modalAdd,
            isVisible: !this.state.isVisible
        });
    }

    modalEdittoggle() {
        this.setState({
            modalEdit: !this.state.modalEdit,
            isVisible: !this.state.isVisible
        });
    }

    modalDeletetoggle() {
        this.setState({
            modalDelete: !this.state.modalDelete
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var itemsRef = firebase.database().ref('item');

        var sd = new Date(this.state.startDate);

        console.log(sd);

        var ed = new Date(this.state.endDate);
        console.log(ed);

        var item = {
            taskName: this.state.taskName,
            description: this.state.description,
            startDate: sd.getTime(),
            endDate: ed.getTime(),
            
        }
        itemsRef.push(item);
        this.setState({
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            modalAdd: !this.state.modalAdd,
            isVisible: true
        });
    }

    handleUpdate(itemId) {
        var itemRef = firebase.database().ref('item/' + itemId);

        var sd = new Date(this.state.startDate);

        console.log(sd);

        var ed = new Date(this.state.endDate);
        console.log(ed);

        var item = {
            taskName: this.state.taskName,
            description: this.state.description,
            startDate: sd.getTime(),
            endDate: ed.getTime(),
        }
        itemRef.update(item);
        this.setState({
            taskName: '',
            description: '',
            startDate: '',
            endDate: '',
            modalEdit: !this.state.modalEdit,
            modalSetting: !this.state.modalSetting,
            isVisible: !this.state.isVisible
        });
    }

    removeItem(itemId) {
        const itemRef = firebase.database().ref('item/' + itemId);
        itemRef.remove();
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
        var itemsRef = firebase.database().ref('item').orderByChild('startDate').on('value', (snapshot) => {
            let newState = [];
            snapshot.forEach(function (childSnapshot) {
                var childkey = childSnapshot.key;
                var childData = childSnapshot.val();

                var isd = new Date(childData.startDate);
                var ied = new Date(childData.endDate);

                var sdyear = isd.getFullYear();
                var sdmonth = isd.getMonth() + 1;
                var sdday = isd.getDate();

                var sdstring = '' + sdday + ' / ' + sdmonth + ' / ' + sdyear;

                var edyear = ied.getFullYear();
                var edmonth = ied.getMonth() + 1;
                var edday = ied.getDate();

                var edstring = '' + edday + ' / ' + edmonth + ' / ' + edyear;
                newState.push({
                    id: childkey,
                    taskName: childData.taskName,
                    description: childData.description,
                    startDate: sdstring,
                    endDate: edstring,
                    user: childData.user
                });
            });
            this.setState({
                items: newState
            });
        });
    }
    render() {
        return (
            <div>

                <button color="secondary" onClick={this.handleShow}>{this.props.buttonLabel}>

                    <img src={IconTask} className="iconTask" alt="icon" />

                </button>

                <Dock size='0.6' position='bottom' isVisible={this.state.isVisible}>
                    {
                        <div>
                            <button onClick={() => this.setState({ isVisible: !this.state.isVisible })} >
                                < img src={IconCancel} className="iconCancel" alt="icon" />
                            </button>

                            <Row>
                                <Col>
                                    <div class="Add">
                                        <div class="block">
                                            <Button outline color="info" onClick={this.modalAddtoggle}>{this.props.buttonLabel}เพิ่มงาน</Button>
                                            <br /><br />
                                        </div></div></Col>
                            </Row>
                            {this.state.items.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <div class="card2">
                                            <div>
                                                <img src={TaskPic1} className="pic" alt="Card image cap" />
                                            </div>
                                            <div class="container">
                                                <br />
                                                <div class="block2">

                                                    <Button key={item.id} color="secondary" onClick={this.modalEdittoggle}>{this.props.buttonLabel}แก้ไข</Button>

                                                    <Modal key={item.id} isOpen={this.state.modalEdit} toggle={this.modalEdittoggle} className={this.props.className}>
                                                        <ModalHeader toggle={this.modalEdittoggle}>แก้ไขงาน</ModalHeader>
                                                        <ModalBody>
                                                            <Form>
                                                                <FormGroup>
                                                                    <Label for="taskName">ชื่องาน</Label>
                                                                    <Input type="text" name="taskName" onChange={this.handleChange} value={this.state.taskName} />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label for="startDate">startDate</Label>
                                                                    <Input type="date" name="startDate" onChange={this.handleChange} value={this.state.startDate} />
                                                                </FormGroup>
                                                                {' '}
                                                                <FormGroup>
                                                                    <Label for="endDate">endDate</Label>
                                                                    <Input type="date" name="endDate" onChange={this.handleChange} value={this.state.endDate} />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label for="description">คำอธิบาย</Label>
                                                                    <Input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                                                                </FormGroup>
                                                            </Form>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button outline color="secondary" onClick={this.modalEdittoggle}>ยกเลิก</Button>{' '}
                                                            <Button color="primary" onClick={() => this.handleUpdate(item.id)}>บันทึก</Button>
                                                        </ModalFooter>
                                                    </Modal>


                                                    <Popup trigger={<Button color="danger" className="button"> ลบ </Button>} modal>
                                                        {close => (
                                                            <div className="Dmodal">
                                                                <div className="Dheader"> ยืนยันการลบ </div>
                                                                <div className="Dactions">
                                                                    <Button color="danger" className="button" onClick={() => this.removeItem(item.id)}>ลบ</Button>
                                                                    <Button
                                                                        className="button"
                                                                        onClick={() => {
                                                                            console.log('modal closed')
                                                                            close()
                                                                        }}
                                                                    >
                                                                        ยกเลิก</Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Popup>
                                                </div>
                                                <CardTitle>{item.taskName}</CardTitle>
                                                <CardText>{item.description}</CardText>
                                                <CardSubtitle>{item.startDate} - {item.endDate}</CardSubtitle>
                                                <br />
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                )
                            })}
                        </div>
                    }
                </Dock>
                <Modal isOpen={this.state.modalAdd} toggle={this.modalAddtoggle} className={this.props.className}>
                    <ModalHeader toggle={this.modalAddtoggle}>เพิ่มงาน</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="taskName">ชื่องาน</Label>
                                <Input type="text" name="taskName" onChange={this.handleChange} value={this.state.taskName} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="startDate">startDate</Label>
                                <Input type="date" name="startDate" onChange={this.handleChange} value={this.state.startDate} />
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <Label for="endDate">endDate</Label>
                                <Input type="date" name="endDate" onChange={this.handleChange} value={this.state.endDate} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">คำอธิบาย</Label>
                                <Input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={this.modalAddtoggle}>ยกเลิก</Button>{' '}
                        <Button color="primary" onClick={(e) => this.handleSubmit(e)}>สร้าง</Button>
                    </ModalFooter>
                </Modal>
            </div>



        );
    }
}

export default task;