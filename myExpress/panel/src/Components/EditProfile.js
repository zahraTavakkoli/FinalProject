import React, { Component } from 'react';
import { Container, Table, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';

class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profile: [],
            error: null,
            isOnEdit: false
        }
    }

    componentDidMount() {
        axios.get(`//localhost:3000/myprofile`)
            .then(res => {
                const profile = res.data;
                this.setState({ profile });
            })
    }

    onEdit = () => {
        this.setState({ isOnEdit: !this.state.isOnEdit });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const data = {
            firstname: event.target["firstname"].value,
            lastname: event.target["lastname"].value,
            username: event.target["username"].value,
            password: event.target["password"].value,
            phone: event.target["phone"].value,
            sex: event.target["sex"].value,
            FCM: '1'
        }
        axios.post('//localhost:3000/editprofile', data)
            .then(response => {
                if (response.data.success) {
                    window.location = '/panel/profile';
                } else {
                    this.setState({ error: true })
                }
            })
        console.log(data)
    }

    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    render() {
        const { isOnEdit } = this.state;

        return (
            <div style={{ paddingTop: 60 }}>
                <Container>
                    <h2 style={{ paddingBottom: 40 }}>Edit Profile</h2>


                    {this.state.profile.map(profile => {
                        return isOnEdit ?
                            <>
                                <Form onSubmit={this.onSubmit} style={{marginLeft: '50px'}}>
                                    <Form.Group as={Row}>
                                        <Form.Label style={{marginTop: '8px'}} sm="6"><b>Firstname</b></Form.Label> 
                                        <Col sm="6">
                                            <Form.Control name="firstname" style={{marginLeft: '24px'}}  />
                                        </Col> 
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label style={{marginTop: '8px'}} sm="6"><b>Lastname</b></Form.Label>
                                        <Col sm="6">
                                            <Form.Control name="lastname" style={{marginLeft: '25px'}}  />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label style={{marginTop: '8px'}} sm="6"><b>Username</b></Form.Label>
                                        <Col sm="6">
                                            <Form.Control name="username" style={{marginLeft: '22px'}}  />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label style={{marginTop: '8px'}} sm="6"><b>Password</b></Form.Label>
                                        <Col sm="6">
                                            <Form.Control name="password" style={{marginLeft: '25px'}}  />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label style={{marginTop: '8px'}} sm="6"><b>Sex</b></Form.Label>
                                        <Col sm="6">
                                            <Form.Control name="sex" style={{marginLeft: '70px'}} as="select">
                                                <option>Male</option>
                                                <option>Female</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label style={{marginTop: '8px'}} sm="6"><b>Phone</b></Form.Label>
                                        <Col sm="6">
                                            <Form.Control name="phone" style={{marginLeft: '48px'}}  />
                                        </Col>
                                    </Form.Group>

                                    <Button type="submit" variant="success mt-3" style={{ color: 'white'}}>Save</Button>
                                    <Button onClick={this.onEdit} variant="danger ml-2 mt-3" style={{ color: 'white' }}>Cancel</Button>
                                </Form>

                                
                            </> :
                            <>
                                <Form style={{marginLeft: '50px'}}>
                                    <Form.Group as={Row} >
                                        <Form.Label style={{marginTop: '6px'}} sm="6"><b>Firstname</b></Form.Label> 
                                        <Col sm="6">
                                            <Form.Control style={{marginLeft: '24px'}} plaintext readOnly defaultValue={profile.firstname} />
                                        </Col> 
                                    </Form.Group>

                                    <Form.Group as={Row} >
                                        <Form.Label style={{marginTop: '6px'}} sm="6"><b>Lastname</b></Form.Label>
                                        <Col sm="6">
                                            <Form.Control style={{marginLeft: '25px'}} plaintext readOnly defaultValue={profile.lastname} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} >
                                        <Form.Label style={{marginTop: '6px'}} sm="6"><b>Username</b></Form.Label>
                                        <Col sm="6">
                                            <Form.Control style={{marginLeft: '22px'}} plaintext readOnly defaultValue={profile.username} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} >
                                        <Form.Label style={{marginTop: '6px'}} sm="6"><b>Password</b></Form.Label>
                                        <Col sm="6">
                                            <Form.Control style={{marginLeft: '25px'}} plaintext readOnly defaultValue={profile.password} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} >
                                        <Form.Label style={{marginTop: '6px'}} sm="6"><b>Sex</b></Form.Label>
                                        <Col sm="6">
                                            <Form.Control style={{marginLeft: '70px'}} plaintext readOnly defaultValue={profile.sex} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} >
                                        <Form.Label style={{marginTop: '6px'}} sm="6"><b>Phone</b></Form.Label>
                                        <Col sm="6">
                                            <Form.Control style={{marginLeft: '48px'}} plaintext readOnly defaultValue={profile.phone} />
                                        </Col>
                                    </Form.Group>
                                </Form>

                                <Button onClick={this.onEdit} variant="secondary mt-3" style={{ color: 'white', marginLeft: '35px' }}>Edit</Button>
                            </>
                    })}

                    {/* <Button onClick={this.onEdit} variant="secondary" style={{ color: 'white' }}>{isOnEdit ? 'Save' : 'Edit'}</Button> */}

                    {this.state.error && <p style={{ color: 'red' }}>Edit Profile Failed</p>}
                </Container>
            </div>
        )
    }
}

export { EditProfile }