import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
  static defaultProps = {
    pageSize: 5,
    Country: 'us',
   
  };
  static propTypes = {
     pageSize: PropTypes.number,
     Country: PropTypes.string
  }
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
          
          if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)))
        

          {
            let url =`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=5371b94aa0f14a2790598db6d4898226&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true })
            let data = await fetch(url);
            let parsedData = await data.json(data);
          this.setState({ 
            page:this.state.page +1,
            articles: parsedData.articles,
            loading:false
          })
        
          }
          
            
        }
        handlePreviousPage= async()=>{
          let url =`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=5371b94aa0f14a2790598db6d4898226&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
          this.setState({loading:true })
            let data = await fetch(url);
            let parsedData = await data.json(data);
          this.setState({ 
            page:this.state.page -1,
            articles: parsedData.articles,
            loading:false
          })

        }
         async componentDidMount(){
            
            let url =`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=5371b94aa0f14a2790598db6d4898226&page=${this.state.page}&pageSize=${this.props.pageSize}`
            this.setState({loading:true })
            let data = await fetch(url);
            let parsedData = await data.json(data);
           
            
            this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false });

        }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'> NewsPanda -- Top headlines</h1>
        {this.state.loading&&<Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4"key={element.url}>
                <NewsItem  title={ element.title? element.title.slice(0.45):""} description={element.description? element.description.slice(0,85):""} imageUrl={element.urlToImage}  newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
                </div>


            })}
            

            
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousPage}> {'\u2190'} Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize) } type="button" className="btn btn-dark  "onClick={this.handleNextPage}>Next {'\u2192'}</button>
       
        </div>

        
        </div>
    )
  }
}

export default News
