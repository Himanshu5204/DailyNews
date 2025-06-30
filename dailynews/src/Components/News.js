// rce rcc react class component export statement
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props); //  Call the parent constructor must be called
    // You can initialize state here if needed
    // this.state = {};
    console.log("News Component constructor called");
    console.log("API Key:", this.props.apiKey);

    // state used when you want to change repeatly the data in the component title desc no change/reapeat
    // want on screen without reloading the page

    //props can not be changed read only
    //props passed and then state can be changed
    this.state = {
      articles: [], // articles is an null array of objects
      loading: true,
      page: 1, // page is 1 by default
      totalResults: 0, // pageSize is the number of articles to be displayed on each page
      // pageSize is passed as a prop from the parent component
      // totalResults is the total number of articles available in the API
      // totalResults is used to calculate the number of pages
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - DailyNews`; // set the document title to the category passed in props works as dynamic title
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log("Data", parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  // componentDidMount is a lifecycle method that is called
  // after the constructor-->render-->componentDidmount is mounted

  // async func wait to resolve some promise in their body

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  // async componentDidMount() {
  //   console.log("News Component componentDidMount called");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54c1aec9ac8d4d60bebd523957581ce6&page=1&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true }); // set loading to true before fetching the data
  //   let data = await fetch(url); // fetch take url and return a promise
  //   // resolve or return
  //   // we use async await to handle the promise
  //   // fetch is a promise based function
  //   console.log(data);
  //   let parsedData = await data.json(); // convert the data to json format
  //   console.log("Data", parsedData); //see the data in console
  //   // parsedData is an object with articles and totalResults properties
  //   // articles is an array of objects with properties like source, author, title, description, url, urlToImage, publishedAt, content
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   });
  // }

  // handlePrevClick = async () => {
  //   console.log("Previous");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=54c1aec9ac8d4d60bebd523957581ce6&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`; // url to fetch the news articles
  //   this.setState({ loading: true }); // set loading to true before fetching the data
  //   let data = await fetch(url); // fetch the data from the url
  //   let parsedData = await data.json(); // convert the data to json format
  //   console.log("Data", parsedData); // see the data in console
  //   this.setState({
  //     loading: false, // set loading to false after fetching the data
  //     page: this.state.page - 1, // set the page state to the previous page
  //     articles: parsedData.articles, // set the articles state to the articles from the parsed data
  //   });
  // };

  // handleNextClick = async () => {
  //   console.log("Next");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=54c1aec9ac8d4d60bebd523957581ce6&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}`; // url to fetch the news articles

  //   this.setState({ loading: true }); // set loading to true before fetching the data

  //   let data = await fetch(url); // fetch the data from the url
  //   let parsedData = await data.json(); // convert the data to json format
  //   console.log("Data", parsedData); // see the data in console
  //   this.setState({
  //     loading: false, // set loading to false after fetching the data
  //     page: this.state.page + 1, // set the page state to the next page
  //     articles: parsedData.articles, // set the articles state to the articles from the parsed data
  //   });
  // };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    console.log("Next page is:", nextPage);
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: nextPage,
    });
  };

  render() {
    // Filter articles if searchQuery is present
    const { searchQuery = '' } = this.props;
    const filteredArticles = searchQuery
      ? this.state.articles.filter(
          (article) =>
            (article.title && article.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : this.state.articles;
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px ", marginTop: "90px" }}>
          DailyNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        {!this.state.loading && filteredArticles.length === 0 && (
          <div className="text-center my-4">
            <h4>No articles found.</h4>
          </div>
        )}
        <InfiniteScroll
          dataLength={filteredArticles.length}
          next={this.fetchMoreData}
          hasMore={filteredArticles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {filteredArticles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
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
}

export default News;
