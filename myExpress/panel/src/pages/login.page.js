import React,{Component} from 'react';
import Axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class LoginPage extends Component {
    state= {
        error: null
    }
    onSubmit = (event)=>{
        event.preventDefault();
        const data = {
            username: event.target["username"].value,
            password: event.target["password"].value,
            FCM: '1'
        }
        Axios.post('//localhost:3000/signin',data)
        .then(response=>{
            if (response.data.success){
                localStorage.setItem('loginData',JSON.stringify(data));
                window.location = '/panel/profile';
            }else {
                this.setState({error: true})
            }
        })
    }


    onChange = ({target:{name,value}})=>{
        this.setState({[name]:value})
    }

    render() {
        return (
            <div className="App-header">
                <Container>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <h2 style={{ marginBottom: 30, marginTop: 40 }}> Sign In </h2>
                            <Form onSubmit={this.onSubmit}>
                                
                                <Form.Group controlId="formGroupUsername">
                                    <Form.Control name="username" type="text" placeholder="Username" />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Control name="password" type="password" placeholder="Password" />
                                </Form.Group>

                                <Button style={{ backgroundColor: 'darksalmon', borderColor: 'darksalmon', color: 'black' }} type="submit">
                                    L O G I N
                                </Button>

                            </Form>
                            <p style={{fontSize: 15, marginTop: 30}}>Not registered? <a href="/panel/signup" style={{color: 'darksalmon'}}>Create an account</a></p>
                            {this.state.error && <p style={{ color: 'red' }}>Login Failed</p>}
                        </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}

export {LoginPage}