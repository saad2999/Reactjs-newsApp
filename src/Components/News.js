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
              articles: [{
                "source": {
                "id": "entertainment-weekly",
                "name": "Entertainment Weekly"
                },
                "author": "EW Staff",
                "title": "Your guide to the 2023 TV premiere dates",
                "description": "We'll tell you how to watch all the new and returning series, plus streaming movies.",
                "url": "https://ew.com/tv/2023-tv-premiere-dates/",
                "urlToImage": "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=4%2C0%2C2000%2C998&poi=%5B980%2C598%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F04%2F21%2FArtboard-4TV-PREMIERES-2000.jpg",
                "publishedAt": "2022-11-03T20:30:00Z",
                "content": "With warmer weather comes a new batch of shows, and we're here to help you kick your summer off right with a TV-watching schedule that will make you excited to stay indoors.\r\nMay offers up a wide arr… [+23776 chars]"
                },
                {
                "source": {
                "id": "ign",
                "name": "IGN"
                },
                "author": "Collier Jennings",
                "title": "Best Action Movies on Netflix Right Now (September 2022) - IGN",
                "description": "These are the best action movies on Netflix right now -- blockbusters, fight films, animated adventures and shootouts galore.",
                "url": "https://www.ign.com/articles/best-action-movies-on-netflix-right-now",
                "urlToImage": "https://assets-prd.ignimgs.com/2022/07/28/rrr-1659047262112.jpg?width=1280",
                "publishedAt": "2022-09-01T18:03:14Z",
                "content": "There is nothing like a good action movie on Netflix. The perfectly choreographed fight scenes that let you feel every punch and kick on screen; the shootouts that see bullets and bodies hitting the … [+11394 chars]"
                },
            
                {
                    "source": {
                    "id": "next-big-future",
                    "name": "Next Big Future"
                    },
                    "author": "chainwire",
                    "title": "OKX and McLaren Racing Host Panel on Technology in Sports and Film at Tribeca Festival | NextBigFuture.com",
                    "description": "New York City, New York, June 15th, 2023, Chainwire",
                    "url": "https://www.nextbigfuture.com/2023/06/okx-and-mclaren-racing-host-panel-on-technology-in-sports-and-film-at-tribeca-festival.html",
                    "urlToImage": "https://nextbigfuture.s3.amazonaws.com/uploads/2023/06/Blog_1600x844-8_16867035833Jj2V7BUtL.jpg",
                    "publishedAt": "2023-06-15T03:19:44Z",
                    "content": "New York City, New York, June 15th, 2023, Chainwire\r\n<ul><li>Panelists included OKX Chief Marketing Officer Haider Rafique, McLaren Racing Chief Executive Officer Zak Brown, McLaren F1 Driver Lando N… [+6947 chars]"
                    }
                 ],
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
          this.props.setProgress(10)
          let url =`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
            this.setState({loading:true })
            let data = await fetch(url);
            this.props.setProgress(50)
            let parsedData = await data.json(data);
            this.props.setProgress(70)
            this.props.setProgress(100)
          
           
            
            this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false });
        }
        
        fetchMoreData = async () => {
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
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
