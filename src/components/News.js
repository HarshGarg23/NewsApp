import React,{useEffect,useState} from "react";
import Newscomponent from "./Newscomponent";
import InfiniteScroll from "react-infinite-scroll-component";

// import PropTypes from "prop-types";
const News =(props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState([true])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${props.category}-News Monkey`



  const updateNews=async()=>{
    props.setprogress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apikey}&page= ${
     page
    }&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setprogress(40);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setprogress(80);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setprogress(100);

  }
  useEffect(() => {
    updateNews();
  }, [])  
  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apikey}&page= ${page
    }&pageSize=${props.pageSize}`;
    setPage(page +1 )
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setLoading(true)
    setTotalResults(parsedData.totalResults)
  };
    return (
      <>
      <h1 className="text-center">Newsmonkey-Topheadlines from {`${props.category}`}</h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<h4>Loading...</h4>}
        >
        <div className="container">
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newscomponent
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author} 
                  date={element.publishedAt}
                  source={element.source.name}
                  />
                </div>
                  );
                })}
          </div>
          </div>
          </InfiniteScroll>
          </>

    );
  }
News.defaultProps = {
  country: "in",
  pageSize: 30,
  category: "general",
};

// static propTypes = {
//   country:this.PropTypes.string,
//   pageSize:this.PropTypes.number,
//   category: PropTypes.string,
// };

export default News;
