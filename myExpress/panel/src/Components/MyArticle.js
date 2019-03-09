import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import {MyArticleComponent} from './MyArticleComponent';

class MyArticle extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
          myArticles: []
        }
    }

    componentDidMount() {
        axios.get(`//localhost:3000/myarticle`)
            .then(res => {
                const myArticles = res.data;
                this.setState({ myArticles });
            })
    }

    render() {
        const { myArticles } = this.state;
        return (

            <div style={{paddingTop: 60 }}>
                <Container>
                    <h2 style={{ paddingBottom: 40 }}>My Articles</h2>
                    
                    {myArticles.map(article => {return <MyArticleComponent article={article}/>})}
                </Container>
            </div>
        )
    }
}

export { MyArticle }
