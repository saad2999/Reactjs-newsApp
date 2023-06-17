import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
        constructor(){
            super();
            this.state={
                articles: [],
                loading: false
            }
        }
         async componentDidMount(){
            
            let url ="https://newsapi.org/v2/top-headlines?country=us&apiKey=5371b94aa0f14a2790598db6d4898226"
            let data = await fetch(url);
            let parsedData = await data.json(data);
           
            
            this.setState({articles: parsedData.articles});

        }
  render() {
    return (
      <div className='container my-3'>
        <h1> NewsPanda -- Top headlines</h1>
        <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4"key={element.url}>
                <NewsItem  title={ element.title? element.title.slice(0.45):""} description={element.description? element.description.slice(0,85):""} imageUrl={element.urlToImage}  newsUrl={element.url}/>
                </div>

            })}
            

            
        </div>
        
        
        </div>
    )
  }
}

export default News
