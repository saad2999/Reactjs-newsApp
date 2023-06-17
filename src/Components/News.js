import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
        constructor(){
            super();
            this.state={
                articles: [],
                loading: false,
                page:1,
                totalResults:2
            }
        }
        handleNextPage= async()=>{
          if(this.state.page+1>Math.ceil(this.state.totalResults/20))
          {

          }
          else
          {
            let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=5371b94aa0f14a2790598db6d4898226&page=${this.state.page+1}`
            let data = await fetch(url);
            let parsedData = await data.json(data);
          this.setState({ 
            page:this.state.page +1,
            articles: parsedData.articles
          })
        }
        }
        handlePreviousPage= async()=>{
          let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=5371b94aa0f14a2790598db6d4898226&page=${this.state.page-1}&pageSize=20`
            let data = await fetch(url);
            let parsedData = await data.json(data);
          this.setState({ 
            page:this.state.page -1,
            articles: parsedData.articles
          })

        }
         async componentDidMount(){
            
            let url ="https://newsapi.org/v2/top-headlines?country=us&apiKey=5371b94aa0f14a2790598db6d4898226&page=1&pageSize=20"
            let data = await fetch(url);
            let parsedData = await data.json(data);
           
            
            this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});

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
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark  " onClick={this.handlePreviousPage}> {'\u2190'} Previous</button>
        <button type="button" class="btn btn-dark  "onClick={this.handleNextPage}>Next {'\u2192'}</button>
        </div>

        
        </div>
    )
  }
}

export default News
