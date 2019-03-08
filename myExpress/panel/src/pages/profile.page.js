import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import { Tab, Row, Col, Nav, Button } from 'react-bootstrap';
import {AddNewArticle, MyArticle, AllArticle, EditProfile} from '../Components';

class ProfilePage extends Component {

    logout = () => {
        localStorage.removeItem('loginData');
        window.location = "/panel/login";
    }

    render() {
        return (
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className="main">
                        <Col sm={3} className="App-header left">
                            <Nav variant="pills" className="flex-column mb-5">
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="first">All Articles</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="second">My Articles</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="third">Add New Article</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="fourth">Edit Profile</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Button style={{color: 'black'}} onClick={this.logout} variant="light mt-5">Logout</Button>
                        </Col>
                        <Col sm={9} className="right">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">

                                    <AllArticle/>

                                </Tab.Pane>
                                <Tab.Pane eventKey="second">

                                    <MyArticle/>

                                </Tab.Pane>
                                <Tab.Pane eventKey="third">

                                    <AddNewArticle/>

                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">

                                    <EditProfile/>

                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>


            

        )
    }
}

export { ProfilePage }