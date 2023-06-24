

export const NewsItem =(props)=> {
 
    let {title, description,imageUrl,newsUrl ,publishedAt, author, source} = props;
    return (
      
      <div className='my-3'>
       <div className="card" >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          right:0
        }}>
        <span className="badge rounded-pill bg-danger" >
        {source}
        </span>
        </div>
       
        <img src={!imageUrl? "https://cdn.arstechnica.net/wp-content/uploads/2018/07/180711_MacBookPro_NewYorkCity_BK_41579-760x380.jpg":imageUrl} className="card-img-top" alt="..."/>
         <div className="card-body">
         <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}</p>
        <p className='card-text'><small className='text-muted'>By {author? author : "Unknown"} on {new Date(publishedAt).toUTCString()}</small></p>
        <a rel='noreferrer' href={newsUrl}target="_blank" className="btn btn-sm btn-dark">Read More</a>
    </div>
</div>
        
      </div>
    )
  
}

export default NewsItem
