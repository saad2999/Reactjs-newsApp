import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    pageSize: 5,
    Country: 'us',
   
  };
  static propTypes = {
     pageSize: PropTypes.number,
     Country: PropTypes.string
  }
        constructor(props){
            super(props);
            this.state={
              articles: [],
                loading: false,
                page:1,
                totalResults:0
            }
            document.title=`${this.CaptalizeFirstLetter (this.props.category)}- NewsPanda`
        }
        CaptalizeFirstLetter=(str)=>{
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
         async updateNews() 
        {
          let url =`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=5371b94aa0f14a2790598db6d4898226&page=${this.state.page}&pageSize=${this.props.pageSize}`
            this.setState({loading:true })
            let data = await fetch(url);
            let parsedData = await data.json(data);
          
           
            
            this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false });
        }
        
        fetchMoreData = async () => {
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=5371b94aa0f14a2790598db6d4898226&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json(data);
       
       
        
        this.setState({page:this.state.page+1, articles: this.state.articles.concat(parsedData.articles) , totalResults: parsedData.totalResults, loading:false });}
        
       
         async componentDidMount(){
            this.updateNews()
           
        }
  render() {
    return (
      <>
        <h1 className='text-center'> NewsPanda -- Top   {this.CaptalizeFirstLetter (this.props.category)} Headlines</h1>
        {/* {this.state.loading&&<Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults }
          loader={<Spinner/>}
        >
          <div className='container'>
        <div className="row">
            { this.state.articles.map((element)=>{
                return <div className="col-md-4"key={element.url}>
                <NewsItem  title={ element.title? element.title.slice(0.45):""} description={element.description? element.description.slice(0,85):""} imageUrl={element.urlToImage}  newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
                </div>


            })}
            

            
        </div>
        </div>
        </InfiniteScroll>
        

        
        </>
    )
  }
}

export default News
