import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";





export const News= (props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  // document.title=`${CaptalizeFirstLetter (props.category)}- NewsPanda`
        
         const CaptalizeFirstLetter=(str)=>{
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
          const updateNews = async ()=> 
        {
          props.updateProgress(10)
          let url =`https://newsapi.org/v2/top-headlines?country=${props.Country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
            setLoading(true)
            let data = await fetch(url);
            props.updateProgress(50)
            let parsedData = await data.json(data);
            props.updateProgress(70)
            props.updateProgress(100)
            setTotalResults(parsedData.totalResults)
            setLoading(false)
            setArticles(parsedData.articles)
            
            
        }
        
        const fetchMoreData = async () => {
          let url =`https://newsapi.org/v2/top-headlines?country=${props.Country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json(data);
        setPage(page+1);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
       
        
        }       
        useEffect(() => {
        console.log("use effect");
        updateNews();
        },[])
         
        
 
    return (
      <>
        <h1 className='text-center'> NewsPanda -- Top   {CaptalizeFirstLetter (props.category)} Headlines</h1>
        {/* {loading&&<Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults }
          loader={<Spinner/>}
        >
          <div className='container'>
        <div className="row">
            { articles.map((element)=>{
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
 News.defaultProps = {
  pageSize: 5,
  Country: 'us',
 
};
 News.propTypes = {
   pageSize: PropTypes.number,
   Country: PropTypes.string
}

export default News
