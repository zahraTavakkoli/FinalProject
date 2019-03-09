import React, { Component } from 'react';
import { Card, Button, ButtonToolbar, Form, Collapse, Jumbotron, Modal } from 'react-bootstrap';
import { Comments } from './Comments';
import Axios from 'axios';

//######################################################   MODAL  ##################################
class MyVerticallyCenteredModal extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Your Article
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control className="px-0" name="title" type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Text:</Form.Label>
                            <Form.Control className="px-0" name="text" as="textarea" rows="5" />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="success" style={{ color: 'white' }}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
//################################################################################################

class MyArticleComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            open: false,
            modalShow: false
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        const data = {
            text: event.target["text"].value,
            FCM: '1'
        }
        Axios.post('//localhost:3000/addcomment', data)
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
        const { article } = this.props;
        const { open } = this.state;
        let modalClose = () => this.setState({ modalShow: false });

        return (

            <Card className="mb-4" style={{ borderColor: 'darksalmon' }}>
                <Card.Header as="h5">{article.title}</Card.Header>
                <Card.Body>
                    <Card.Subtitle className="text-muted">Author: {article.author}</Card.Subtitle>
                    <Card.Subtitle className="my-2 text-muted">Username: {article.username}</Card.Subtitle>
                    <Card.Text className="my-4">{article.text}</Card.Text>
                    <Card.Text className="mb-2 text-muted">Posted on {article.createDate}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <ButtonToolbar>
                        <Button
                            onClick={() => this.setState({ open: !open })}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            variant="secondary"
                            style={{ color: 'white' }}>
                            View Comments
                        </Button>
                        <Button onClick={() => this.setState({ modalShow: true })} variant="secondary mr-2 ml-auto" style={{ color: 'white' }}>Edit</Button>

                        <MyVerticallyCenteredModal
                            show={this.state.modalShow}
                            onHide={modalClose}
                        />

                        <Button variant="danger" style={{ color: 'white' }}>Delete</Button>
                    </ButtonToolbar>

                    <Collapse in={this.state.open}>
                        <Jumbotron className="mt-4 jumbotron">
                            <Comments />
                            {this.state.error && <p style={{ color: 'red' }}>Add Comment Failed</p>}
                            <Form onSubmit={this.onSubmit} id="example-collapse-text">
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control name="text" className="comment" as="textarea" rows="3" />
                                </Form.Group>
                                <Button style={{ color: 'white' }} variant="secondary" type="submit">
                                    Add your comment...
                                </Button>
                            </Form>
                        </Jumbotron>
                    </Collapse>

                </Card.Footer>
            </Card>

        )
    }
}

export { MyArticleComponent }

// {this.state.error && <p style={{ color: 'red' }}>Add Comment Failed</p>}