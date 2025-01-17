import React from 'react'
const NewsItem =(props)=> {
    
        let {title,description,imgUrl,newsUrl,author,date,source} = props;
        return (
            <div>
                <div className="card my-4">
                    <img src={!imgUrl?"https://images.indianexpress.com/2023/10/apple-store-sale.jpg":imgUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5><span className="badge text-bg-info">{source}</span>
                            <p className="card-text">{description}...</p>
                            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsUrl} target='blank' className="btn btn-sm btn-primary">Read More</a>
                        </div>
                        
                </div>
            </div>
        )
    }


export default NewsItem