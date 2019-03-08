import React, { Component } from 'react';
import { Card, Collapse, Button, Form } from 'react-bootstrap';
import Axios from 'axios';

class ArticleComponent extends Component {

    constructor(props) {
        super(props);
        // this.state = props.article;

        this.state = {
            open: false,
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
                    <Button
                        className="ml-auto"
                        onClick={() => this.setState({ open: !open })}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        variant="secondary"
                        style={{ color: 'white' }}>
                        View Comments
                    </Button>

                    <Collapse in={this.state.open}>
                        <Form onSubmit={this.onSubmit} id="example-collapse-text">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control name="text" className="comment" as="textarea" rows="3" />
                            </Form.Group>
                            <Button style={{ color: 'white' }} variant="secondary" type="submit">
                                Add your comment...
                            </Button>
                        </Form>
                    </Collapse>
                </Card.Footer>
            </Card>

        )
    }
}

export { ArticleComponent }