import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import {ArticleComponent} from './ArticleComponent';

class AllArticle extends Component {
    constructor(props) {
      super(props);

      this.state = {
        allArticles: []
      }
    }


    componentDidMount() {
      axios.get(`//localhost:3000/allarticle`)
        .then(res => {
          const allArticles = res.data;
          this.setState({ allArticles });
        })
    }

    render() {
        const { allArticles } = this.state;
        return (

          <div style={{ paddingTop: 60 }}>
            <Container>
                <h2 style={{ paddingBottom: 40 }}>All Articles</h2>
                
                {allArticles.map(article => {return <ArticleComponent article={article}/>})}
            </Container>
          </div>
        )
    }
}

export { AllArticle };