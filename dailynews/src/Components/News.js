// rce rcc react class component export statement
import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
articles=[];
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
        articles: this.articles,
        loading:false
    };
  }
  render() {
    return (
      <div className="container my-3">
        <h1>Daily News - Top HeadLines</h1>
        <div className="row">
          <div className="col-md-4">
            <NewsItem
              title="MyTitle"
              description="Mydecs"
              imageUrl="https://via.placeholder.com/150"
              newsUrl="TODO"
            />
          </div>
          <div className="col-md-4">
            <NewsItem title="MyTitle" description="Mydecs" />
          </div>
          <div className="col-md-4">
            <NewsItem title="MyTitle" description="Mydecs" />
          </div>
          <div className="col-md-4">
            <NewsItem title="MyTitle" description="Mydecs" />
          </div>
          <div className="col-md-4">
            <NewsItem title="MyTitle" description="Mydecs" />
          </div>
        </div>
      </div>
    );
  }
}

export default News;
