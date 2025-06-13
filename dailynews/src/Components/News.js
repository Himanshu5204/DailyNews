// rce rcc react class component export statement
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props); // Call the parent constructor must be called
    // You can initialize state here if needed
    // this.state = {};
    console.log("News Component constructor called");
    // state used when you want to change repeatly the data in the component title desc no change/reapeat
    // want on screen without reloading the page

    //props can not be changed read only
    //props passed and then state can be changed
    this.state = {
      articles: [], // articles is an null array of objects
      loading: false,
      page: 1, // page is 1
    };
  }

  // componentDidMount is a lifecycle method that is called
  // after the constructor-->render-->componentDidmount is mounted

  // async func wait to resolve some promise in their body
  async componentDidMount() {
    console.log("News Component componentDidMount called");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true }); // set loading to true before fetching the data
    let data = await fetch(url); // fetch take url and return a promise
    // resolve or return
    // we use async await to handle the promise
    // fetch is a promise based function
    console.log(data);
    let parsedData = await data.json(); // convert the data to json format
    console.log("Data", parsedData); //see the data in console
    // parsedData is an object with articles and totalResults properties
    // articles is an array of objects with properties like source, author, title, description, url, urlToImage, publishedAt, content
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`; // url to fetch the news articles
    this.setState({ loading: true }); // set loading to true before fetching the data
    let data = await fetch(url); // fetch the data from the url
    let parsedData = await data.json(); // convert the data to json format
    console.log("Data", parsedData); // see the data in console
    this.setState({
      loading: false, // set loading to false after fetching the data
      page: this.state.page - 1, // set the page state to the previous page
      articles: parsedData.articles, // set the articles state to the articles from the parsed data
    });
  };

  handleNextClick = async () => {
    console.log("Next");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`; // url to fetch the news articles

    this.setState({ loading: true }); // set loading to true before fetching the data

    let data = await fetch(url); // fetch the data from the url
    let parsedData = await data.json(); // convert the data to json format
    console.log("Data", parsedData); // see the data in console
    this.setState({
      loading: false, // set loading to false after fetching the data
      page: this.state.page + 1, // set the page state to the next page
      articles: parsedData.articles, // set the articles state to the articles from the parsed data
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - Top Headlines</h1>
        {/* {this.state.articles.map((element)=>{console.log(element)})} 
        articles is an array of objects load in console
        */}
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.articles ? (
            <p className="text-center">No news articles found.</p>
          ) : (
            !this.state.loading &&
            this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : " "}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  author={element.author || "Unknown"}
                  newsUrl={element.url}
                />
              </div>
            ))
          )}
        </div>
        <div className="container d-flex justify-content-between ">
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
          >
            &larr; Previous
            {/* onClick={() => this.setState({ page: this.state.page - 1 })} */}
          </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
            Next &rarr;
            {/* onClick={() => this.setState({ page: this.state.page + 1 })}
             */}
          </button>
        </div>
      </div>
    );
  }
}

export default News;
