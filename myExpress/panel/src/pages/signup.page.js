import React, { Component } from 'react';
import Axios from 'axios';
// import {SignIn} from '../Components';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import ImageUploader from 'react-images-upload';

class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            pictures: []
        };
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
        Axios.post('//localhost:3000/signup', data)
            .then(response => {
                if (response.data.success) {
                    window.location = '/panel/login';
                } else {
                    this.setState({ error: true })
                }
            })
        console.log(data)
    }


    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    // onDrop = (picture) => {
    //     this.setState({
    //         pictures: this.state.pictures.concat(picture),
    //     });
    // }

    render() {
        const { error } = this.state;
        return (
            <div className="App-header">
                <Container>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <h2 style={{ marginBottom: 30, marginTop: 40 }}> Sign Up </h2>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group controlId="formGroupFirstname">
                                    <Form.Control name="firstname" type="text" placeholder="Firstname" />
                                </Form.Group>
                                <Form.Group controlId="formGroupLastname">
                                    <Form.Control name="lastname" type="text" placeholder="Lastname" />
                                </Form.Group>
                                <Form.Group controlId="formGroupUsername">
                                    <Form.Control name="username" type="text" placeholder="Username" />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Control name="password" type="password" placeholder="Password" />
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Control name="sex" type="text" as="select">
                                        <option>Male</option>
                                        <option>Female</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formGroupPhone">
                                    <Form.Control name="phone" type="text" placeholder="Phone" />
                                </Form.Group>

                                {/* <ImageUploader
                                    // withIcon={true}
                                    buttonText='Choose Your Avatar'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                /> */}
                                <Button style={{ backgroundColor: 'darksalmon', borderColor: 'darksalmon', color: 'black' }} type="submit">
                                    S I G N U P
                                </Button>

                            </Form>
                            <p style={{ fontSize: 15, marginTop: 30 }}>Have an account with us? <a href="/panel/login" style={{ color: 'darksalmon' }}>Login Now!</a></p>
                            <p style={{ fontSize: 16, marginTop: 30 }}><a href="/" style={{ color: 'white' }}>Back to home</a></p>
                            {error && <p style={{ color: 'red' }}>Sign Up Failed</p>}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export { SignUpPage }