import React, { Component } from 'react';
import { Card, Button, ButtonToolbar, Form, Collapse } from 'react-bootstrap';
import Axios from 'axios';

class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            Comments: []
        };
    }

    componentDidMount() {
        Axios.get(`//localhost:3000/comment`)
            .then(res => {
                const Comments = res.data;
                this.setState({ Comments });
            })
    }

    render() {
        const { Comments } = this.state;

        return (
            Comments.map(comment => 
                <Card className="mb-1" style={{ borderColor: 'black' }}>
                    <Card.Body>
                        <Card.Subtitle className="text-muted">{comment.username}</Card.Subtitle>
                        <Card.Text className="my-4">{comment.text}</Card.Text>
                        <Card.Text className="mb-2 text-muted">Posted on {comment.createDate}</Card.Text>
                    </Card.Body>                  
                </Card>
            )
            

        )
    }
}

export { Comments }