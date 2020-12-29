import logo from './logo.svg';
import './App.css';
//
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Container } from 'reactstrap';

class App extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Welcome to Reactstrap</h1>
                                <p>
                                    <Button color="danger">
                                        Click Me
                                    </Button>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
} 

export default App;
