import React, { Component } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import Axios from 'axios';


class AddNewArticle extends Component {

    state = {
        error: null,
        show: false
    }

    onSubmit = (event) => {
        event.preventDefault();
        const data = {
            title: event.target["title"].value,
            text: event.target["text"].value,
            FCM: '1'
        }
        Axios.post('//localhost:3000/addarticle', data)
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

    handleShow = () => {
        this.setState({ show: true });
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    render() {
        return (
            <div style={{ paddingRight: 60, paddingTop: 60 }}>
                <Container>
                    <h2 style={{ paddingBottom: 40 }}>Add New Article</h2>

                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formGroupUsername">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control name="title" type="text" />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Text:</Form.Label>
                            <Form.Control name="text" as="textarea" rows="8" />
                        </Form.Group>

                        {/* <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header>
                                <Modal.Title>Add New Article</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to add a new article?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" style={{ color: 'white' }} onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button type="submit" variant="success" style={{ color: 'white' }}>
                                    Yes, I'm Sure!
                                </Button>
                            </Modal.Footer>
                        </Modal> */}

                        <Button type="submit" onClick={this.handleShow} variant="secondary" style={{ color: 'white' }}>
                            Add
                        </Button>
                    </Form>
              
                    {this.state.error && <p style={{ color: 'red' }}>Add Article Failed</p>}


                </Container>
            </div>

        )
    }
}

export { AddNewArticle }