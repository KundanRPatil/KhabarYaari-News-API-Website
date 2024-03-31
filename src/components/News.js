import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

    
const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - KhabarYaari`
        updateNews();

    }, [])


    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);

        let parsedData = await data.json()
        props.setProgress(50);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.articles)
        setLoading(false);


        props.setProgress(100);
        console.log(page);
    }
    const handlePrevClick = async () => {
        setPage(page - 1)

        updateNews();
        console.log(page);
    }
    const handleNextClick = async () => {
        setPage(page + 1)

        updateNews();
        console.log(page);

    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const fetchMoreData = async () => {
        setPage(page+1)
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setLoading(true)
        
        let data = await fetch(url);

        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        
        console.log(page);

    }

    return (
        <>
            <h1 className="text-center" style={{marginTop:"90px"}}>Khabaryaari- Trendings  on -{capitalizeFirstLetter(props.category)}</h1>
            {loading && <Loading />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Loading />}
            >
                <div className="container">
                    <div className="row my-2">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-primary" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}

        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News